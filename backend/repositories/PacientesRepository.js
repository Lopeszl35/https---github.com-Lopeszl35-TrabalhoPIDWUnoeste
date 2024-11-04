const AbstractPacienteRepository = require('./abstratos/AbstractPacienteRepository');

class PacienteRepository extends AbstractPacienteRepository {
    constructor(database) {
        super();
        this.database = database;
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