const {
  getAllDevices,
  createDevice,
  updateDevice,
  deleteDevice,
  createMqttTopic,
  getAllMqttTopics,
} = require("../controllers/deviceRouterController");

const router = require("express").Router();

router.route("/device").get(getAllDevices).post(createDevice);
router.route("/mqtt_topic").get(getAllMqttTopics).post(createMqttTopic);
router.route("/messages").get().post();
router.route("/message_ack").get().post();

module.exports = router;
