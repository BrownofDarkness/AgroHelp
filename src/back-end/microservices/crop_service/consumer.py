from crops.models import Soil
import os
import pika
import json
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "crop_service.settings")
django.setup()


credentials = pika.PlainCredentials("myuser", "mypass")
parameters = pika.ConnectionParameters(
    "host.docker.internal", 5672, "/", credentials)

# parameters = pika.URLParameters('amqps://krimticf:rb_pr0-RABLjrHtEvKYUCa7lfQtMi8hG@jaragua.lmq.cloudamqp.com/krimticf')

connection = pika.BlockingConnection(parameters)

channel = connection.channel()

channel.queue_declare(queue="culture")


def callback(ch, method, properties, body):
    print("Recieve in culture")
    # print("Method : ", method)
    # print("Properties : ", properties)
    data: Soil = json.loads(body)

    if properties.content_type == "soil_created":
        Soil.objects.create(**data)
        print("Soil Created")

    # properties.content_type
    if properties.content_type == "soil_updated":
        soil = Soil.objects.get(id=data.id)
        soil.type = data.type
        soil.description = data.description
        soil.composition = data.composition
        soil.save()

    print(" [*] Soil Created")


channel.basic_consume(
    queue="culture", on_message_callback=callback, auto_ack=True)


print("Start Consuming")
print(" [x] Waiting for messages. To exit press CTRL+C")
channel.start_consuming()

channel.close(reply_code=404, reply_text="AMQP Close")
