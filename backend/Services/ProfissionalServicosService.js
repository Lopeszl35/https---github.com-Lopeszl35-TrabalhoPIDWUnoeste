const AbstractProfissionalServicosService = require("./abstratos/AbstractProfissionalServicosService");

class ProfissionalServicosService extends AbstractProfissionalServicosService {
    constructor(profissionalRepository, servicoRepository, profissionalServicosRepository) {
        this.profissionalRepository = profissionalRepository;
        this.servicoRepository = servicoRepository;
        this.profissionalServicosRepository = profissionalServicosRepository;
      }

    async relacionarProfissionalAServico(idProfissional, idServico) {
        try {
            const profissional = await this.profissionaisRepository.obterPorId(idProfissional);
            if (!profissional) {
                throw new Error("Profissional nao encontrado");
            }
            const servico = await this.servicoRepository.obterPorId(idServico);
            if (!servico) {
                throw new Error("Servico nao encontrado");
            }                                       //Implementar esse método de verificação
            const profissionalServico = await this.profissionalServicosRepository.obterProfissionalServico(idProfissional, idServico);
            if (profissionalServico) {
                throw new Error("Profissional ja possui esse servico");
            }
            const relacionado = await this.profissionalServicosRepository.inserir(idProfissional, idServico);
            if (!relacionado) {
                throw new Error("Erro ao relacionar profissional com o servico");
            }
            return { message: "Profissional associado ao serviço com sucesso!" };
        } catch (error) {
            console.error("Erro ao relacionar profissional com serviço:", error);
            throw error;
        }
    }

}

module.exports = ProfissionalServicosService