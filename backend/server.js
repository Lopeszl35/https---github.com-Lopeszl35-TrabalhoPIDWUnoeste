const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const servicosRoutes = require('./routes/servicosRoutes');
const pacientesRoutes = require('./routes/pacientesRoutes');

// Configurações do servidor
const app = express();
const port = 3001;

// Middlewares
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use(servicosRoutes);
app.use(pacientesRoutes);

// Inicia o servidor
app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
