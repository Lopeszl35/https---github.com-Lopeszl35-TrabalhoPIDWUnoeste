const express = require('express');
const cors = require('cors');
const servicosRoutes = require('./routes/servicosRoutes');

//rotas
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
app.use(servicosRoutes);
app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));