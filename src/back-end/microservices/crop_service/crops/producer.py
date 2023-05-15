import pika, json

credentials = pika.PlainCredentials("myuser", "mypass")
parameters = pika.ConnectionParameters("", 5672, "/", credentials)

# parameters = pika.URLParameters('amqps://krimticf:rb_pr0-RABLjrHtEvKYUCa7lfQtMi8hG@jaragua.lmq.cloudamqp.com/krimticf')

connection = pika.BlockingConnection(parameters)

channel = connection.channel()


def publish(method, body):
    properties = pika.BaseConnection(method)
    channel.basic_publish(
        exchange="", routing_key="soil", body=json.dumps(body), properties=properties
    )
