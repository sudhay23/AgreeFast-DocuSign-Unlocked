import os,json
from langchain_neo4j import Neo4jVector, GraphCypherQAChain, Neo4jGraph
from utils.prompts import PREPARE_FINAL_CHAT_ANSWER_FROM_CONTEXT_PROMPT
from utils.neo4j import get_neo4j_db_name

# Get Vector Embedding based context
def get_vector_embedding_context(user_question, envelope_id, llm, embedding_model):
    # FIXME: THE DB SHOULD BE CREATED FIRST AT TIME OF AI SUMMARIZATION
    graph = Neo4jGraph(url=os.getenv("NEO4J_URI"),database=get_neo4j_db_name(envelope_id),username=os.getenv("NEO4J_USERNAME"),password=os.getenv("NEO4J_PASSWORD"))
    # graph = Neo4jGraph(url=os.getenv("NEO4J_URI"),database=f"neo4j",username=os.getenv("NEO4J_USERNAME"),password=os.getenv("NEO4J_PASSWORD"))
    neo4j_vector = Neo4jVector(embedding_model,graph=graph)
    vector_store = neo4j_vector.from_existing_graph(embedding=embedding_model,search_type="hybrid",node_label="Document",text_node_properties=['text'],embedding_node_property="vector_embedding")

    # Collect Vector Embedding based context
    similar_vector_docs_with_score = vector_store.similarity_search_with_score(user_question, k=10)
    embeddings_context = [x[0].page_content for x in similar_vector_docs_with_score]
    return embeddings_context

# Get Graph Cypher based context
def get_graph_cypher_context(user_question, envelope_id, llm, embedding_model):
    # FIXME: THE DB SHOULD BE CREATED FIRST AT TIME OF AI SUMMARIZATION
    graph = Neo4jGraph(url=os.getenv("NEO4J_URI"),database=get_neo4j_db_name(envelope_id),username=os.getenv("NEO4J_USERNAME"),password=os.getenv("NEO4J_PASSWORD"))
    # graph = Neo4jGraph(url=os.getenv("NEO4J_URI"),database=f"neo4j",username=os.getenv("NEO4J_USERNAME"),password=os.getenv("NEO4J_PASSWORD"))

    # Just in time Cypher generation based retrival from Knowledge Graph
    return_raw_docs_cypher_chain = GraphCypherQAChain.from_llm(llm=llm,graph=graph,verbose=False,allow_dangerous_requests=True,validate_cypher=False,return_direct=True)

    retry = 7 
    graph_text_context = ""
    while retry>=0:
        retry -= 1
        try:
            result = return_raw_docs_cypher_chain.invoke(user_question)
            if len(json.dumps(result["result"]))>=100:
                graph_text_context = json.dumps(result["result"])
                break
        except:
            pass
    return graph_text_context


# Prepare final answer
def get_final_chat_answer(user_question, envelope_id, llm, embedding_model):
    embeddings_context = get_vector_embedding_context(user_question, envelope_id, llm, embedding_model)
    graph_text_context = get_graph_cypher_context(user_question, envelope_id, llm, embedding_model)

    # Answer user's question from collected context
    final_prompt = PREPARE_FINAL_CHAT_ANSWER_FROM_CONTEXT_PROMPT.format(user_question=user_question,embeddings_context=embeddings_context,graph_text_context=graph_text_context)

    final_response = llm.invoke(final_prompt)

    return final_response