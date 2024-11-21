module.exports = (io, DependencyInjector) => {
    const MessagesService = DependencyInjector.get("MessagesService");
    const UsuariosService = DependencyInjector.get("UsuariosService");
  
    io.on("connection", (socket) => {
      console.log("Nova conexão:", socket.id);
  
      socket.on("authenticate", async (token) => {
        try {
          const user = await UsuariosService.verifyToken(token);
  
          if (!user) {
            console.log("Token inválido. Desconectando:", socket.id);
            socket.disconnect();
            return;
          }
  
          socket.data.username = user.username;
          console.log(`${user.username} autenticado no WebSocket`);
  
          // Enviar mensagens anteriores ao cliente
          socket.emit("previous_messages", await MessagesService.getMessages());
  
          // Salvar e retransmitir mensagens
          socket.on("message", async (text) => {
            await MessagesService.saveMessage(socket.data.username, text);
            io.emit("receive_message", { user: socket.data.username, text });
          });
  
          socket.on("disconnect", () => {
            console.log(`${socket.data.username} desconectado`);
          });
        } catch (error) {
          console.error("Erro na autenticação WebSocket:", error);
          socket.disconnect();
        }
      });
    });
  };
  