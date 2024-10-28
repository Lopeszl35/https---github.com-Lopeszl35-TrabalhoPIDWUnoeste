const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');

// Utilidades
const DependencyInjector = require('./utils/DependencyInjector');

// Carrega variáveis de ambiente
dotenv.config();

// Configuração do Servidor
const app = express();
const port = process.env.PORT || 3000;

// Configuração do Banco de Dados
const Database = require('./model/database');
const database = new Database();
DependencyInjector.register('Database', database);

// Registro de Repositórios
const AgendamentoRepository = require('./repositories/AgendamentoRepository');
/*
const PacienteRepository = require('./repositories/PacienteRepository');
const EnderecoRepository = require('./repositories/EnderecoRepository');
const ResponsavelRepository = require('./repositories/ResponsavelRepository');
const ProfissionalRepository = require('./repositories/ProfissionalRepository');
const ServicoRepository = require('./repositories/ServicoRepository');
const UsuarioRepository = require('./repositories/UsuarioRepository'); 
FALTA IMPLEMENTAR OS REPOSITÓRIOS
*/

DependencyInjector.register('AgendamentoRepository', new AgendamentoRepository(database));
/*
DependencyInjector.register('PacienteRepository', new PacienteRepository(database));
DependencyInjector.register('EnderecoRepository', new EnderecoRepository(database));
DependencyInjector.register('ResponsavelRepository', new ResponsavelRepository(database));
DependencyInjector.register('ProfissionalRepository', new ProfissionalRepository(database));
DependencyInjector.register('ServicoRepository', new ServicoRepository(database));
DependencyInjector.register('UsuarioRepository', new UsuarioRepository(database));
FALTA IMPLEMENTAR OS REPOSITÓRIOS
*/

// Registro de Serviços
const AgendamentoService = require('./Services/AgendamentoService');
/*
const PacienteService = require('./Services/PacienteService');
const EnderecoService = require('./Services/EnderecoService');
const ResponsavelService = require('./Services/ResponsavelService');
const ProfissionalService = require('./Services/ProfissionalService');
const ServicoService = require('./Services/ServicoService');
const UsuarioService = require('./Services/UsuarioService');
FALTA IMPLEMENTAR OS SERVIÇOS
*/

DependencyInjector.register('AgendamentoService', new AgendamentoService(DependencyInjector.get('AgendamentoRepository'), database));
/*
DependencyInjector.register('PacienteService', new PacienteService(DependencyInjector.get('PacienteRepository'), database));
DependencyInjector.register('EnderecoService', new EnderecoService(DependencyInjector.get('EnderecoRepository'), database));
DependencyInjector.register('ResponsavelService', new ResponsavelService(DependencyInjector.get('ResponsavelRepository'), database));
DependencyInjector.register('ProfissionalService', new ProfissionalService(DependencyInjector.get('ProfissionalRepository'), database));
DependencyInjector.register('ServicoService', new ServicoService(DependencyInjector.get('ServicoRepository'), database));
DependencyInjector.register('UsuarioService', new UsuarioService(DependencyInjector.get('UsuarioRepository'), database));
FALTA IMPLEMENTAR OS SERVIÇOS
*/

// Registro de Controladores
const AgendamentoController = require('./controller/AgendamentosController');
/*
const PacienteController = require('./controller/PacienteController');
const EnderecoController = require('./controller/EnderecoController');
const ResponsavelController = require('./controller/ResponsavelController');
const ProfissionalController = require('./controller/ProfissionalController');
const ServicoController = require('./controller/ServicoController');
const UsuarioController = require('./controller/UsuarioController');
FALTA IMPLEMENTAR OS CONTROLADORES
*/

DependencyInjector.register('AgendamentoController', new AgendamentoController(DependencyInjector.get('AgendamentoService')));
/*
DependencyInjector.register('PacienteController', new PacienteController(DependencyInjector.get('PacienteService')));
DependencyInjector.register('EnderecoController', new EnderecoController(DependencyInjector.get('EnderecoService')));
DependencyInjector.register('ResponsavelController', new ResponsavelController(DependencyInjector.get('ResponsavelService')));
DependencyInjector.register('ProfissionalController', new ProfissionalController(DependencyInjector.get('ProfissionalService')));
DependencyInjector.register('ServicoController', new ServicoController(DependencyInjector.get('ServicoService')));
DependencyInjector.register('UsuarioController', new UsuarioController(DependencyInjector.get('UsuarioService')));
FALTA IMPLEMENTAR OS CONTROLADORES
*/

// Configuração do CORS
app.use(cors({
    origin: ['http://localhost:3000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
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
const AgendamentoRoutes = require('./routes/AgendamentosRoutes');
/*
const PacientesRoutes = require('./routes/PacientesRoutes');
const EnderecosRoutes = require('./routes/EnderecosRoutes');
const ResponsaveisRoutes = require('./routes/ResponsaveisRoutes');
const ProfissionaisRoutes = require('./routes/ProfissionaisRoutes');
const ServicosRoutes = require('./routes/ServicosRoutes');
const UsuariosRoutes = require('./routes/UsuariosRoutes');
*/

app.use(AgendamentoRoutes);
/*
app.use(PacientesRoutes);
app.use(EnderecosRoutes);
app.use(ResponsaveisRoutes);
app.use(ProfissionaisRoutes);
app.use(ServicosRoutes);
app.use(UsuariosRoutes);
*/

// Inicialização do Servidor
app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
