const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const servicosRoutes = require('./routes/servicosRoutes');
const pacientesRoutes = require('./routes/pacientesRoutes');
const enderecosRoutes = require('./routes/enderecosRoutes');
const responsaveisRoutes = require('./routes/responsaveisRoutes');
const profissionaisRoutes = require('./routes/profissionaisRoutes/ProfissionaisRoutes');
const profissionalservicosRoutes = require('./routes/profissionalServicosRoutes/ProfissionalServicosRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente
dotenv.config();

// Configurações do servidor
const app = express();
const port = process.env.PORT;

// Configuração do CORS
app.use(cors({
    origin: ['http://localhost:3000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permitir envio de cookies e credenciais
}));

// Middlewares
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.CHAVE_SECRETA,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

// Rotas
app.use(servicosRoutes);
app.use(pacientesRoutes);
app.use(enderecosRoutes);
app.use(responsaveisRoutes);
app.use(profissionaisRoutes);
app.use(profissionalservicosRoutes);
app.use(authRoutes);

// Inicia o servidor
app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
