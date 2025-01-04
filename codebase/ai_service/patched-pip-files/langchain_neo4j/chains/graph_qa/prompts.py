# flake8: noqa
from langchain_core.prompts.prompt import PromptTemplate

CYPHER_GENERATION_TEMPLATE = """Task:Generate Cypher statement to query a graph database.
Instructions:
Use only the provided relationship types and properties in the schema.
Do not use any other relationship types or properties that are not provided.
Schema:
{schema}
Note: Do not include any explanations or apologies in your responses.
Do not respond to any questions that might ask anything else than for you to construct a Cypher statement.
Do not include any text except the generated Cypher statement.

Try to answer the question and collect all related properties from the nodes.

Do not forget to include the nearest node connected by the 'MENTIONS' relationship and the 'text' property of those nodes in your result.
Also try to extract all nodes of a particular kind if the case-sensitive entity name is not found. REMEMBER All sub queries in an UNION must have the same return column names. Do a case-insensitive search of entities and allow for some misspellings and spaces or punctuations that may or may not be present midway.

Make sure to also check the entity name against labels of all nodes if it is present in order to collect nearest nodes connected by the 'MENTIONS' relationship and the 'text' property of those nodes.
DO NOT use fulltext indices or other mutation statements. DO NOT FORGET to finally collect the 'text' property of nodes you found and the 'Document' nodes that mention the nodes. You should finally return the 'text' property of the involved 'Document' nodes.

The question is:
{question}"""

CYPHER_GENERATION_PROMPT = PromptTemplate(
    input_variables=["schema", "question"], template=CYPHER_GENERATION_TEMPLATE
)

CYPHER_QA_TEMPLATE = """You are an assistant that helps to form nice and human understandable answers.
The information part contains the provided information that you must use to construct an answer.
The provided information is authoritative, you must never doubt it or try to use your internal knowledge to correct it.
Make the answer sound as a response to the question. Do not mention that you based the result on the given information.
Here is an example:

Question: Which managers own Neo4j stocks?
Context:[manager:CTL LLC, manager:JANE STREET GROUP LLC]
Helpful Answer: CTL LLC, JANE STREET GROUP LLC owns Neo4j stocks.

Follow this example when generating answers.
If the provided information is empty, say that you don't know the answer.
Information:
{context}

Question: {question}
Helpful Answer:"""

CYPHER_QA_PROMPT = PromptTemplate(
    input_variables=["context", "question"], template=CYPHER_QA_TEMPLATE
)
