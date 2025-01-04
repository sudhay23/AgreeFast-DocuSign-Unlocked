import json
from pydantic import BaseModel
from typing import List
from langchain.prompts import ChatPromptTemplate

CAPTURE_OBLIGATORY_STATEMENTS_PROMPT = """


"""

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
    Remember that the dates in identified events are in DD-MM-YYYY format.

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

