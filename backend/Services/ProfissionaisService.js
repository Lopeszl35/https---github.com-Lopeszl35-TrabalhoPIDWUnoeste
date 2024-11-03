const AbstractProfissionaisService = require("./abstratos/AbstractProfissionaisService");

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
            console.log("Erro ao obter os Profissionais:", error);
            throw error
        }
    }

    async profissionalDoServico(servico) {
        try {
            const profissionais = await this.profissionaisRepository.profissionalDoServico(servico);
            if(profissionais.length === 0) {
                throw new Error("Nenhum profissional encontrado para este serviço");
            }
            return profissionais
        } catch (error) {
            console.log("Erro ao obter os Profissionais:", error);
            throw error
        }
    }

}

module.exports = ProfissionaisService