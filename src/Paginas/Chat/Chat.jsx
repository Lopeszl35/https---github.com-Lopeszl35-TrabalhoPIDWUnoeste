import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Chat = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (!token) {
            navigate('/'); // Redireciona para login se não autenticado
            return;
        }

        socket.emit('authenticate', token); // Envia o token ao conectar

        socket.on('receive_message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [token, navigate]);

    const sendMessage = () => {
        if (newMessage.trim()) {
            socket.emit('message', newMessage);
            setNewMessage('');
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <p>Bem-vindo, {username}</p>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.user}:</strong> {msg.text}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Digite sua mensagem"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Enviar</button>
        </div>
    );
};

export default Chat;
