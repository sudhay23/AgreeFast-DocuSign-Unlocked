import dotenv
dotenv.load_dotenv("./.env")
import os,json
from utils.model import provision_chat_model
from langchain_neo4j import Neo4jVector, GraphCypherQAChain, Neo4jGraph
from langchain_ollama import OllamaEmbeddings
from utils.prompts import PREPARE_FINAL_CHAT_ANSWER_FROM_CONTEXT_PROMPT
llm = provision_chat_model()
embedding_model = OllamaEmbeddings(base_url=os.getenv("OLLAMA_URI"),model="nomic-embed-text")
graph = Neo4jGraph(url=os.getenv("NEO4J_URI"),database=f"neo4j",username=os.getenv("NEO4J_USERNAME"),password=os.getenv("NEO4J_PASSWORD"))

# Vector embedding based retrieval of Documents' text property (alternative to ChromaDB)
neo4j_vector = Neo4jVector(embedding_model,graph=graph)
vector_store = neo4j_vector.from_existing_graph(embedding=embedding_model,search_type="vector",node_label="Document",text_node_properties=['text'],embedding_node_property="vector_embedding",)

# Just in time Cypher generation based retrival from Knowledge Graph
return_raw_docs_cypher_chain = GraphCypherQAChain.from_llm(llm=llm,graph=graph,verbose=False,allow_dangerous_requests=True,validate_cypher=False,return_direct=True)

query = "what are the renewal terms"
# query = "Who are the parties involved and what are their addresses?"
# query = "Where is BuyCo located?"
# query = "Who are the names involved?"
# query = "which jurisdiction for disputes?"
# query = "what are the eviction terms?"
# query = "how are damages compensated?"
# query = "who is responsible to install the atms?"
# query = "how soon should atm be installed?"

# Collect Vector Embedding based context
similar_vector_docs_with_score = vector_store.similarity_search_with_score(query, k=10)
embeddings_context = [x[0].page_content for x in similar_vector_docs_with_score]

# Collect Graph Cypher based context
retry = 7 
graph_text_context = ""
while retry>=0:
    retry -= 1
    try:
        result = return_raw_docs_cypher_chain.invoke(query)
        if len(json.dumps(result["result"]))>=100:
            graph_text_context = json.dumps(result["result"])
            break
    except:
        pass

# Answer user's question from collected context
final_prompt = PREPARE_FINAL_CHAT_ANSWER_FROM_CONTEXT_PROMPT.format(user_question=query,embeddings_context=embeddings_context,graph_text_context=graph_text_context)

final_response = llm.invoke(final_prompt)

print(final_response.content)