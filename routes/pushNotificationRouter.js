const express = require("express");
const webPush = require("web-push");
const Router = express.Router();

const publicVapidKey =
  "BCVr9ztbS6K0D1bxnOXt-KLeM-TfvN-pnvmL-MiEMCP_X5RtuxtMN4e_NC7gtgq3rcU5gkilDtZa6w0gZ6r_HrQ";
const privateVapidKey = "OR0k4PSIOKdwFnGgGN6mtZTJoEnrUEMgaPV9S2OZC7s";

webPush.setVapidDetails("http://localhost.com",publicVapidKey,privateVapidKey);

Router.post("/", (req, res, next) => {
  const subscription = req.body.subscription;
  console.log(subscription);
  webPush.sendNotification(subscription,JSON.stringify("Hello ,World"))
});

const sendNotification = () => {

};

module.exports.pushNotificationRouter = Router;
module.exports.sendNotification = sendNotification;
