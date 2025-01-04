FROM python:3.11-slim

RUN mkdir /agreefast_ai_service
RUN cd /agreefast_ai_service
COPY ./requirements.txt /agreefast_ai_service
RUN pip install --no-cache-dir -r /agreefast_ai_service/requirements.txt
COPY . /agreefast_ai_service
EXPOSE 5000

# Pip package patches
RUN cp -rf /agreefast_ai_service/patched-pip-files/langchain_experimental/graph_transformers/llm.py /usr/local/lib/python3.11/site-packages/langchain_experimental/graph_transformers/llm.py
RUN cp -rf /agreefast_ai_service/patched-pip-files/langchain_neo4j/chains/graph_qa/prompts.py /usr/local/lib/python3.11/site-packages/langchain_neo4j/chains/graph_qa/prompts.py

WORKDIR /agreefast_ai_service/src
CMD [ "python","-m","uvicorn","app:app","--port","5000","--host","0.0.0.0" ]
