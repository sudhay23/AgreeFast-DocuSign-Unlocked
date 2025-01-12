import aio_pika, os, asyncio, json, traceback
from langchain_neo4j import Neo4jVector
from utils.neo4j import get_neo4j_db_name
from utils.neo4j import create_graph_database_for_envelope, build_neo4j_knowledge_graph
from utils.mongodb import get_envelope_details
from utils.model import provision_chat_model, provision_embedding_model
from utils.extract_data import extract_events, extract_obligatory_statements, constuct_ics_file, calculate_compliance_obligatory_score
from utils.api import notify_backend_ai_process_completion

async def create_rabbitmq_connection():
    try:
        connection = await aio_pika.connect_robust(os.getenv("RABBITMQ_CONNECTION_STRING"))
        channel = await connection.channel()
        queue = await channel.declare_queue(os.getenv("RABBITMQ_WORKER_QUEUE_NAME"), durable=True)
        await queue.consume(queue_consumer_callback,no_ack=True)

        # Keep the consumer running
        print("Started RabbitMQ consumer...")
        await asyncio.Event().wait()
    except:
        exit(1)

async def queue_consumer_callback(message: aio_pika.IncomingMessage):
    async with message.process(ignore_processed=True):
            try:
                message_payload = json.loads(message.body.decode())
                envelope_id = message_payload.get("envelope_id",None)
                if not envelope_id:
                    print("Message payload should contain 'envelope_id'")
                    # await message.nack(requeue=False)
                    return
                
                # Create a Neo4j Graph DB
                neo4j_db_name = create_graph_database_for_envelope(envelope_id)

                # Get the envelope data from MongoDB
                envelope_doc = get_envelope_details(envelope_id)

                # Loop through all documents and perform AI processing to build the knowledge graph and extract data
                llm = provision_chat_model()
                embedding_model = provision_embedding_model()

                for document in envelope_doc['agreements']:
                    extract_events(envelope_id,document['file_name'],document['file_uri'],llm,embedding_model)
                    extract_obligatory_statements(envelope_id,document['file_name'],document['file_uri'],llm,embedding_model)
                    build_neo4j_knowledge_graph(envelope_id,document['file_name'],document['file_uri'],llm,embedding_model)

                # Construct ICS files from all found events
                constuct_ics_file(envelope_id, llm, embedding_model)

                # Calculate compliance_obligatory_score from all found obligations
                calculate_compliance_obligatory_score(envelope_id, llm, embedding_model)

                # Prepare Vector Store in the knowledge graph
                vector_store = Neo4jVector.from_existing_graph(embedding=embedding_model,search_type="hybrid",node_label="Document",text_node_properties=['text'],embedding_node_property="vector_embedding",url=os.getenv("NEO4J_URI"),database=get_neo4j_db_name(envelope_id),username=os.getenv("NEO4J_USERNAME"),password=os.getenv("NEO4J_PASSWORD"))


                # Call 'ai_processing_complete' endpoint on Backend API Server
                notify_backend_ai_process_completion(envelope_id)

                print(f"AI Processing complete for envelope {envelope_id}")
                # await message.ack()
                return
            except Exception as e:
                print("Error Occured: ",e)
                traceback.print_exception(e)
                print("Got: ",message.body.decode())
                # await message.nack(requeue=False)
                return