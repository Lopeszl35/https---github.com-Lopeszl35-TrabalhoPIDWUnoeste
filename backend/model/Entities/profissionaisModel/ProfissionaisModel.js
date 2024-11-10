
class ProfissionaisModel {
    constructor(Nome_Completo, CPF, RG, Data_Nascimento, Telefone, Email, Especialidade, registroProfissional) {
        this.Nome_Completo = Nome_Completo;
        this.CPF = CPF;
        this.RG = RG;
        this.Data_Nascimento = Data_Nascimento;
        this.Telefone = Telefone;
        this.Email = Email;
        this.Especialidade = Especialidade;
        this.registroProfissional = registroProfissional;
    }

}

module.exports = ProfissionaisModel;
