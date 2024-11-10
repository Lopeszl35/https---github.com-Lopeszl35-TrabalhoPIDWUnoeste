class AbstractProfissionalUsuarioRepository {
    constructor() {
        if (new.target === AbstractProfissionalUsuarioRepository) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }
    async adicionarProfissional(profissional, connection) {
        throw new Error("Metodo abstrato nao implementado");
    }

    async adicionarUsuarioProfissional(usuario, connection) {
        throw new Error("Metodo abstrato nao implementado");
    }

    async deletarProfissional(id, connection) {
        throw new Error("Metodo abstrato nao implementado");
    }

    async deletarProfissionalUsuario(email, connection) {
        throw new Error("Metodo abstrato nao implementado");
    }
}

module.exports = AbstractProfissionalUsuarioRepository;