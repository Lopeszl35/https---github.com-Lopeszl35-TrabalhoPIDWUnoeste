--Descrição do grupo--
O grupo com os integrantes a baixo foi responsavel pelo projeto do sistema CareConnect feito para a AOPDown, que recebe pessoas com sindrome de down, o programa fornece opções de CRUD para pacientes, profissionais, serviços e horarios de profissionais, junto com funcionalidades funcionais de agendamento de consultas, registro de presença para consultas e evolução de pacientes

--Nome dos integrantes--
Nome: Rafael Amaro Lopes RA: 10482223463
Nome: CAIO BASSO RIGAZZO RA: 10482314110
PEDRO LEVI DIAS ROSA PAULA RA: 10482429029

--Descrição do Projeto--
    O CareConnect é uma solução tecnológica que centraliza e organiza as operações do centro de convivência. Ele permite que profissionais, administradores e pacientes interajam de maneira eficiente em um ambiente digital seguro. O sistema é projetado para atender às necessidades específicas da instituição, garantindo controle sobre os atendimentos e promovendo uma melhor experiência para todos os usuários.

    Funcionalidades Implementadas
    Gestão de Pacientes:

    Cadastro, edição e exclusão de pacientes.
    Acompanhamento de histórico clínico com anotações feitas por profissionais durante consultas.
    Avaliação de evolução do paciente ao longo do tempo.
    Gestão de Profissionais de Saúde:

    Cadastro e gerenciamento de profissionais, incluindo suas especialidades e registros profissionais.
    Controle de horários de atendimento.
    Agendamento de Consultas:

    Registro de agendamentos e consultas realizadas.
    Controle da presença de pacientes para consultas.
    Permissão para profissionais e usuários padrão visualizarem e gerenciarem seus agendamentos.
    Gestão de Serviços:

    Visualização e gerenciamento de áreas de serviços oferecidos pela instituição.
    Cadastro e vínculo de profissionais aos serviços oferecidos.
    Relatórios:

    Geração de relatórios mensais sobre frequência, consultas realizadas e áreas de atendimento.
    Relatórios específicos sobre pacientes e agendamentos, acessíveis para usuários com permissões adequadas.
    Controle de Permissões e Autenticação:

    Sistema baseado em tipos de usuário: Admin, Profissional de Saúde, e Usuário Padrão.
    Controle de acesso a rotas e funcionalidades com base nas permissões atribuídas.
    Login seguro com autenticação baseada em tokens.
    Perfil de Usuários
    Administrador (Admin):

    Acesso irrestrito a todas as funcionalidades do sistema.
    Cadastro e gerenciamento de usuários, profissionais, serviços e relatórios.
    Profissional de Saúde:

    Acesso às áreas de pacientes, evolução de pacientes e visualização de serviços.
    Possibilidade de registrar anotações nos históricos de pacientes.
    Usuário Padrão:

    Acesso às funcionalidades de registrar presença, agendar consultas, visualizar e editar pacientes, relatórios e visualizar serviços e profissionais.

--Tecnologias Utilizadas--
    Frontend:
    React.js
    React Router Dom (Gerenciamento de Rotas)
    Bootstrap e CSS Modules (Estilização)

    Backend:
    Node.js com Express
    MySQL (Gerenciamento de Banco de Dados)
    JWT (JSON Web Token) para autenticação
    Validação de dados com Express Validator

    Outros:
    React Context API para gerenciamento de estado global.
    Fetch API para integração com o backend.'

--Como Rodar o Projeto--
Pré-requisitos
Node.js instalado
MySQL configurado
Clonar o repositório para o seu ambiente local

--Configuração--
Configure as variáveis de ambiente no backend:

Banco de dados MySQL
JWT_SECRET
Inicialize o banco de dados executando os scripts SQL fornecidos.

Rodar o Projeto
BackeEnd:
npm run dev com noodmon ou npm start

FrontEnd:
npm start

--Estrutura do Projeto--
A arquitetura do projeto segue o padrão MVC (Model-View-Controller) com separação entre o frontend e backend.

Backend:
Localizado na pasta backend, desenvolvido com Node.js e Express, utilizando as seguintes camadas:
Model: Define a estrutura dos dados e integração com o banco de dados.
Control: Controladores responsáveis pelas regras de negócio.
Routes: Define as rotas e endpoints da API.
Middleware: Implementa autenticação com JWT e validações.
Utils: Utilitários como controle de transações.
Repositories: Gerenciamento direto de dados.
Principais Arquivos:
server.js: Inicialização do servidor e configuração principal.
routes: Rotas protegidas com controle de permissões.
middleware: Validação e segurança (hash de senha e JWT).

Frontend:
Localizado na pasta src, desenvolvido com React.js e organizado nos seguintes diretórios:
Componentes: Contém componentes reutilizáveis como NavBar, formulários e botões.
Paginas: Contém páginas principais do sistema:
Home, Login, Relatórios, Pacientes, Profissionais, Serviços, Agendamentos, etc.
Context: Implementa Context API para gerenciamento de autenticação e estado global.
Services: Serviços para comunicação com o backend, como APIs de login, usuários e profissionais.
Routes: Configuração das rotas com permissões diferenciadas utilizando o RoleBasedRoute.