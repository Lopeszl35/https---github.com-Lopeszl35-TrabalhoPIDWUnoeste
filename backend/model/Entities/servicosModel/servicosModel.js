class ServicosModel {
  constructor(nomeServico, descricao, dataDeCadastro, status) {
    this.Nome_Servico = nomeServico;
    this.Descricao = descricao;
    this.Data_De_Cadastro = dataDeCadastro;
    this.Status = status;
  }
}

module.exports = ServicosModel;
