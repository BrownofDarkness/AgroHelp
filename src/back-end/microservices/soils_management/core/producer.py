# import json
# import pika

# credentials = pika.PlainCredentials("myuser", "mypass")
# parameters = pika.ConnectionParameters("RabbitMq", 5672, "/", credentials)

# connection = pika.BlockingConnection(parameters)

# channel = connection.channel()


# def publish(method, body):
#     properties = pika.BasicProperties(method)
#     channel.basic_publish(
#         exchange="", routing_key="culture", body=json.dumps(body), properties=properties
#     )
