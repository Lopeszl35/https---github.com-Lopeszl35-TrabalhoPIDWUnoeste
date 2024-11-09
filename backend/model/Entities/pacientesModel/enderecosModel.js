

class EnderecosModel {
    constructor(Prontuario, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, CEP) {
        this.Prontuario = Prontuario;
        this.Logradouro = Logradouro;
        this.Numero = Numero;
        this.Complemento = Complemento;
        this.Bairro = Bairro;
        this.Cidade = Cidade;
        this.Estado = Estado;
        this.CEP = CEP;
    }
}

module.exports = EnderecosModel;
