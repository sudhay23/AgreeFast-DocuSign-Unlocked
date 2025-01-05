import pymongo, os

def get_envelope_details(envelope_id):
    mongoclient = pymongo.MongoClient(os.getenv("MONGODB_URI"))
    db = mongoclient["test"]
    collection = db["envelopes"]
    doc = collection.find_one({"envelope_id":envelope_id})
    return doc
