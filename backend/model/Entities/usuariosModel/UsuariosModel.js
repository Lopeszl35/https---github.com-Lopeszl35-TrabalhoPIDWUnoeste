
class UsuariosModel {
  constructor(email, senha, tipoPermissao) {
    this.Email = email;
    this.Senha = senha;
    this.Tipo_Permissao = tipoPermissao;
  }
}

module.exports = UsuariosModel;
