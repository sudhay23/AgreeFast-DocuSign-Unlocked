import json
from pydantic import BaseModel
from typing import List
from langchain.prompts import ChatPromptTemplate

CAPTURE_OBLIGATORY_STATEMENTS_PROMPT = ChatPromptTemplate.from_template("""
    You are an expert in capturing statments from an agreement that are key obligations by the party in order to keep the agreement valid. Make sure to summarize the obligation/requirement statement without losing information to be conveyed.
    Most importantly, assume that a list of such obligations and key requirements and highlight statements you capture will be used to create a bigger exhaustive list of important duties and obligations of the parties involved which when failed to upheld will render the agreement void.
    So, take care not to invent new facts and only summarize what's already there in the content chunk given to you. Make sure to phrase all statements in 3rd party tone addressing the respective parties in the statements.
    IMPORTANT NOTES: Never explain yourself. Just return the JSON and nothing else. Follow the schema carefully. Avoid duplications and ignore trivial statements. Assign an "importance level" score on a scale of 1 - 3 based on how important the obligation is and how risky it will be if forfeited (1 being least important, 3 being highly important).
    Fill in the 'responsible_party_role_name' field in all uppercase format denoting the party to whom the statement is essential.

    <json_schema_for_your_reply> 
            {{
                'captured_now': [{{
                            "obligation_statement": "The Obligation Statement",
                            "importance_level": "Valid Date DD-MM-YYYY",
                            "responsible_party_role_name": "RoleNameOfTheResponsibleParty (eg. Lessee, Lessor, Owner, CEO, etc...)",
                        }}]
            }}
    </json_schema_for_your_reply>

    <json_data_already_captured_so_far> {captured_data} </json_data_already_captured_so_far>

    <current_content_chunk> {content_chunk} </current_content_chunk>
        

    Your Array of JSONs reply:
""")

class ObligatoryStatementData(BaseModel):
    obligation_statement: str
    importance_level: int
    responsible_party_role_name: str

class ObligatoryStatementResponse(BaseModel):
    captured_now: List[ObligatoryStatementData]

# --------------------------------------------------------------------------------------------------------------------------------------------

# CAPTURE_KEY_TIME_PERIODS_PROMPT = ChatPromptTemplate.from_template("""
#     You are an expert in finding dates (eg. March 20, 2012), relative time periods (eg. 5 years from signing this agreement, 3 years before expiry) along with the tasks or event that occurs at those dates and delivering as JSON according to the given schema.
#     NOTE: In case of relative time periods, appropriately fill in the missing start or end date from the data already captured or the provided current date. ONLY use the current date if nothing from the already captured data or content helps. Else use the related date from the provided content chunk or the already captured data. 
#     Data already captured is a JSON. You need to incrementally keep adding to this JSON with the data you capture now. IMPORTANTLY, Ignore the event if a valid start and end date could not be identified confidently. Do NOT assume today's date for anyother purpose if there is no rationale. Just ignore the event in those cases.
#     IMPORTANT NOTES: Never explain yourself. Just return the JSON and nothing else. Follow the schema carefully.

#     <json_schema_for_your_reply> 
#             {{
#                 'captured_now': [{{
#                             "start_date": "Valid Date DD-MM-YYYY",
#                             "end_date": "Valid Date DD-MM-YYYY",
#                             "description": "event or task description",
#                             "recurring": "(examples - every month, every tuesdays, every year)/ONE_TIME_EVENT"
#                         }}]
#             }}
#     </json_schema_for_your_reply>

#     <todays_date>{todays_date}</todays_date>

#     <json_data_already_captured_so_far> {captured_data} </json_data_already_captured_so_far>

#     <current_content_chunk> {content_chunk} </current_content_chunk>
        

#     Your Array of JSONs reply:
# """)
CAPTURE_KEY_TIME_PERIODS_PROMPT = ChatPromptTemplate.from_template("""
    You are an expert in finding dates (eg. March 20, 2012), relative time periods (eg. 5 years from signing this agreement, 3 years before expiry) along with the tasks or event that occurs at those dates and delivering as JSON according to the given schema.
    NOTE: In case of relative time periods, appropriately fill in the missing start or end date from the data already captured. Use the related date from the provided content chunk or the already captured data. 
    Data already captured is a JSON. You need to incrementally keep adding to this JSON with the data you capture now. IMPORTANTLY, Ignore the event if a valid start and end date could not be identified confidently. Do NOT assume any date for any event if there is no logical rationale. Just ignore the event in those cases.
    MOST IMPORTANTLY, never fail to miss key dates and times.
    IMPORTANT NOTES: Never explain yourself. Just return the JSON and nothing else. Follow the schema carefully.
    IMPORTANT: If an end date or start date is missing, rephrase the event description to sound like a one day event with the date you have i.e match the start and end date. Try to keep events phrased in a way to sound like one day events. (Example: Event1 - Agreement comes effective on January 3,2020 | Event2 - Agreement expires on January 3,2025). Make sure the link between these events is clearly mentioned in the description (Example: Event1's description will state that expiry is on January 3,2025)

    <json_schema_for_your_reply> 
            {{
                'captured_now': [{{
                            "start_date": "Valid Date DD-MM-YYYY",
                            "end_date": "Valid Date DD-MM-YYYY",
                            "description": "event or task description",
                            "recurring": "(examples - every month, every tuesdays, every year)/ONE_TIME_EVENT"
                        }}]
            }}
    </json_schema_for_your_reply>

    <json_data_already_captured_so_far> {captured_data} </json_data_already_captured_so_far>

    <current_content_chunk> {content_chunk} </current_content_chunk>
        

    Your Array of JSONs reply:
""")

PREPARE_ICS_FROM_CAPTURED_EVENTS_PROMPT = ChatPromptTemplate.from_template("""
    You are an expert .ics file maker. Make sure not to explain yourself or give rationales. Your output should be a JSON only. 
    From the input JSON of events, construct ICS only from events which logically make sense. Make sure to add a 1 day, 3 day and 1 week reminder to each event. DO NOT add reminders as seperate events but use ICS ALARM. Ignore events that do not have a valid start and end date. 
    Remember that the dates in identified events are in DD-MM-YYYY format. Also IMPORTANTLY, remember that you may be preparing the ICS file from events captured from more than 1 agreements, hence, make sure to distinctively identify and capture all those events in the calendar. Exhaustively capture events but IMPORTANTLY ensure that the ICS file is valid with correct date, time and reminder alarm values.

    <identified_events> 
        {identified_events_data}                                                                       
    </identified_events>
                            
    Your response should look like this: {{'data':<ICS STRING>}}
                                                                           
    Try to keep events split in a way to sound and look like one day events. (Example: Event1 - Agreement comes effective on January 3,2020 | Event2 - Agreement expires on January 3,2025). Make sure the link between these events is clearly mentioned in the description (Example: Event1's description will state that expiry is on January 3,2025)
                                                                           
    Your ICS response in JSON: 
""")

class DateEventData(BaseModel): 
    start_date: str  # Date in "DD-MM-YY" format
    end_date: str  # Date in "DD-MM-YY" format
    description: str  # Event or task description
    recurring: str  # Recurrence pattern or "ONE_TIME_EVENT"
    
class DateEventResponse(BaseModel):
    captured_now: List[DateEventData]

class ICSResponse(BaseModel):
    data: str

# --------------------------------------------------------------------------------------------------------------------------------------------

PREPARE_FINAL_CHAT_ANSWER_FROM_CONTEXT_PROMPT = ChatPromptTemplate.from_template("""
    You are an expert in answering a question from purely referring details from a context given to you. Don't forget to ONLY answer from the provided context and NEVER invent new facts. If you are unaable to answer from the context, simply tell "I'm sorry but I could'nt find an answer for that".
    The user's question will be within the <user_question> tag. Contexts will be given under both <embeddings_context> and <graph_text_context> tags. If atleast one of this has data within it, purely answer from those. If both these context tags are empty, simply tell "I'm sorry but I could'nt find an answer for that".
    Your return answer should be direct like a conversation with the user. Hence DO NOT include explanations and rationales in your answer. (Example: DO NOT include "Based on the provided context,..." to your answer. JUST ANSWER THE QUESTION DIRECTLY.)
    Answer to the user's question with all helpful information from the context as briefly but with all information essential to answering the question. 
                                                                                 
    <embeddings_context> 
        {embeddings_context}                                                          
    </embeddings_context> 
    
    <graph_text_context>
        {graph_text_context}
    </graph_text_context>
                                                                                 
    <user_question>{user_question}</user_question>
                                                                                 
    Your detailed helpful answer to the user: 
""")