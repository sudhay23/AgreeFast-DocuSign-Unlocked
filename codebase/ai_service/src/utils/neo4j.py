from neo4j import GraphDatabase
import os

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

# TODO
def build_neo4j_knowledge_graph(envelope_id):
    pass