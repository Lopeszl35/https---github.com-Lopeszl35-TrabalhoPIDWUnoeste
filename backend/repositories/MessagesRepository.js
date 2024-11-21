class MessagesRepository {
    constructor(database) {
      this.database = database; // Objeto do banco injetado pelo DependencyInjector
    }
  
    async saveMessage(username, message) {
      const query = "INSERT INTO messages (username, message, timestamp) VALUES (?, ?, ?)";
      const timestamp = new Date(); // Cria o timestamp no momento de salvar
      await this.database.query(query, [username, message, timestamp]);
    }
  
    async getMessages() {
      const query = "SELECT * FROM messages ORDER BY timestamp DESC";
      const [rows] = await this.database.query(query); // Retorna todas as mensagens
      return rows;
    }
  }
  
  module.exports = MessagesRepository  