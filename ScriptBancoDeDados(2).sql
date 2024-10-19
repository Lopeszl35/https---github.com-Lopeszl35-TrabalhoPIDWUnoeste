-- Criação do banco de dados
CREATE DATABASE careconnectdb;
USE careconnectdb;

-- Criação da tabela de Pacientes
CREATE TABLE Pacientes (
    Prontuario INT PRIMARY KEY,
    Nome_Completo VARCHAR(255) NOT NULL,
    Data_De_Nascimento DATE NOT NULL,
    CPF VARCHAR(11) NOT NULL UNIQUE,
    RG VARCHAR(20),
    CartaoSUS VARCHAR(15),
    Escola VARCHAR(255),
    Ano_Escolar VARCHAR(20),
    Periodo VARCHAR(20)
);

-- Criação da tabela de Endereços
CREATE TABLE Enderecos (
    ID_Endereco INT AUTO_INCREMENT PRIMARY KEY,
    Prontuario INT NOT NULL,
    Logradouro VARCHAR(255) NOT NULL,
    Numero VARCHAR(10) NOT NULL,
    Complemento VARCHAR(255),
    Bairro VARCHAR(255) NOT NULL,
    Cidade VARCHAR(255) NOT NULL,
    Estado VARCHAR(2) NOT NULL,
    CEP VARCHAR(8) NOT NULL,
    FOREIGN KEY (Prontuario) REFERENCES Pacientes(Prontuario)
);

-- Criação da tabela de Responsáveis
CREATE TABLE Responsaveis (
    ID_Responsavel INT AUTO_INCREMENT PRIMARY KEY,
    Prontuario INT NOT NULL,
    Nome_Mae VARCHAR(255),
    Telefone_Mae VARCHAR(15),
    Nome_Pai VARCHAR(255),
    Telefone_Pai VARCHAR(15),
    FOREIGN KEY (Prontuario) REFERENCES Pacientes(Prontuario)
);

-- Criação da tabela de Profissionais
CREATE TABLE Profissionais (
    ID_Profissional INT AUTO_INCREMENT PRIMARY KEY,
    Nome_Completo VARCHAR(255) NOT NULL UNIQUE, 
    CPF VARCHAR(11) NOT NULL UNIQUE,
    RG VARCHAR(20) UNIQUE,
    Data_Nascimento DATE NOT NULL,
	registroProfissional INT UNIQUE,
    Telefone VARCHAR(15),
    Email VARCHAR(255) UNIQUE,
    Especialidade VARCHAR(255)
);
-- Criação da tabela de Serviços
CREATE TABLE Servicos (
    ID_Servico INT AUTO_INCREMENT PRIMARY KEY,
    Nome_Servico VARCHAR(255) NOT NULL UNIQUE,
    Descricao TEXT NOT NULL,
    Data_De_Cadastro DATE NOT NULL,
    Status ENUM('Ativo', 'Inativo') NOT NULL
);

-- Criação da tabela de Relacionamento Profissionais-Serviços
CREATE TABLE ProfissionalServicos (
    ID_Profissional INT NOT NULL,
    ID_Servico INT NOT NULL,
    PRIMARY KEY (ID_Profissional, ID_Servico),
    FOREIGN KEY (ID_Profissional) REFERENCES Profissionais(ID_Profissional),
    FOREIGN KEY (ID_Servico) REFERENCES Servicos(ID_Servico)
);

-- Criação da tabela de Relacionamento Pacientes-Serviços
-- Atualização da tabela PacienteServicos para incluir ON DELETE e ON UPDATE CASCADE
CREATE TABLE PacienteServicos (
    Prontuario INT NOT NULL,
    ID_Servico INT NOT NULL,
    ID_Profissional INT NOT NULL,
    Data_Servico DATETIME NOT NULL,
    PRIMARY KEY (Prontuario, ID_Servico),
    FOREIGN KEY (Prontuario) REFERENCES Pacientes(Prontuario)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Servico) REFERENCES Servicos(ID_Servico)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Profissional) REFERENCES Profissionais(ID_Profissional)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);


-- Criação da tabela de Usuários, ao cadastrar um Profissional ele receberá automaticamente um acesso ao sistema
CREATE TABLE usuarios (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    ID_Profissional INT NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    Tipo_Permissao ENUM('admin', 'profissionalSaude', 'usuario') NOT NULL,
    FOREIGN KEY (ID_Profissional) REFERENCES Profissionais(ID_Profissional)
);
