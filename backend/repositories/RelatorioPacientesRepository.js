const AbstractRelatorioPacienteRepository = require("./abstratos/AbstractRelatorioPacientesRepository");

class RelatorioPacienteRepository extends AbstractRelatorioPacienteRepository {
    constructor(database) {
        super();
        this.database = database;
    }

    // Obter pacientes com filtros
    async obterRelatorioPacientes({ nome, cidade, estado, sexo, dataInicio, dataFim }) {
        let query = `
            SELECT 
                p.Prontuario AS prontuario,
                p.Nome_Completo AS nome,
                p.Idade AS idade,
                p.Data_De_Nascimento AS data_nascimento,
                p.CPF AS cpf,
                e.Logradouro AS logradouro,
                e.Cidade AS cidade,
                e.Estado AS estado,
                p.Sexo AS sexo
            FROM Pacientes p
            LEFT JOIN Enderecos e ON p.Prontuario = e.Prontuario
            WHERE 1=1
        `;

        const params = [];
        if (nome) {
            query += ' AND p.Nome_Completo LIKE ?';
            params.push(`%${nome}%`);
        }
        if (cidade) {
            query += ' AND e.Cidade LIKE ?';
            params.push(`%${cidade}%`);
        }
        if (estado) {
            query += ' AND e.Estado = ?';
            params.push(estado);
        }
        if (sexo) {
            query += ' AND p.Sexo = ?';
            params.push(sexo);
        }
        if (dataInicio && dataFim) {
            query += ' AND p.Data_De_Nascimento BETWEEN ? AND ?';
            params.push(dataInicio, dataFim);
        }

        try {
            const resultados = await this.database.executaComando(query, params);
            return resultados;
        } catch (error) {
            console.error('Erro ao gerar relatório de pacientes:', error);
            throw error;
        }
    }

    // Obter distribuição de pacientes por estado
    async obterDistribuicaoPorEstado() {
        const query = `
            SELECT 
                e.Estado AS estado,
                COUNT(p.Prontuario) AS total
            FROM Pacientes p
            LEFT JOIN Enderecos e ON p.Prontuario = e.Prontuario
            GROUP BY e.Estado
            ORDER BY total DESC
        `;

        try {
            const resultados = await this.database.executaComando(query);
            return resultados;
        } catch (error) {
            console.error('Erro ao obter distribuição de pacientes por estado:', error);
            throw error;
        }
    }

    // Obter distribuição de pacientes por cidade
    async obterDistribuicaoPorCidade() {
        const query = `
            SELECT 
                e.Cidade AS cidade,
                COUNT(p.Prontuario) AS total
            FROM Pacientes p
            LEFT JOIN Enderecos e ON p.Prontuario = e.Prontuario
            GROUP BY e.Cidade
            ORDER BY total DESC
        `;

        try {
            const resultados = await this.database.executaComando(query);
            return resultados;
        } catch (error) {
            console.error('Erro ao obter distribuição de pacientes por cidade:', error);
            throw error;
        }
    }

    // Obter estatísticas de pacientes por faixa etária
    async obterEstatisticasPorFaixaEtaria(idadeMin, idadeMax) {
        if (idadeMin === undefined || idadeMax === undefined) {
            throw new Error("Idade mínima e máxima devem ser fornecidas.");
        }
    
        const query = `
            SELECT 
                TIMESTAMPDIFF(YEAR, p.Data_De_Nascimento, CURDATE()) AS idade,
                COUNT(p.Prontuario) AS total
            FROM Pacientes p
            WHERE TIMESTAMPDIFF(YEAR, p.Data_De_Nascimento, CURDATE()) BETWEEN ? AND ?
            GROUP BY idade
            ORDER BY total DESC
        `;
    
        const params = [idadeMin, idadeMax];
    
        try {
            const resultados = await this.database.executaComando(query, params);
            return resultados;
        } catch (error) {
            console.error("Erro ao obter estatísticas por faixa etária:", error);
            throw error;
        }
    }
    

    // Obter distribuição de pacientes por sexo
    async obterDistribuicaoPorSexo() {
        const query = `
            SELECT 
                p.Sexo AS sexo,
                COUNT(p.Prontuario) AS total
            FROM Pacientes p
            GROUP BY p.Sexo
            ORDER BY total DESC
        `;

        try {
            const resultados = await this.database.executaComando(query);
            return resultados;
        } catch (error) {
            console.error('Erro ao obter distribuição por sexo:', error);
            throw error;
        }
    }

    // Obter distribuição de pacientes por data de nascimento
    async obterDistribuicaoPorDataNascimento() {
        const query = `
            SELECT 
                p.Data_De_Nascimento AS data_nascimento,
                COUNT(p.Prontuario) AS total
            FROM Pacientes p
            GROUP BY p.Data_De_Nascimento
            ORDER BY p.Data_De_Nascimento ASC
        `;

        try {
            const resultados = await this.database.executaComando(query);
            return resultados;
        } catch (error) {
            console.error('Erro ao obter distribuição por data de nascimento:', error);
            throw error;
        }
    }
}

module.exports = RelatorioPacienteRepository;
