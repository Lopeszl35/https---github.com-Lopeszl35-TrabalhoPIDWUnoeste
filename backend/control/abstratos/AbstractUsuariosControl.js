class AbstractUsuariosControl {
    constructor() {
        if (new.target === AbstractUsuariosControl) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async adicionarUsuario(req, res) {
        throw new Error("Metodo não implementado");
    }

    async login(req, res) {
        throw new Error("Metodo não implementado");
    }

    async editarUsuario(req, res) {
        throw new Error("Metodo não implementado");
    }

    async excluirUsuario(req, res) {
        throw new Error("Metodo não implementado");
    }

    async obterUsuarios(req, res) {
        throw new Error("Metodo não implementado");
    }

} 

module.exports = AbstractUsuariosControl