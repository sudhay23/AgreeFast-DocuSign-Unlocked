import requests, os

def notify_backend_ai_process_completion(envelope_id):
    endpoint = f"{os.getenv('BACKEND_BASE_URL')}/api/envelope/{envelope_id}/aiProcessingComplete"
    try:
        res = requests.post(endpoint,None)
    except Exception as e:
        print("Error in notifying the backend about AI process completion: ",e)
        