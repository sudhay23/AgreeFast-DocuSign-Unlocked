import dotenv
dotenv.load_dotenv("./.env")
import os,time
from utils.model import provision_chat_model
from langchain_neo4j import Neo4jGraph
from langchain_experimental.graph_transformers import LLMGraphTransformer
from langchain_community.document_loaders.pdf import UnstructuredPDFLoader,OnlinePDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

llm = provision_chat_model()
graph = Neo4jGraph(url=os.getenv("NEO4J_URI"),database=f"neo4j",username=os.getenv("NEO4J_USERNAME"),password=os.getenv("NEO4J_PASSWORD"))
# document_link = "http://127.0.0.1:5500/static_store/Employee%20Seperation.pdf"
document_link = "http://127.0.0.1:5500/static_store/MSA.pdf"
splitter = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=100)
loader = OnlinePDFLoader(document_link)

llm_transformer = LLMGraphTransformer(llm=llm)

documents = loader.load()

documents = splitter.split_documents(documents)

graph_documents = llm_transformer.convert_to_graph_documents(documents)

graph.add_graph_documents(graph_documents,baseEntityLabel=True,include_source=True)