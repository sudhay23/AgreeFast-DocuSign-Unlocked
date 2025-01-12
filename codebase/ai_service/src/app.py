import dotenv,os
dotenv.load_dotenv("../../../.env")
from utils.rabbitmq import create_rabbitmq_connection, queue_consumer_callback

import pika

if __name__ == "__main__":
    channel = create_rabbitmq_connection()

    # Declare the queue from which we want to consume messages
    channel.queue_declare(queue=os.getenv("RABBITMQ_WORKER_QUEUE_NAME"), durable=True)

    # Set up the consumer to listen to the queue
    channel.basic_consume(queue=os.getenv("RABBITMQ_WORKER_QUEUE_NAME"), on_message_callback=queue_consumer_callback, auto_ack=False)

    # Start consuming (this will block until the consumer is manually stopped)
    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()
