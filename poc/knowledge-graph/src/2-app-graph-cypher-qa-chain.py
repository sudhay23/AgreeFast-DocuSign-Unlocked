# INFO: Works fine for extracting dates and the obligations
import dotenv
dotenv.load_dotenv("./.env")
import os,time
from utils.model import provision_chat_model
from langchain_neo4j import GraphCypherQAChain, Neo4jGraph

llm = provision_chat_model()
graph = Neo4jGraph(url=os.getenv("NEO4J_URI"),database=f"neo4j",username=os.getenv("NEO4J_USERNAME"),password=os.getenv("NEO4J_PASSWORD"))
graph.refresh_schema()

return_raw_docs_chain = GraphCypherQAChain.from_llm(llm=llm,graph=graph,verbose=True,allow_dangerous_requests=True,validate_cypher=False,return_direct=True)
# return_processed_answer_chain = GraphCypherQAChain.from_llm(llm=llm,graph=graph,verbose=True,allow_dangerous_requests=True,validate_cypher=False,return_direct=False)

# query = "What are the dates i should be bothered by"
# query = "What are the dates i should be bothered by and what happened in each day"  # IMPORTANT FOR ICS FILE CREATION
# query = "What are the dates and relative time periods i should be bothered by and what happened in each day"  # IMPORTANT FOR ICS FILE CREATION
# query = "who is the HR"
# query = "who should i contact about legal issues and tell in detail"
# query = "how much was the person paid while leaving"
# query = "will they work on holidays"
# query = "what are the renewal terms"
query = "how soon should the atm be put"

print(return_raw_docs_chain.run(query))