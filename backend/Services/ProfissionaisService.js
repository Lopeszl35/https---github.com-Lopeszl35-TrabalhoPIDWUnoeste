const AbstractProfissionaisService = require("./abstratos/AbstractProfissionaisService");

class ProfissionaisService extends AbstractProfissionaisService {
    constructor(profissionaisRepository, usuariosService, database) {
        super();
        this.profissionaisRepository = profissionaisRepository;
        this.usuariosService = usuariosService;
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

    /*
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
    }*/

}

module.exports = ProfissionaisService