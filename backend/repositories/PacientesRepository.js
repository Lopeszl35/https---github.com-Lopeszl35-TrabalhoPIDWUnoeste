const AbstractPacienteRepository = require('./abstratos/AbstractPacienteRepository');

class PacienteRepository extends AbstractPacienteRepository {
    constructor(database) {
        super();
        this.database = database;
    }

    async adicionarPaciente(paciente, connection) {
        const sql = `
            INSERT INTO Pacientes (Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo, Email)
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            paciente.Nome_Completo,
            paciente.Data_De_Nascimento,
            paciente.CPF,
            paciente.RG,
            paciente.CartaoSUS,
            paciente.Escola,
            paciente.Ano_Escolar,
            paciente.Periodo,
            paciente.Email,
        ];
        try {
            const [resultado] = await connection.query(sql, params);
            return resultado.insertId;
        } catch (error) {
            console.error("Erro ao adicionar paciente no repository:", error);
            throw error;
        }
    }

    async atualizarPaciente(paciente, connection) {
        const sql = `
            UPDATE Pacientes
            SET Nome_Completo = ?, Data_De_Nascimento = ?, CPF = ?, RG = ?, CartaoSUS = ?, Escola = ?, Ano_Escolar = ?, Periodo = ?, Email = ?
            WHERE Prontuario = ?
        `;
        const params = [
            paciente.Nome_Completo,
            paciente.Data_De_Nascimento,
            paciente.CPF,
            paciente.RG,
            paciente.CartaoSUS,
            paciente.Escola,
            paciente.Ano_Escolar,
            paciente.Periodo,
            paciente.Email,
            paciente.Prontuario
        ];
        try {
            const [resultado] = await connection.query(sql, params);
            return resultado.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao atualizar paciente no repository:", error);
            throw error;
        }
    }

    async deletarPaciente(prontuario) {
        const sql = `
            DELETE FROM Pacientes
            WHERE Prontuario = ?
        `
        try {
            const resultado = await this.database.executaComando(sql, [prontuario]);
            return resultado.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao deletar paciente no repository:", error);
            throw error;
        }
    } 

    async obterPacientes() {
        const sql = `
            SELECT 
                p.Prontuario,
                p.Nome_Completo,
                p.Data_De_Nascimento,
                p.CPF,
                p.RG,
                p.Email,
                r.Telefone_Mae,
                e.Logradouro,
                e.Numero,
                e.Cidade
            FROM Pacientes p
            LEFT JOIN Responsaveis r ON p.Prontuario = r.Prontuario
            LEFT JOIN Enderecos e ON p.Prontuario = e.Prontuario
        `;
        try {
            const result = await this.database.executaComando(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }
    

    async obterDadosCompletosDoPaciente(prontuario) {
        const sql = `
            SELECT 
                p.Prontuario,
                p.Nome_Completo,
                p.Email,
                p.Data_De_Nascimento,
                p.CPF,
                p.RG,
                p.CartaoSUS,
                p.Escola,
                p.Ano_Escolar,
                p.Periodo,
                r.Nome_Mae,
                r.Telefone_Mae,
                r.Nome_Pai,
                r.Telefone_Pai,
                e.Logradouro,
                e.Numero,
                e.Complemento,
                e.Bairro,
                e.Cidade,
                e.Estado,
                e.CEP
            FROM Pacientes p
            LEFT JOIN Responsaveis r ON p.Prontuario = r.Prontuario
            LEFT JOIN Enderecos e ON p.Prontuario = e.Prontuario
            WHERE p.Prontuario = ?`;
        try {
            const result = await this.database.executaComando(sql, [prontuario]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            throw error;
        }
    }

    async buscarPaciente(searchTerm, searchType) {
        const sql = `
            SELECT 
                p.Prontuario,
                p.Nome_Completo,
                p.Data_De_Nascimento,
                p.CPF,
                p.RG,
                p.Email,
                r.Nome_Mae,
                e.Numero,
                e.Cidade
            FROM Pacientes p
            LEFT JOIN Responsaveis r ON p.Prontuario = r.Prontuario
            LEFT JOIN Enderecos e ON p.Prontuario = e.Prontuario
            WHERE ?? LIKE ?
        `;
        // Se o tipo de busca for 'Prontuario', use o alias 'p' para especificar a tabela Pacientes
        if (searchType === 'Prontuario') {
            searchType = 'p.Prontuario';
        }
        const params = [searchType, `%${searchTerm}%`];
        try {
            const result = await this.database.executaComando(sql, params);
            console.log('result', result);
            
            return result;
        } catch (error) {
            throw error;
        }
    }

    async salvarEvolucao(evolucao) {
        console.log("Evolucao: ", evolucao);
        const sql = `
            INSERT INTO evolucoesPacientes (ID_Evolucao, Prontuario, ID_Servico, ID_Profissional, Data_Servico, Avaliacao, Observacoes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            evolucao.ID_Evolucao,
            evolucao.Prontuario,
            evolucao.ID_Servico,
            evolucao.ID_Profissional,
            evolucao.Data_Servico,
            evolucao.Avaliacao,
            evolucao.Observacoes
        ];

        try {
            const result = await this.database.executaComando(sql, params);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async obterEvolucoesDoPaciente(prontuario) {
        const sql = `
            SELECT 
            e.ID_Evolucao, 
            e.Prontuario, 
            e.ID_Servico, 
            e.ID_Profissional, 
            e.Data_Servico, 
            e.Avaliacao, 
            e.Observacoes, 
            s.Nome_Servico AS Servico, 
            p.Nome_Completo AS Profissional 
            FROM evolucoesPacientes e 
            LEFT JOIN Servicos s ON e.ID_Servico = s.ID_Servico 
            LEFT JOIN Profissionais p ON e.ID_Profissional = p.ID_Profissional 
            WHERE e.Prontuario = ?
        `;
        try {
            const result = await this.database.executaComando(sql, [prontuario]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PacienteRepository;