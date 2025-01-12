import dotenv, logging
dotenv.load_dotenv("./.env")
import os
from datetime import datetime
from utils.model import provision_chat_model
from utils.mongodb import update_captured_events, update_events_ics, update_compliance_obligatory_score, update_obligatory_statements, get_envelope_details
from langchain_community.document_loaders.pdf import OnlinePDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from utils.prompts import CAPTURE_KEY_TIME_PERIODS_PROMPT, DateEventResponse, PREPARE_ICS_FROM_CAPTURED_EVENTS_PROMPT, ICSResponse,  CAPTURE_OBLIGATORY_STATEMENTS_PROMPT, ObligatoryStatementResponse


def extract_events(envelope_id, document_name, document_path, llm, embedding_model):
    logging.info(f"----Extracting events in '{document_name}'----")
    document_link = f"{os.getenv('BACKEND_BASE_URL')}{document_path}"

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=100)
    loader = OnlinePDFLoader(document_link)
    documents = loader.load()
    chunked_documents = splitter.split_documents(documents)

    # Extract Key Timeperiods and dates
    date_events = {'data':[]}

    for x,y in zip(chunked_documents,range(len(chunked_documents))):
        captured_date_events = llm.with_structured_output(DateEventResponse).invoke(CAPTURE_KEY_TIME_PERIODS_PROMPT.format(todays_date=datetime.today().strftime("%d-%m-%Y"),captured_data=date_events,content_chunk=x.page_content))
        date_events['data'].extend([x.model_dump() for x in captured_date_events.captured_now])
        logging.info(f"{y+1}/{len(chunked_documents)} - Found {len(date_events['data'])} events")

    # Update to include the document name
    for i in range(len(date_events['data'])):
        date_events['data'][i]['document_name'] = document_name
    
    # Write captured events to DB
    update_captured_events(envelope_id, date_events['data'])


def constuct_ics_file(envelope_id, llm, embedding_model):
    logging.info(f"----Building ICS file for envelope '{envelope_id}'----")
    # Get all recorded events from DB
    date_events = get_envelope_details(envelope_id)['events']

    # Construct ICS file
    print("ICS Prompt: ",PREPARE_ICS_FROM_CAPTURED_EVENTS_PROMPT.format(identified_events_data=date_events))
    # ics_response = llm.with_structured_output(ICSResponse).invoke(PREPARE_ICS_FROM_CAPTURED_EVENTS_PROMPT.format(identified_events_data=date_events))

    # Use GPT-4o-mini to construct ICS file
    mini_llm = provision_chat_model(os.getenv("AZURE_OPENAI_DEPLOYMENT_2"))
    ics_response = mini_llm.with_structured_output(ICSResponse).invoke(PREPARE_ICS_FROM_CAPTURED_EVENTS_PROMPT.format(identified_events_data=date_events))

    # Write ICS file to DB
    update_events_ics(envelope_id,ics_response.data)
    
def extract_obligatory_statements(envelope_id, document_name, document_path, llm, embedding_model):
    logging.info(f"----Extracting obligatory statements in '{document_name}'----")
    document_link = f"{os.getenv('BACKEND_BASE_URL')}{document_path}"

    # Extract Obligations
    obligatory_statements = {'data':[]}

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=100)
    loader = OnlinePDFLoader(document_link)
    documents = loader.load()
    chunked_documents = splitter.split_documents(documents)

    for x,y in zip(chunked_documents,range(len(chunked_documents))):
        captured_obligatory_statements = llm.with_structured_output(ObligatoryStatementResponse).invoke(CAPTURE_OBLIGATORY_STATEMENTS_PROMPT.format(captured_data=obligatory_statements,content_chunk=x.page_content))
        obligatory_statements['data'].extend([x.model_dump() for x in captured_obligatory_statements.captured_now])
        logging.info(f"{y+1}/{len(chunked_documents)} - Found {len(obligatory_statements['data'])} obligatory statements")
    
    # Update to include the document name
    for i in range(len(obligatory_statements['data'])):
        obligatory_statements['data'][i]['document_name'] = document_name

    # Write obligations to DB
    update_obligatory_statements(envelope_id, obligatory_statements['data'])

def calculate_compliance_obligatory_score(envelope_id, llm, embedding_model):
    # Get all recorded obligations from DB
    obligatory_statements = get_envelope_details(envelope_id)['obligations']

    # Write Compliance Obligatory Score to DB
    compliance_obligatory_score = 100*round((sum([x["importance_level"] for x in obligatory_statements])/(3.5*len(obligatory_statements))),2)
    update_compliance_obligatory_score(envelope_id, compliance_obligatory_score)
