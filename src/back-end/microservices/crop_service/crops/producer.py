import pika, json

credentials = pika.PlainCredentials("myuser", "mypass")
parameters = pika.ConnectionParameters("RabbitMq", 5672, "/", credentials)

connection = pika.BlockingConnection(parameters)

channel = connection.channel()


def publish(method, body):
    properties = pika.BaseConnection(method)
    channel.basic_publish(
        exchange="", routing_key="soil", body=json.dumps(body), properties=properties
    )
