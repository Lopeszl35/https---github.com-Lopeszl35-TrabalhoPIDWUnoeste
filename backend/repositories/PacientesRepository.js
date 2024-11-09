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
        const sql = `SELECT * FROM Pacientes`;
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
}

module.exports = PacienteRepository;