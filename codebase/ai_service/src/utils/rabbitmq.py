import aio_pika, os, asyncio, json
from utils.neo4j import create_graph_database_for_envelope
from utils.mongodb import get_envelope_details

async def create_rabbitmq_connection():
    connection = await aio_pika.connect_robust(os.getenv("RABBITMQ_CONNECTION_STRING"))
    channel = await connection.channel()
    queue = await channel.declare_queue(os.getenv("RABBITMQ_WORKER_QUEUE_NAME"), durable=True)
    await queue.consume(queue_consumer_callback)

    # Keep the consumer running
    print("Started RabbitMQ consumer...")
    await asyncio.Event().wait()

async def queue_consumer_callback(message: aio_pika.IncomingMessage):
    async with message.process():
            try:
                message_payload = json.loads(message.body.decode())
                envelope_id = message_payload.get("envelope_id",None)
                if not envelope_id:
                     print("Message payload should contain 'envelope_id'")
                     message.nack()
                     return
                
                # Create a Neo4j Graph DB
                neo4j_db_name = create_graph_database_for_envelope(envelope_id)

                # Get the envelope data from MongoDB
                envelope_doc = get_envelope_details(envelope_id)
                print(envelope_doc)

                #TODO Loop through all documents and perform AI processing to build the knowledge graph


                #TODO Call 'ai_processing_complete' endpoint on API Server


                message.ack()
                return
            except Exception as e:
                print("Error Occured: ",e)
                print("Got: ",message.body.decode())
                message.nack()
                return