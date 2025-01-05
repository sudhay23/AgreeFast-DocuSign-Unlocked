import os
from neo4j import GraphDatabase
from langchain_neo4j import Neo4jGraph
from langchain_experimental.graph_transformers import LLMGraphTransformer
from langchain_community.document_loaders.pdf import OnlinePDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

def create_graph_database_for_envelope(envelope_id):
    driver = GraphDatabase.driver(os.getenv("NEO4J_URI"), auth=(os.getenv("NEO4J_USERNAME"), os.getenv("NEO4J_PASSWORD")))

    try:
        with driver.session() as session:
            # Query to create a new database
            create_db_query = f"CREATE DATABASE {get_neo4j_db_name(envelope_id)}"
            session.run(create_db_query)
            print(f"Database '{get_neo4j_db_name(envelope_id)}' created successfully!")
            return get_neo4j_db_name(envelope_id)
    except Exception as e:
        print(f"Error creating database on Neo4j: {e}")

def get_neo4j_db_name(envelope_id:str):
    return f'neo4j{envelope_id.replace("-","")}'
    # return f'neo4j'

def build_neo4j_knowledge_graph(envelope_id, document_name, document_path, llm, embedding_model):
    print(f"----Building Knowledge Graph for '{document_name}'----")
    document_link = f"{os.getenv('BACKEND_BASE_URL')}{document_path}"
    graph = Neo4jGraph(url=os.getenv("NEO4J_URI"),database=get_neo4j_db_name(envelope_id),username=os.getenv("NEO4J_USERNAME"),password=os.getenv("NEO4J_PASSWORD"))

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=100)
    loader = OnlinePDFLoader(document_link)
    documents = loader.load()
    chunked_documents = splitter.split_documents(documents)
    llm_transformer = LLMGraphTransformer(llm=llm)

    graph_documents = llm_transformer.convert_to_graph_documents(chunked_documents)

    # Add the source filename to the graph documents' nodes
    for i in range(len(graph_documents)):
        for j in range(len(graph_documents[i].nodes)):
            graph_documents[i].nodes[j].properties["source_file_name"] = document_name

    graph.add_graph_documents(graph_documents,baseEntityLabel=True,include_source=True)