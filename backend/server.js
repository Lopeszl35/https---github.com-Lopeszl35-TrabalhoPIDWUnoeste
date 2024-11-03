const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");

// Utilidades
const DependencyInjector = require("./utils/DependencyInjector");

// Middleware
const verifyToken = require("./middleware/verifyToken");

// Carrega variáveis de ambiente
dotenv.config();

// Configuração do Servidor
const app = express();
const port = process.env.PORT || 3005;

// Configuração do Banco de Dados
const Database = require("./model/database");
const database = new Database();
DependencyInjector.register("Database", database);

// Registro de Repositórios
const AgendamentoRepository = require("./repositories/AgendamentoRepository");
const UsuariosRepository = require("./repositories/UsuariosRepository");
const PacientesRepository = require('./repositories/PacientesRepository');
const ServicosRepository = require('./repositories/ServicosRepository');
/*
const EnderecoRepository = require('./repositories/EnderecoRepository');
const ResponsavelRepository = require('./repositories/ResponsavelRepository');
const ProfissionalRepository = require('./repositories/ProfissionalRepository');
FALTA IMPLEMENTAR OS REPOSITÓRIOS
*/

DependencyInjector.register("AgendamentoRepository",new AgendamentoRepository(database));
DependencyInjector.register("UsuariosRepository",new UsuariosRepository(database));
DependencyInjector.register('PacientesRepository', new PacientesRepository(database));
DependencyInjector.register('ServicosRepository', new ServicosRepository(database));
/*
DependencyInjector.register('EnderecoRepository', new EnderecoRepository(database));
DependencyInjector.register('ResponsavelRepository', new ResponsavelRepository(database));
DependencyInjector.register('ProfissionalRepository', new ProfissionalRepository(database));
FALTA IMPLEMENTAR OS REPOSITÓRIOS
*/

// Registro de Serviços
const AgendamentoService = require("./Services/AgendamentoService");
const UsuariosService = require("./Services/UsuariosService");
const PacientesService = require('./Services/PacientesService');
const ServicosService = require('./Services/ServicosService');
/*
const EnderecoService = require('./Services/EnderecoService');
const ResponsavelService = require('./Services/ResponsavelService');
const ProfissionalService = require('./Services/ProfissionalService');
FALTA IMPLEMENTAR OS SERVIÇOS
*/

DependencyInjector.register(
  "AgendamentoService",
  new AgendamentoService(
    DependencyInjector.get("AgendamentoRepository"),
    database
  )
);
DependencyInjector.register(
  "UsuariosService",
  new UsuariosService(DependencyInjector.get("UsuariosRepository"), database)
);
DependencyInjector.register('PacientesService', new PacientesService(DependencyInjector.get('PacientesRepository'), database));
DependencyInjector.register('ServicosService', new ServicosService(DependencyInjector.get('ServicosRepository'), database));
/*

DependencyInjector.register('EnderecoService', new EnderecoService(DependencyInjector.get('EnderecoRepository'), database));
DependencyInjector.register('ResponsavelService', new ResponsavelService(DependencyInjector.get('ResponsavelRepository'), database));
DependencyInjector.register('ProfissionalService', new ProfissionalService(DependencyInjector.get('ProfissionalRepository'), database));
FALTA IMPLEMENTAR OS SERVIÇOS
*/

// Registro de Controladores
const AgendamentoController = require("./controller/AgendamentosController");
const UsuariosController = require("./controller/usuariosController/UsuariosController");
const PacientesController = require('./controller/pacientesController');
const ServicoController = require('./controller/servicoController');
/*
const EnderecoController = require('./controller/EnderecoController');
const ResponsavelController = require('./controller/ResponsavelController');
const ProfissionalController = require('./controller/ProfissionalController');
FALTA IMPLEMENTAR OS CONTROLADORES
*/

DependencyInjector.register(
  "AgendamentoController",
  new AgendamentoController(DependencyInjector.get("AgendamentoService"))
);
DependencyInjector.register(
  "UsuariosController",
  new UsuariosController(DependencyInjector.get("UsuariosService"))
);
DependencyInjector.register('PacientesController', new PacientesController(DependencyInjector.get('PacientesService')));
DependencyInjector.register('ServicoController', new ServicoController(DependencyInjector.get('ServicosService')));
/*

DependencyInjector.register('EnderecoController', new EnderecoController(DependencyInjector.get('EnderecoService')));
DependencyInjector.register('ResponsavelController', new ResponsavelController(DependencyInjector.get('ResponsavelService')));
DependencyInjector.register('ProfissionalController', new ProfissionalController(DependencyInjector.get('ProfissionalService')));
FALTA IMPLEMENTAR OS CONTROLADORES
*/

// Configuração do CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middlewares
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.CHAVE_SECRETA,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

// Rotas
const AgendamentoRoutes = require("./routes/AgendamentosRoutes");
const UsuariosRoutes = require("./routes/usuariosRoutes");
const loginRoute = require("./routes/loginRoute");
const PacientesRoutes = require('./routes/pacientesRoutes');
const ServicosRoutes = require('./routes/servicosRoutes');
/*
const EnderecosRoutes = require('./routes/EnderecosRoutes');
const ResponsaveisRoutes = require('./routes/ResponsaveisRoutes');
const ProfissionaisRoutes = require('./routes/ProfissionaisRoutes');
*/

app.use(loginRoute);
app.use(verifyToken, AgendamentoRoutes);
app.use(verifyToken, UsuariosRoutes);
app.use(verifyToken, PacientesRoutes);
app.use(verifyToken, ServicosRoutes);
/*
app.use(verifyToken, EnderecosRoutes);
app.use(verifyToken, ResponsaveisRoutes);
app.use(verifyToken, ProfissionaisRoutes);
*/

// Inicialização do Servidor
app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
