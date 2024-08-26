const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const servicosRoutes = require('./routes/servicosRoutes');
const pacientesRoutes = require('./routes/pacientesRoutes');
const enderecosRoutes = require('./routes/enderecosRoutes');
const responsaveisRoutes = require('./routes/responsaveisRoutes');
const profissionaisRoutes = require('./routes/profissionaisRoutes/ProfissionaisRoutes');
const profissionalservicosRoutes = require('./routes/profissionalServicosRoutes/ProfissionalServicosRoutes');

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
app.use(enderecosRoutes);
app.use(responsaveisRoutes);
app.use(profissionaisRoutes)
app.use(profissionalservicosRoutes)


app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
