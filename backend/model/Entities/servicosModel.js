const DataBase = require("../database");

const dataBase = new DataBase();
class ServicosModel {
    constructor(nomeServico, descricao, dataDeCadastro, status, profissionalResponsavel) {
        this.Nome_Servico = nomeServico;
        this.Descricao = descricao;
        this.Data_De_Cadastro = dataDeCadastro;
        this.Status = status;
        this.Profissional_Responsavel = profissionalResponsavel;
    }

    async obterTodos() {
        const listaServicos = await dataBase.executaComando("select * from servicos")
        return listaServicos;
    }

    async obterPorId(id) {
        const result = await dataBase.executaComando("select * from servicos where ID_Servico  = ?", [id]);
        return result[0];
    }

    async adicionar(dadosServico) {
        await dataBase.executaComandoNonQuery('insert into servicos set ?', dadosServico);
    }

    async atualizar(id, dadosServico) {
        await dataBase.executaComandoNonQuery('update servicos set ? where ID_Servico = ?', [dadosServico, id]);
    }

    async deletar(id) {
        await dataBase.executaComandoNonQuery('delete from servicos where ID_Servico = ?', [id]);
    }


}
module.exports = ServicosModel;
