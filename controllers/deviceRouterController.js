const tryCatchMiddleware = require("../middlewares/tryCatch.js");
const { coloredLog } = require("../utils/coloredLog.js");

//! Prisma
const { PrismaClient } = require("@prisma/client");
const responseSend = require("../utils/responseSend.js");
const prisma = new PrismaClient();
// to throw error =>  return next(new ErrorHandler(message, statusCode));
// to throw error =>  return next(new ErrorHandler(message, statusCode));

//? Devices

const getAllDevices = tryCatchMiddleware(async (req, res, next) => {
  let devices = await prisma.device.findMany();
  responseSend(res, devices);
});

const createDevice = tryCatchMiddleware(async (req, res, next) => {
  coloredLog([JSON.stringify(req.body)], 5);

  let device = await prisma.device.create({ data: req.body });

  responseSend(res, device);
});

const updateDevice = tryCatchMiddleware(async (req, res, next) => {
  coloredLog([JSON.stringify(req.body)], 5);

  const device = await prisma.device.update({
    where: {
      id: id,
    },
    data: req.body,
  });

  responseSend(res, device)
});

const deleteDevice = tryCatchMiddleware(async (req, res, next) => {
  coloredLog([JSON.stringify(req.body)], 5);
  const { id } = req.body;

  let device = await prisma.device.delete({
    where: {
      id: id,
    },
  });

  responseSend(res, device)
});

//? MQTT TOPIC
const getAllMqttTopics = tryCatchMiddleware(async (req, res, next) => {
    let mqtt_topic = await prisma.mqtt_topic.findMany();
    responseSend(res, mqtt_topic);
  });

const createMqttTopic = tryCatchMiddleware(async (req, res, next) => {
  coloredLog([JSON.stringify(req.body)], 5);

  let mqtt_topic = await prisma.mqtt_topic.create({ data: req.body });

  responseSend(res, mqtt_topic);
});

module.exports = {
  getAllDevices,
  createDevice,
  updateDevice,
  deleteDevice,
  getAllMqttTopics,
  createMqttTopic
};
