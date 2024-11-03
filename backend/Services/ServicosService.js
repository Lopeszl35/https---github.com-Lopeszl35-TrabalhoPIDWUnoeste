const AbstractServicosService = require("./abstratos/AbstractServicosService");

class ServicosService extends AbstractServicosService {
    constructor(servicoRepository, database) {
        super();
        this.servicoRepository = servicoRepository;
        this.database = database;
    }

    async obterServicos() {
        try {
            const servicos = await this.servicoRepository.obterServicos();
            if(!servicos) {
                throw new Error('Erro ao obter os Serviços!');
            }
            return servicos;
        } catch (error) {
            console.log('Erro ao obter os Serviços:', error);
            throw error;
        }
    }

}

module.exports = ServicosService;