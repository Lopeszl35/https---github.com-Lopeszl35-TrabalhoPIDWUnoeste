const express = require("express");

module.exports = (DependencyInjector) => {
  const router = express.Router();
  const MessagesController = require("../controller/messagesController");
  const controller = new MessagesController(DependencyInjector.get("MessagesService"));

  router.get("/", (req, res) => controller.getMessages(req, res)); // Rota para buscar mensagens

  return router;
};
