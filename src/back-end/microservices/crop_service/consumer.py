import os, pika, json
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "crop_service.settings")
django.setup()

from crops.models import Soil


credentials = pika.PlainCredentials("myuser", "mypass")
parameters = pika.ConnectionParameters("RabbitMq", 5672, "/", credentials)

connection = pika.BlockingConnection(parameters)

channel = connection.channel()

channel.queue_declare(queue="culture")


def callback(ch, method, properties, body):
    print("Recieve in culture")
    # print("Method : ", method)
    # print("Properties : ", properties)
    data: Soil = json.loads(body)

    if method.routing_key == "soil_created":
        Soil.objects.create(**data)

    if method.routing_key == "soil_updated":
        soil = Soil.objects.get(id=data.id)
        soil.type = data.type
        soil.description = data.description
        soil.composition = data.composition
        soil.save()

    print("Soil Created")


channel.basic_consume(queue="culture", on_message_callback=callback, auto_ack=True)


print("Start Consuming")
channel.start_consuming()

channel.close(reply_code=404, reply_text="AMQP Close")
