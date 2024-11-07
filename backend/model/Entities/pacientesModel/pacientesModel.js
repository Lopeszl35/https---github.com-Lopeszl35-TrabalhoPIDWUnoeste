class PacientesModel {
    constructor(Prontuario, Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo, Email) {
        this.Prontuario = Prontuario;
        this.Nome_Completo = Nome_Completo;
        this.Data_De_Nascimento = Data_De_Nascimento;
        this.CPF = CPF;
        this.RG = RG;
        this.CartaoSUS = CartaoSUS;
        this.Escola = Escola;
        this.Ano_Escolar = Ano_Escolar;
        this.Periodo = Periodo;
        this.Email = Email;
    }
}

module.exports = PacientesModel;
