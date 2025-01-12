import dotenv
dotenv.load_dotenv("../../../.env")
import uvicorn
from fastapi import FastAPI, Response, Request
from utils.model import provision_chat_model, provision_embedding_model
from utils.fetch_rag_context import get_final_chat_answer


# Create the FastAPI Server
app = FastAPI()

# GET / endpoint
@app.get("/")
def read_root():
    return "Chat Service is UP"

# POST /chat endpoint
@app.post("/chat")
async def docusign_envelope_chat(req:Request, res: Response):
    body = await req.json()
    envelope_id = body.get("envelope_id",None)
    user_question = body.get("user_question",None)

    if not user_question or not envelope_id:
        res.status_code = 400
        return {"error": "'user_question' and 'envelope_id' are required in the request body", "response": None}

    # Invoke the chatbot
    response = None
    try:
        llm = provision_chat_model()
        embedding_model = provision_embedding_model()

        response = get_final_chat_answer(user_question, envelope_id, llm, embedding_model)
    except Exception as err:
        print(err)
        res.status_code = 500
        return {"error": f"An Error Occurred: {err}", "response":None}

    return {"error": None, "response":str(response.content)}
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=6500)
