class MessagesController {
    constructor(messagesService) {
      this.messagesService = messagesService; // Injetado pelo DependencyInjector
    }
  
    async getMessages(req, res) {
      try {
        const messages = await this.messagesService.getMessages();
        res.status(200).json(messages); // Retorna as mensagens em formato JSON
      } catch (error) {
        res.status(500).json({ error: "Erro ao buscar mensagens." });
      }
    }
  }
  
  module.exports = MessagesController;
  