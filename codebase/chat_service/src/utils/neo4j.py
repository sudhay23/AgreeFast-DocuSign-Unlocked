def get_neo4j_db_name(envelope_id:str):
    return f'neo4j{envelope_id.replace("-","")}'
    # return f'neo4j'