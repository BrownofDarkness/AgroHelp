import pika, json




def publish(method, body):
    try:
        credentials = pika.PlainCredentials("myuser", "mypass")
        parameters = pika.ConnectionParameters("localhost", 5672, "/", credentials)

        # parameters = pika.URLParameters('amqps://krimticf:rb_pr0-RABLjrHtEvKYUCa7lfQtMi8hG@jaragua.lmq.cloudamqp.com/krimticf')

        connection = pika.BlockingConnection(parameters)

        channel = connection.channel()
        properties = pika.BasicProperties(method)
        
        channel.basic_publish(
            exchange="", routing_key="soil", body=json.dumps(body), properties=properties
        )
    except Exception as e:
        print("Could not connect to rabbitMq server ",e)