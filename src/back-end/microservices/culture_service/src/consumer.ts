import amqp from "amqplib";
import { Soil, Culture, SoilCulture } from "./models";
var channel: amqp.Channel, connection: amqp.Connection;
import colors from "colors";
// connectQueue();

export async function connectQueue() {
  try {
    connection = await amqp.connect("amqp://myuser:mypass@localhost:5672");
    channel = await connection.createChannel();

    await channel.assertQueue("culture");

    channel.consume("culture", (data) => {
      console.log("Recieve ".green.bold, { data });
      const receiveData = JSON.parse(data.content.toString());
      const contentType = data.properties.contentType;
      console.log("Content type", contentType);
      const createSoil = (soilData) => {
        Soil.create({
          id: soilData.id,
          type: soilData.type,
          description: soilData.description,
          composition: soilData.composition,
        }).then((soil) => {
          console.log(`Soil ${soil.type} created!`);
          channel.ack(data);
        });
      };
      if (contentType == "soil_created") {
        Soil.create({
          id: receiveData.data.id,
          type: receiveData.data.type,
          description: receiveData.data.description,
          composition: receiveData.data.composition,
        }).then((soil) => {
          console.log(`Soil ${soil.type} created!`);
          channel.ack(data);
        });
      }
      if (contentType == "soil_updated") {
        Soil.findByPk(receiveData.data.id).then((soil) => {
          if (!soil) {
            createSoil(receiveData.data);
          } else {
            if (receiveData.data.type != soil.type) {
              soil.type = receiveData.data.type;
            }
            if (receiveData.data.description != soil.description) {
              soil.description = receiveData.data.description;
            }
            if (receiveData.data.composition != soil.composition) {
              soil.composition = receiveData.data.composition;
            }
            soil.save().then((updated_culture) => {
              console.log("CUlture updated");
              channel.ack(data);
            });
          }
        });
      }
      if (contentType === "soil_culture_created") {
        const { soil, culture } = receiveData.data;
        Culture.findByPk(culture.id).then((cultureExists) => {
          if (cultureExists) {
            Soil.findByPk(soil.id).then((soilExists) => {
              if (soilExists) {
                SoilCulture.create({
                  soil_id: soil.id,
                  culture_id: culture.id,
                }).then((soilCulture) => {
                  console.log("Soil and Culture Related Successfully");
                  channel.ack(data);
                });
              } else {
                Soil.create(soil).then((soilData) => {
                  SoilCulture.create({
                    soil_id: soilData.id,
                    culture_id: culture.id,
                  }).then((soilCulture) => {
                    console.log("Soil and Culture Related Successfully");
                    channel.ack(data);
                  });
                });
              }
            });
          } else {
            channel.ack(data);
          }
        });
      }
      console.log("Recieve Data : ", receiveData);
      console.log("Buffer Data : ", Buffer.from(data.content));
    });
    console.log(colors.white.bold("[culture] Start Consumming"));
    console.log(
      `[x] Waiting for messages. To exit press CTRL+C`.black.bgWhite.bold
    );
  } catch (err) {
    console.log(err);
  }
}
