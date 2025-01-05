import pymongo, os

def get_envelope_details(envelope_id):
    mongoclient = pymongo.MongoClient(os.getenv("MONGODB_URI"))
    db = mongoclient["test"]
    collection = db["envelopes"]
    doc = collection.find_one({"envelope_id":envelope_id})
    return doc

def update_captured_events(envelope_id, events):
    mongoclient = pymongo.MongoClient(os.getenv("MONGODB_URI"))
    db = mongoclient["test"]
    collection = db["envelopes"]
    result = collection.update_one({"envelope_id":envelope_id},{"$push":{"events":{"$each":events}}})
    return result

def update_events_ics(envelope_id, icsFile):
    mongoclient = pymongo.MongoClient(os.getenv("MONGODB_URI"))
    db = mongoclient["test"]
    collection = db["envelopes"]
    result = collection.update_one({"envelope_id":envelope_id},{"$set":{"event_ics":icsFile}})
    return result

def update_obligatory_statements(envelope_id, obligatory_statements):
    mongoclient = pymongo.MongoClient(os.getenv("MONGODB_URI"))
    db = mongoclient["test"]
    collection = db["envelopes"]
    result = collection.update_one({"envelope_id":envelope_id},{"$push":{"obligations":{"$each":obligatory_statements}}})
    return result

def update_compliance_obligatory_score(envelope_id, compliance_obligatory_score):
    mongoclient = pymongo.MongoClient(os.getenv("MONGODB_URI"))
    db = mongoclient["test"]
    collection = db["envelopes"]
    result = collection.update_one({"envelope_id":envelope_id},{"$set":{"compliance_obligatory_scores":compliance_obligatory_score}})
    return result

