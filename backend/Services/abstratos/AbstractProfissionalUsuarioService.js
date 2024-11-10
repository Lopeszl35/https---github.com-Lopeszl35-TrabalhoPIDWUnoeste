class AbstractProfissionalUsuarioService {
    consutructor() {
        if (new.target === AbstractProfissionalUsuarioService) {
            throw new Error("Não é possivel instanciar uma classe abstrata");
        }
    }

    async adicionarProfissionalComUsuario(profissional, usuario) {
        throw new Error("Metodo nao implementado");
    }

}

module.exports = AbstractProfissionalUsuarioService