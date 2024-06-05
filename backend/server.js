const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Importa o morgan
const bodyParser = require('body-parser'); // Importa o body-parser
const servicosRoutes = require('./routes/servicosRoutes');

// Configurações do servidor
const app = express();
const port = 3001;

// Middlewares
app.use(morgan('combined')); // Usa o morgan para logging
app.use(bodyParser.json()); // Usa o body-parser para parsear JSON
app.use(cors());

// Rotas
app.use(servicosRoutes);

// Inicia o servidor
app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
