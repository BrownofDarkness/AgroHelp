import json, pika
import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "forum_service.settings")
django.setup(set_prefix=True)
import traceback
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token




User = get_user_model()


def comsume_messages():
    credentials = pika.PlainCredentials("myuser", "mypass")
    parameters = pika.ConnectionParameters("localhost", 5672, "/", credentials)

    connection = pika.BlockingConnection(parameters=parameters)

    channel = connection.channel()

    channel.queue_declare("forum", durable=True)

    def callback(ch, method, properties, body):
        print("Recieve message", json.loads(body.decode()))
        content_type = properties.content_type
        message: dict = json.loads(body.decode())

        msg_type: str = message.get("type", None)
        data: dict = message.get("data", None)

        if msg_type == "user_created":
            user_data = data.get("user", None)
            user = User.objects.create(**user_data)
            user_token = data.get("token", None)
            if user_token:
                Token.objects.create(user=user, key=user_token)
            ch.basic_ack(delivery_tag=method.delivery_tag)
            print("User created!")

        if msg_type == "user_deleted":
            if data.get("id", None):
                User.objects.filter(id=data.get("id")).delete()
                ch.basic_ack(delivery_tag=method.delivery_tag)
                print("User Deleted!")

    channel.basic_consume(queue="forum", on_message_callback=callback, auto_ack=False)

    print("Start Consuming")
    print("[x] Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()


if __name__ =='__main__':
    try:
        comsume_messages()
    except Exception as e:
        traceback.print_exc()
