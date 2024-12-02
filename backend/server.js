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
const port = process.env.PORT;

// Configuração do Banco de Dados
const Database = require("./Model/database");
const database = Database.getInstance();
DependencyInjector.register("Database", database);

// Configuração do transactionUtil
const TransactionUtil = require("./utils/TransactionUtil");
DependencyInjector.register("TransactionUtil", new TransactionUtil(database));

// Registro de Repositórios
const AgendamentoRepository = require("./repositories/AgendamentoRepository");
const UsuariosRepository = require("./repositories/UsuariosRepository");
const PacientesRepository = require('./repositories/PacientesRepository');
const ResponsaveisRepository = require('./repositories/ResponsaveisRepository');
const EnderecosRespository = require('./repositories/EnderecosRepository');
const ServicosRepository = require('./repositories/ServicosRepository');
const ProfissionaisRepository = require('./repositories/ProfissionaisRepository');
const ProfissionalUsuarioRepository = require('./repositories/ProfissionalUsuarioRepository');
const ProfissionalServicosRepository = require('./repositories/ProfissionalServicosRepository');
const pacientesReportRepository = require('./repositories/PacientesReportRepository');
const RelatorioAgendamentoRepository = require('./repositories/RelatorioAgendamentoRepository');


DependencyInjector.register("AgendamentoRepository",new AgendamentoRepository(database));
DependencyInjector.register("UsuariosRepository",new UsuariosRepository(database));
DependencyInjector.register('PacientesRepository', new PacientesRepository(database));
DependencyInjector.register('ResponsaveisRepository', new ResponsaveisRepository(database));
DependencyInjector.register('EnderecosRepository', new EnderecosRespository(database));
DependencyInjector.register('ServicosRepository', new ServicosRepository(database));
DependencyInjector.register('ProfissionaisRepository', new ProfissionaisRepository(database));
DependencyInjector.register('ProfissionalUsuarioRepository', new ProfissionalUsuarioRepository(database));
DependencyInjector.register('ProfissionalServicosRepository', new ProfissionalServicosRepository(database));
DependencyInjector.register('pacientesReportRepository', new pacientesReportRepository(database));
DependencyInjector.register('RelatorioAgendamentoRepository', new RelatorioAgendamentoRepository(database));


// Registro de Models
const AgendamentoModel = require("./Model/Entities/agendamentoModel/AgendamentoModel");
const UsuariosModel = require("./Model/Entities/usuariosModel/UsuariosModel");
const PacientesModel = require('./Model/Entities/pacientesModel/PacientesModel');
const ResponsaveisModel = require('./Model/Entities/pacientesModel/responsaveisModel');
const EnderecosModel = require('./Model/Entities/pacientesModel/enderecosModel');
const ServicosModel = require('./Model/Entities/servicosModel/ServicosModel')
const ProfissionaisModel = require('./Model/Entities/profissionaisModel/ProfissionaisModel');
const ProfissionalUsuarioModel = require('./Model/Entities/profissionaisModel/ProfissionalUsuarioModel');
const ProfissionalServicosModel = require('./Model/Entities/profissionaisModel/ProfissionalServicosModel');
const pacientesReportService = require('./Services/PacientesReportService');
const RelatorioAgendamentoModel = require('./Model/Entities/relatorios/RelatorioAgendamentoModel');


DependencyInjector.register("AgendamentoModel",new AgendamentoModel(
    DependencyInjector.get("AgendamentoRepository")
  ));

DependencyInjector.register("UsuariosModel", new UsuariosModel(
    DependencyInjector.get("UsuariosRepository")
  ));

DependencyInjector.register('PacientesModel', new PacientesModel(
  DependencyInjector.get('PacientesRepository')
));

DependencyInjector.register('ResponsaveisModel', new ResponsaveisModel(
  DependencyInjector.get('ResponsaveisRepository')
));

DependencyInjector.register('EnderecosModel', new EnderecosModel(
  DependencyInjector.get('EnderecosRepository')
));

DependencyInjector.register('ServicosModel', new ServicosModel(
  DependencyInjector.get('ServicosRepository')
));

DependencyInjector.register('ProfissionaisModel', new ProfissionaisModel(
  DependencyInjector.get('ProfissionaisRepository')
));

DependencyInjector.register('ProfissionalUsuarioModel', new ProfissionalUsuarioModel(
  DependencyInjector.get('ProfissionalUsuarioRepository')
));

DependencyInjector.register('ProfissionalServicosModel', new ProfissionalServicosModel(
    DependencyInjector.get('ProfissionaisRepository'),
    DependencyInjector.get('ServicosRepository'),
    DependencyInjector.get('ProfissionalServicosRepository')
  )
);

DependencyInjector.register('PacientesReportService', new pacientesReportService(
  DependencyInjector.get('pacientesReportRepository'),
  database
));

DependencyInjector.register('RelatorioAgendamentoModel', new RelatorioAgendamentoModel(
  DependencyInjector.get('RelatorioAgendamentoRepository')
));


// Registro de Controladores
const AgendamentoControl = require("./control/AgendamentosControl");
const UsuariosControl = require("./control/UsuariosControl");
const PacientesControl = require('./control/pacientesControl');
const ServicoControl = require('./control/servicoControl');
const ProfissionaisControl = require('./control/ProfissionaisControl');
const ProfissionalServicosControl = require('./control/ProfissionalServicosControl');
const PacientesReportController = require('./controller/PacientesReportController');
const RelatorioAgendamentoControl = require('./control/RelatorioAgendamentoControl');



DependencyInjector.register("AgendamentoControl",new AgendamentoControl(
  DependencyInjector.get("AgendamentoModel"),
  DependencyInjector.get("TransactionUtil"))
);
DependencyInjector.register("UsuariosControl",new UsuariosControl(
    DependencyInjector.get("UsuariosModel"))
);
DependencyInjector.register('PacientesControl', new PacientesControl(
  DependencyInjector.get('PacientesModel'),
  DependencyInjector.get('ResponsaveisModel'),
  DependencyInjector.get('EnderecosModel'),
  DependencyInjector.get('TransactionUtil'))
);
DependencyInjector.register('ServicoControl', new ServicoControl(
  DependencyInjector.get('ServicosModel'),
  DependencyInjector.get('TransactionUtil'))
);
DependencyInjector.register('ProfissionaisControl', new ProfissionaisControl(
  DependencyInjector.get('ProfissionaisModel'),
  DependencyInjector.get('ProfissionalUsuarioModel'),
  DependencyInjector.get('TransactionUtil'))
);
DependencyInjector.register('ProfissionalServicosControl', new ProfissionalServicosControl(
  DependencyInjector.get('ProfissionalServicosModel'),
  DependencyInjector.get('TransactionUtil'))
);
DependencyInjector.register('PacientesReportController', new PacientesReportController(
  DependencyInjector.get('PacientesReportService')
));
DependencyInjector.register('RelatorioAgendamentoControl', new RelatorioAgendamentoControl(
  DependencyInjector.get('RelatorioAgendamentoModel'),
  DependencyInjector.get('TransactionUtil')
));


// Configuração do CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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
const ProfissionaisRoutes = require('./routes/ProfissionaisRoutes');
const ProfissionalServicosRoutes = require('./routes/ProfissionaisServicosRoutes');
const PacientesReportRoutes = require('./routes/PacientesReportRoutes');
const RelatorioAgendamentosRoutes = require('./routes/RelatorioAgendamentosRoutes');


app.use(loginRoute);
app.use(verifyToken, UsuariosRoutes);
app.use(verifyToken, AgendamentoRoutes);
app.use(verifyToken, PacientesRoutes);
app.use(verifyToken, ServicosRoutes);
app.use(verifyToken, ProfissionaisRoutes);
app.use(verifyToken, ProfissionalServicosRoutes);
app.use(verifyToken, PacientesReportRoutes);
app.use(verifyToken, RelatorioAgendamentosRoutes);


// Inicialização do Servidor
app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
