const AbstractEnderecosRepository = require("./abstratos/AbstractEnderecosRepository");

class EnderecosRepository extends AbstractEnderecosRepository {
    constructor(database) {
        super();
        this.database = database;
    }

    async adicionarEndereco(endereco, connection) {
        const sql = `
            INSERT INTO Enderecos (Prontuario, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, CEP)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            endereco.Prontuario,
            endereco.Logradouro,
            endereco.Numero,
            endereco.Complemento,
            endereco.Bairro,
            endereco.Cidade,
            endereco.Estado,
            endereco.CEP
          ];
        try {
            const [result] = await connection.query(sql, params);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao adicionar o endereço:", error);
            throw error; 
        }
    }

}

module.exports = EnderecosRepository;