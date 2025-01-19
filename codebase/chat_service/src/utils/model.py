import sys, os
sys.path.append(os.path.abspath(os.path.join('..')))
from langchain_openai import AzureChatOpenAI
from langchain_ollama import OllamaEmbeddings

# Azure GPT-4o
def provision_chat_model(azure_deployment_name=os.getenv("AZURE_OPENAI_DEPLOYMENT_1")):
    chat_model = AzureChatOpenAI(
                                azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
                                azure_deployment=azure_deployment_name,
                                api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
                                api_key=os.getenv("AZURE_OPENAI_API_KEY"),
                            )
    return chat_model

# Ollama - nomic-embed-text
def provision_embedding_model():
    return OllamaEmbeddings(base_url=os.getenv("OLLAMA_URI"),model="nomic-embed-text")