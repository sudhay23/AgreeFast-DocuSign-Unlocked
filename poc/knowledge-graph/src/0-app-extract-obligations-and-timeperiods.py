import dotenv
dotenv.load_dotenv("./.env")
import os
from datetime import datetime
from utils.model import provision_chat_model
from langchain_experimental.graph_transformers import LLMGraphTransformer
from langchain_community.document_loaders.pdf import UnstructuredPDFLoader,OnlinePDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from utils.prompts import CAPTURE_KEY_TIME_PERIODS_PROMPT, DateEventResponse, PREPARE_ICS_FROM_CAPTURED_EVENTS_PROMPT, ICSResponse


llm = provision_chat_model()
# document_link = "http://127.0.0.1:5500/static_store/Employee%20Seperation.pdf"
document_link = "http://127.0.0.1:5500/static_store/MSA.pdf"
splitter = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=100)
loader = OnlinePDFLoader(document_link)

llm_transformer = LLMGraphTransformer(llm=llm)

documents = loader.load()

documents = splitter.split_documents(documents)

date_events = {'data':[]}

# Extract Key Timeperiods and dates
for x,y in zip(documents,range(len(documents))):
    captured_date_events = llm.with_structured_output(DateEventResponse).invoke(CAPTURE_KEY_TIME_PERIODS_PROMPT.format(todays_date=datetime.today().strftime("%d-%m-%Y"),captured_data=date_events,content_chunk=x.page_content))
    date_events['data'].extend([x.model_dump() for x in captured_date_events.captured_now])
    print(f"{y+1}/{len(documents)} - Found {len(date_events['data'])} events")

print("FINAL ---------------")
print(date_events)

# Construct ICS file
ics_response = llm.with_structured_output(ICSResponse).invoke(PREPARE_ICS_FROM_CAPTURED_EVENTS_PROMPT.format(identified_events_data=date_events))
print(ics_response)
with open("./myfile4.ics","w") as fp:
    fp.write(ics_response.data)

# TODO: Extract Obligations