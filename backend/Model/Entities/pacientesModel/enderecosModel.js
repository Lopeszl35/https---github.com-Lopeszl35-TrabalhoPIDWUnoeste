const AbstractEnderecosModel = require("../../abstratos/AbstractEnderecosModel");
const ErroSqlHandler = require("../../../utils/ErroSqlHandler");

class EnderecosModel extends AbstractEnderecosModel {
    constructor(enderecosRepository) {
        super();
        this.enderecosRepository = enderecosRepository;
    }

    async adicionarEndereco(enderecoData, connection) {
        try {
            const enderecoAdicionado = await this.enderecosRepository.adicionarEndereco(enderecoData, connection);
            if (!enderecoAdicionado) {
                throw new Error("Erro ao adicionar endereço na chamada ao repository");
            }
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "endereco");
            throw error;
        }
    }

    async atualizarEndereco(enderecoData, connection) {
        try {
            const enderecoAtualizado = await this.enderecosRepository.atualizarEndereco(enderecoData, connection);
            if(!enderecoAtualizado) {
                throw new Error("Erro ao atualizar endereço");
            }
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "endereco");
            throw error;
        }
    }
}

module.exports = EnderecosModel;