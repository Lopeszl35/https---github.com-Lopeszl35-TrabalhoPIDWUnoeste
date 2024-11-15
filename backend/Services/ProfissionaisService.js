const AbstractProfissionaisService = require("./abstratos/AbstractProfissionaisService");
const ErroSqlHandler = require("../utils/ErroSqlHandler");

class ProfissionaisService extends AbstractProfissionaisService {
    constructor(profissionaisRepository, database) {
        super();
        this.profissionaisRepository = profissionaisRepository;
        this.database = database;
    }

    async obterProfissionais() {
        try {
            const profissionais = await this.profissionaisRepository.obterProfissionais();
            if(profissionais.length === 0) {
                throw new Error("Nenhum profissional encontrado");
            }
            return profissionais
        } catch (error) {
            console.error("Erro ao obter os Profissionais:", error);
            throw error
        }
    }

    async obterPorId(id) {
        try {
            const profissional = await this.profissionaisRepository.obterPorId(id);
            if(profissional.length === 0) {
                throw new Error("Profissional não encontrado");
            }
            return profissional
        } catch (error) {
            console.error("Erro ao obter o Profissional:", error);
            throw error
        }
    }

    async editarProfissional(id, profissional) {
        try {
            const profissionalEditado = await this.profissionaisRepository.editarProfissional(id, profissional);
            return profissionalEditado
        } catch (error) {
            console.error("Erro ao editar o Profissional:", error);
            ErroSqlHandler.tratarErroSql(error, "profissional");
        }
    }

   

}

module.exports = ProfissionaisService