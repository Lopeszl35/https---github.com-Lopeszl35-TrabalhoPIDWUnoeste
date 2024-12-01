const AbstractResponsaveisModel = require("../../abstratos/AbstactResponsaveisModel");
const ErroSqlHandler = require("../../../utils/ErroSqlHandler");
class ResponsaveisModel extends AbstractResponsaveisModel {
    constructor(responsaveisRepository) {
       super();
       this.responsaveisRepository = responsaveisRepository;
    }

    async adicionarResponsavel(responsavelData, connection) {
        try {
            const responsavelAdicionado = await this.ResponsaveisRepository.adicionarResponsavel(responsavelData, connection);
            if (!responsavelAdicionado) {
                throw new Error("Erro ao adicionar responsável na chamada ao repository");
            }
        } catch (error) {
            ErroSqlHandler.tratarErroDuplicado(error, "responsavel");
            throw error;
        }
    }


    async atualizarResponsavel(responsavelData, connection) {
        try {
            const responsavelAtualizado = await this.responsaveisRepository.atualizarResponsavel(responsavelData, connection);
            if(!responsavelAtualizado) {
                throw new Error("Erro ao atualizar responsável");
            }
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "responsavel");
            throw error;
        }
    }

}

module.exports = ResponsaveisModel;
