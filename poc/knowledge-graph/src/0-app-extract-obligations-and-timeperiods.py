import dotenv
dotenv.load_dotenv("./.env")
import os,json
from datetime import datetime
from utils.model import provision_chat_model
from langchain_experimental.graph_transformers import LLMGraphTransformer
from langchain_community.document_loaders.pdf import UnstructuredPDFLoader,OnlinePDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from utils.prompts import CAPTURE_KEY_TIME_PERIODS_PROMPT, DateEventResponse, PREPARE_ICS_FROM_CAPTURED_EVENTS_PROMPT, ICSResponse,  CAPTURE_OBLIGATORY_STATEMENTS_PROMPT, ObligatoryStatementResponse


llm = provision_chat_model()
document_link = "http://127.0.0.1:5500/static_store/Premise%20Leasing.pdf"
# document_link = "http://127.0.0.1:5500/static_store/Employee%20Seperation.pdf"
# document_link = "http://127.0.0.1:5500/static_store/MSA.pdf"
# document_link = "http://127.0.0.1:5500/static_store/Sales%20MoU.pdf"
splitter = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=100)
loader = OnlinePDFLoader(document_link)

llm_transformer = LLMGraphTransformer(llm=llm)

documents = loader.load()

documents = splitter.split_documents(documents)

# Extract Key Timeperiods and dates
date_events = {'data':[]}

for x,y in zip(documents,range(len(documents))):
    captured_date_events = llm.with_structured_output(DateEventResponse).invoke(CAPTURE_KEY_TIME_PERIODS_PROMPT.format(todays_date=datetime.today().strftime("%d-%m-%Y"),captured_data=date_events,content_chunk=x.page_content))
    date_events['data'].extend([x.model_dump() for x in captured_date_events.captured_now])
    print(f"{y+1}/{len(documents)} - Found {len(date_events['data'])} events")

print("FINAL 1 ---------------")
# print(date_events)

# Construct ICS file
ics_response = llm.with_structured_output(ICSResponse).invoke(PREPARE_ICS_FROM_CAPTURED_EVENTS_PROMPT.format(identified_events_data=date_events))
# print(ics_response)
with open("./myfile_events.ics","w") as fp:
    fp.write(ics_response.data)

# Extract Obligations
obligatory_statements = {'data':[]}

for x,y in zip(documents,range(len(documents))):
    captured_obligatory_statements = llm.with_structured_output(ObligatoryStatementResponse).invoke(CAPTURE_OBLIGATORY_STATEMENTS_PROMPT.format(captured_data=obligatory_statements,content_chunk=x.page_content))
    obligatory_statements['data'].extend([x.model_dump() for x in captured_obligatory_statements.captured_now])
    print(f"{y+1}/{len(documents)} - Found {len(obligatory_statements['data'])} obligatory statements")

print("FINAL 2 ---------------")
# print(obligatory_statements)

# Write to Obligations JSON file
with open("./myfile_obligations.json","w") as fp:
    fp.write(json.dumps(obligatory_statements))

obligatory_score = round(10*(sum([x["importance_level"] for x in obligatory_statements["data"]])/(3*len(obligatory_statements["data"]))),1)
print(f"Your Compliance Obligatory Score = {obligatory_score}")
