class AbstractProfissionalUsuarioModel {
    consutructor() {
        if (new.target === AbstractProfissionalUsuarioModel) {
            throw new Error("Não é possivel instanciar uma classe abstrata");
        }
    }

    async adicionarProfissionalComUsuario(profissional, usuario) {
        throw new Error("Metodo nao implementado");
    }

    async deletarProfissionalUsuario(id) {
        throw new Error("Metodo nao implementado");
    }

}

module.exports = AbstractProfissionalUsuarioModel