class MessagesService {
    constructor(messagesRepository) {
      this.messagesRepository = messagesRepository; // Injetado pelo DependencyInjector
    }
  
    async saveMessage(username, message) {
      await this.messagesRepository.saveMessage(username, message);
    }
  
    async getMessages() {
      return await this.messagesRepository.getMessages();
    }
  }
  
  module.exports = MessagesService;
  