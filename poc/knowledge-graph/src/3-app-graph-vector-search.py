import dotenv
dotenv.load_dotenv("./.env")
import os,time
from utils.model import provision_chat_model
from langchain_neo4j import Neo4jVector, Neo4jGraph
from langchain.embeddings.ollama import OllamaEmbeddings

llm = provision_chat_model()
embedding_model = OllamaEmbeddings(base_url=os.getenv("OLLAMA_URI"),model="nomic-embed-text")


# neo4j_vector = Neo4jVector(embedding_model,graph=graph)
vector_store = Neo4jVector.from_existing_graph(embedding=embedding_model,search_type="vector",node_label="Document",text_node_properties=['text'],embedding_node_property="vector_embedding",)


# query = "should i return my properties"
# query = "who is jane doe"
# query = "What are the dates i should be bothered by"
# query = "What are the dates i should be bothered by and what happened in each day"
# query = "who is the HR"
# query = "who should i contact about legal issues and tell in detail"
# query = "how much was the person paid while leaving"
# query = "will they work on holidays"
query = "what are the renewal terms"

docs_with_score = vector_store.similarity_search_with_score(query, k=9)

for doc, score in docs_with_score:
    print("-" * 80)
    print("Score: ", score)
    print(doc.page_content)
    print("-" * 80)

