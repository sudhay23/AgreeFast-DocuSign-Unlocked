import aio_pika, os, asyncio, json, traceback
from utils.neo4j import create_graph_database_for_envelope
from utils.mongodb import get_envelope_details
from utils.model import provision_chat_model, provision_embedding_model
from utils.extract_data import extract_events, extract_obligatory_statements, constuct_ics_file, calculate_compliance_obligatory_score

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

                #TODO Loop through all documents and perform AI processing to build the knowledge graph and extract data
                llm = provision_chat_model()
                embedding_model = provision_embedding_model()

                for document in envelope_doc['agreements']:
                    # TODO: Make knowledge graph
                    extract_events(envelope_id,document['file_name'],document['file_uri'],llm,embedding_model)
                    extract_obligatory_statements(envelope_id,document['file_name'],document['file_uri'],llm,embedding_model)

                # Construct ICS files from all found events
                constuct_ics_file(envelope_id, llm, embedding_model)

                # Calculate compliance_obligatory_score from all found obligations
                calculate_compliance_obligatory_score(envelope_id, llm, embedding_model)


                #TODO Call 'ai_processing_complete' endpoint on API Server


                message.ack()
                return
            except Exception as e:
                print("Error Occured: ",e)
                traceback.print_exception(e)
                print("Got: ",message.body.decode())
                message.nack()
                return