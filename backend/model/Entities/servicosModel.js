const DataBase = require("../database");

const dataBase = new DataBase();
class ServicosModel {
    constructor(nomeServico, descricao, dataCadastro, status, profissionalResponsavel) {
        this.nomeServico = nomeServico;
        this.descricao = descricao;
        this.dataCadastro = dataCadastro;
        this.status = status;
        this.profissionalResponsavel = profissionalResponsavel;
    }

    async obterTodos() {
        const listaServicos = await dataBase.executaComando("select * from servicos")
        console.log(listaServicos);
        return listaServicos;
    }


}
module.exports = ServicosModel;
