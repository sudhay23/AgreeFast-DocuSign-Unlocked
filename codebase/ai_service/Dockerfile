FROM python:3.11-slim

RUN mkdir /agreefast_ai_service
RUN cd /agreefast_ai_service
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0
COPY ./requirements.txt /agreefast_ai_service
RUN pip install --no-cache-dir -r /agreefast_ai_service/requirements.txt
COPY . /agreefast_ai_service
ENV PYTHONUNBUFFERED=1

RUN apt-get update && \
    apt-get install -y \
    poppler-utils \
    tesseract-ocr \
    && rm -rf /var/lib/apt/lists/*

# Download the 'punkt' resource for NLTK
RUN python -c "import nltk; nltk.download('punkt')"

# Pip package patches
RUN cp -rf /agreefast_ai_service/patched-pip-files/langchain_experimental/graph_transformers/llm.py /usr/local/lib/python3.11/site-packages/langchain_experimental/graph_transformers/llm.py
RUN cp -rf /agreefast_ai_service/patched-pip-files/langchain_neo4j/chains/graph_qa/prompts.py /usr/local/lib/python3.11/site-packages/langchain_neo4j/chains/graph_qa/prompts.py

WORKDIR /agreefast_ai_service/src
# CMD [ "python","-m","uvicorn","app:app","--port","6500","--host","0.0.0.0" ]
CMD [ "python","-u","app.py" ]
