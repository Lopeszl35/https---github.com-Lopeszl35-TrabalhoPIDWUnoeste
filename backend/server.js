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
const database = Database.getInstance();
DependencyInjector.register("Database", database);

// Registro de Repositórios
const AgendamentoRepository = require("./repositories/AgendamentoRepository");
const UsuariosRepository = require("./repositories/UsuariosRepository");
const PacientesRepository = require('./repositories/PacientesRepository');
const ResponsaveisRepository = require('./repositories/ResponsaveisRepository');
const EnderecosRespository = require('./repositories/EnderecosRepository');
const ServicosRepository = require('./repositories/ServicosRepository');
const ProfissionaisRepository = require('./repositories/ProfissionaisRepository');
const ProfissionalServicosRepository = require('./repositories/ProfissionalServicosRepository');


DependencyInjector.register("AgendamentoRepository",new AgendamentoRepository(database));
DependencyInjector.register("UsuariosRepository",new UsuariosRepository(database));
DependencyInjector.register('PacientesRepository', new PacientesRepository(database));
DependencyInjector.register('ResponsaveisRepository', new ResponsaveisRepository(database));
DependencyInjector.register('EnderecosRepository', new EnderecosRespository(database));
DependencyInjector.register('ServicosRepository', new ServicosRepository(database));
DependencyInjector.register('ProfissionaisRepository', new ProfissionaisRepository(database));
DependencyInjector.register('ProfissionalServicosRepository', new ProfissionalServicosRepository(database));


// Registro de Serviços
const AgendamentoService = require("./Services/AgendamentoService");
const UsuariosService = require("./Services/UsuariosService");
const PacientesService = require('./Services/PacientesService');
const ServicosService = require('./Services/ServicosService');
const ProfissionaisService = require('./Services/ProfissionaisService');
const ProfissionalServicosService = require('./Services/ProfissionalServicosService');


DependencyInjector.register("AgendamentoService",new AgendamentoService(
    DependencyInjector.get("AgendamentoRepository"),
    database
  ));

DependencyInjector.register("UsuariosService", new UsuariosService(
    DependencyInjector.get("UsuariosRepository"), 
    database
  ));

DependencyInjector.register('PacientesService', new PacientesService(
  DependencyInjector.get('PacientesRepository'), 
  DependencyInjector.get('EnderecosRepository'),
  DependencyInjector.get('ResponsaveisRepository'),
  database
));

DependencyInjector.register('ServicosService', new ServicosService(
  DependencyInjector.get('ServicosRepository'), 
  database
));

DependencyInjector.register('ProfissionaisService', new ProfissionaisService(
  DependencyInjector.get('ProfissionaisRepository'), 
  database
));

DependencyInjector.register('ProfissionalServicosService', new ProfissionalServicosService(
    DependencyInjector.get('ProfissionaisRepository'),
    DependencyInjector.get('ServicosRepository'),
    DependencyInjector.get('ProfissionalServicosRepository'),
    database
  )
);


// Registro de Controladores
const AgendamentoController = require("./controller/AgendamentosController");
const UsuariosController = require("./controller/usuariosController/UsuariosController");
const PacientesController = require('./controller/pacientesController');
const ServicoController = require('./controller/servicoController');
const ProfissionaisController = require('./controller/profissionaisController/ProfissionaisController');
const ProfissionalServicosController = require('./controller/ProfissionalServicosController');


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
DependencyInjector.register('ProfissionaisController', new ProfissionaisController(DependencyInjector.get('ProfissionaisService')));
DependencyInjector.register('ProfissionalServicosController', new ProfissionalServicosController(DependencyInjector.get('ProfissionalServicosService')));


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
const ProfissionaisRoutes = require('./routes/profissionaisRoutes/ProfissionaisRoutes');
const ProfissionalServicosRoutes = require('./routes/ProfissionaisServicosRoutes');


app.use(loginRoute);
app.use(verifyToken, AgendamentoRoutes);
app.use(verifyToken, UsuariosRoutes);
app.use(verifyToken, PacientesRoutes);
app.use(verifyToken, ServicosRoutes);
app.use(verifyToken, ProfissionaisRoutes);
app.use(verifyToken, ProfissionalServicosRoutes);


// Inicialização do Servidor
app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
