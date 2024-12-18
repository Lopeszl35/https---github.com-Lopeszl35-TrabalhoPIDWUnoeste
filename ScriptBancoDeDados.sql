-- Criação do banco de dados
CREATE DATABASE careconnectdb;
USE careconnectdb;

-- Criação da tabela de Pacientes
CREATE TABLE Pacientes (
    Prontuario INT AUTO_INCREMENT PRIMARY KEY,
    Nome_Completo VARCHAR(255) NOT NULL,
    Data_De_Nascimento DATE NOT NULL,
    Sexo ENUM('Masculino', 'Feminino', 'Outro'),
    CPF VARCHAR(11) NOT NULL UNIQUE,
    RG VARCHAR(20) UNIQUE,
    CartaoSUS VARCHAR(15) UNIQUE,
    Escola VARCHAR(255),
    Ano_Escolar VARCHAR(20),
    Periodo VARCHAR(20),
    Email VARCHAR(255),
    Idade INT,
    autorizacaoImagem TINYINT(1),
    Raca VARCHAR(255)
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
        ON DELETE CASCADE
        ON UPDATE CASCADE
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
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Criação da tabela de Profissionais
CREATE TABLE Profissionais (
    ID_Profissional INT AUTO_INCREMENT PRIMARY KEY,
    Nome_Completo VARCHAR(255) NOT NULL, 
    CPF VARCHAR(11) NOT NULL UNIQUE,
    RG VARCHAR(20) UNIQUE,
    Data_Nascimento DATE NOT NULL,
    registroProfissional INT UNIQUE,
    Telefone VARCHAR(15),
    Email VARCHAR(255) UNIQUE
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
    FOREIGN KEY (ID_Profissional) REFERENCES Profissionais(ID_Profissional)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Servico) REFERENCES Servicos(ID_Servico)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

-- Criação da tabela de evolucoesPacientes
CREATE TABLE evolucoesPacientes (
    ID_Evolucao INT AUTO_INCREMENT PRIMARY KEY,
    Prontuario INT NOT NULL,
    ID_Servico INT NOT NULL,
    ID_Profissional INT NOT NULL,
    Data_Servico DATETIME NOT NULL,
    Avaliacao TEXT NOT NULL,
    Observacoes TEXT,
    FOREIGN KEY (Prontuario) REFERENCES Pacientes(Prontuario)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Servico) REFERENCES Servicos(ID_Servico)
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Profissional) REFERENCES Profissionais(ID_Profissional)
        ON UPDATE CASCADE
);

-- Criação da tabela de Usuários, ao cadastrar um Profissional ele receberá automaticamente um acesso ao sistema
CREATE TABLE usuarios (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nome varchar(255),
    Email VARCHAR(255) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    Tipo_Permissao ENUM('admin', 'profissionalSaude', 'usuarioPadrao') NOT NULL
);

-- Criação da tabela de Agendamentos
CREATE TABLE Agendamentos (
    ID_Agendamento INT AUTO_INCREMENT PRIMARY KEY,
    Prontuario INT NOT NULL,
    ID_Profissional INT NOT NULL,
    ID_Servico INT,
    Data_Hora DATETIME NOT NULL,
    Status ENUM('Pendente', 'Confirmado', 'Cancelado', 'Concluído') DEFAULT 'Pendente',
    Observacoes TEXT,
    Arquivado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Prontuario) REFERENCES Pacientes(Prontuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Profissional) REFERENCES Profissionais(ID_Profissional)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Servico) REFERENCES Servicos(ID_Servico)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Log_Agendamentos (
    ID_Log INT AUTO_INCREMENT PRIMARY KEY,
    ID_Agendamento INT NOT NULL,
    Observacao_Anterior TEXT NOT NULL,
    Data_Alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Agendamento) REFERENCES Agendamentos(ID_Agendamento)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- Criação da tabela de Horários Disponíveis
CREATE TABLE HorariosDisponiveis (
    ID_Horario INT AUTO_INCREMENT PRIMARY KEY,
    ID_Profissional INT NOT NULL,
    Data DATE NOT NULL,
    HorarioInicio TIME NOT NULL,
    HorarioTermino TIME NOT NULL,
    Disponivel BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (ID_Profissional) REFERENCES Profissionais(ID_Profissional)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    UNIQUE (ID_Profissional, Data, HorarioInicio, HorarioTermino)
);

-- Trigger para exclusão em cascata de agendamentos e atualização de horários disponíveis
DELIMITER $$
CREATE TRIGGER after_delete_profissional_servico
AFTER DELETE ON ProfissionalServicos
FOR EACH ROW
BEGIN
    DELETE FROM Agendamentos
    WHERE ID_Profissional = OLD.ID_Profissional
      AND ID_Servico = OLD.ID_Servico;

    UPDATE HorariosDisponiveis
    SET Disponivel = 1
    WHERE ID_Profissional = OLD.ID_Profissional;
END$$
DELIMITER ;

-- Após um agendamento ser excluido o horario do profissional volta a ficar disponivel para agendamento
DELIMITER $$
CREATE TRIGGER liberar_horario_apos_exclusaoAgendamento
AFTER DELETE ON Agendamentos
FOR EACH ROW
BEGIN
	UPDATE HorariosDisponiveis
    SET Disponivel = 1
    WHERE ID_Profissional = OLD.ID_Profissional;
END$$
DELIMITER ;

DELIMITER $$

CREATE TRIGGER AtualizarIdadeAntesDeInserir
BEFORE INSERT ON Pacientes
FOR EACH ROW
BEGIN
    SET NEW.Idade = TIMESTAMPDIFF(YEAR, NEW.Data_De_Nascimento, CURDATE());
END$$

DELIMITER ;



DELIMITER $$

CREATE TRIGGER AtualizarIdadeAntesDeAtualizar
BEFORE UPDATE ON Pacientes
FOR EACH ROW
BEGIN
    SET NEW.Idade = TIMESTAMPDIFF(YEAR, NEW.Data_De_Nascimento, CURDATE());
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER trg_log_observacoes
BEFORE UPDATE ON Agendamentos
FOR EACH ROW
BEGIN
    -- Verificar se a observação mudou
    IF OLD.Observacoes != NEW.Observacoes THEN
        -- Inserir a observação anterior na tabela de logs
        INSERT INTO Log_Agendamentos (ID_Agendamento, Observacao_Anterior)
        VALUES (OLD.ID_Agendamento, OLD.Observacoes);
    END IF;
END$$

DELIMITER ;



DELIMITER $$

CREATE TRIGGER AtualizarHorarioDisponivelAoCancelar
AFTER UPDATE ON Agendamentos
FOR EACH ROW
BEGIN
    -- Verifica se a consulta foi arquivada e se é de uma data futura
    IF NEW.Arquivado = TRUE AND NEW.Status = 'Cancelado' THEN
        IF DATE(NEW.Data_Hora) > CURDATE() THEN
            UPDATE HorariosDisponiveis
            SET Disponivel = TRUE
            WHERE ID_Profissional = NEW.ID_Profissional
              AND Data = DATE(NEW.Data_Hora)
              AND HorarioInicio <= TIME(NEW.Data_Hora)
              AND HorarioTermino > TIME(NEW.Data_Hora);
        END IF;
    END IF;
END$$

DELIMITER ;



DELIMITER $$ 

DELIMITER $$ 

CREATE TRIGGER ArquivarConsulta
BEFORE UPDATE ON Agendamentos
FOR EACH ROW
BEGIN
    -- Verifica se o status foi alterado para 'Cancelado' ou 'Concluido'
    IF NEW.Status = 'Cancelado' OR NEW.Status = 'Concluido' THEN
        SET NEW.Arquivado = TRUE;
    END IF;
END$$

DELIMITER ;


DELIMITER $$ 

CREATE TRIGGER DesarquivarConsulta
BEFORE UPDATE ON Agendamentos
FOR EACH ROW
BEGIN
	IF NEW.Status = 'Pendente' OR NEW.Status = 'Confirmado' THEN
		SET NEW.Arquivado = FALSE;
	END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER AtualizarHorarioDisponivelAoDesarquivar
AFTER UPDATE ON Agendamentos
FOR EACH ROW
BEGIN
    -- Verifica se a consulta foi desarquivada e se é de uma data futura
    IF NEW.Arquivado = FALSE AND (NEW.Status = 'Pendente' OR NEW.Status = 'Confirmado') THEN
        IF DATE(NEW.Data_Hora) > CURDATE() THEN
            UPDATE HorariosDisponiveis
            SET Disponivel = FALSE
            WHERE ID_Profissional = NEW.ID_Profissional
              AND Data = DATE(NEW.Data_Hora)
              AND HorarioInicio <= TIME(NEW.Data_Hora)
              AND HorarioTermino > TIME(NEW.Data_Hora);
        END IF;
    END IF;
END$$

DELIMITER ;




