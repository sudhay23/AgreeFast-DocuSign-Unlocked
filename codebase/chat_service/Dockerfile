FROM python:3.11-slim

RUN mkdir /agreefast_chat_service
RUN cd /agreefast_chat_service
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0
COPY ./requirements.txt /agreefast_chat_service
RUN pip install --no-cache-dir -r /agreefast_chat_service/requirements.txt
COPY . /agreefast_chat_service
EXPOSE 6500
ENV PYTHONUNBUFFERED=1

# Pip package patches
RUN cp -rf /agreefast_chat_service/patched-pip-files/langchain_experimental/graph_transformers/llm.py /usr/local/lib/python3.11/site-packages/langchain_experimental/graph_transformers/llm.py
RUN cp -rf /agreefast_chat_service/patched-pip-files/langchain_neo4j/chains/graph_qa/prompts.py /usr/local/lib/python3.11/site-packages/langchain_neo4j/chains/graph_qa/prompts.py

WORKDIR /agreefast_chat_service/src
# CMD [ "python","-m","uvicorn","app:app","--port","6500","--host","0.0.0.0" ]
CMD [ "python","-u","app.py" ]
