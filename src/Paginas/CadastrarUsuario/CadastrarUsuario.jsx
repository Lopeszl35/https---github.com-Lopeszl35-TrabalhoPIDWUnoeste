import React, { useState } from "react";
import UsuariosService from "../../services/usuariosService";
import styles from "./CadastrarUsuario.module.css";

const usuariosService = new UsuariosService();

const CadastrarUsuario = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    tipoPermissao: "usuarioPadrao",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Atualiza o estado do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Validação do formulário antes do envio
  const validateForm = () => {
    if (!form.nome || !form.email || !form.senha) {
      setErrorMessage("Nome, email e senha são obrigatórios.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // Submissão do formulário
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validação antes de enviar
    if (!validateForm()) return;

    try {
      await usuariosService.adicionarUsuario(form);
      setSuccessMessage("Usuário cadastrado com sucesso!");
      setErrorMessage("");
      setForm({ nome: "", email: "", senha: "", tipoPermissao: "usuarioPadrao" });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setErrorMessage(error.message || "Erro interno ao cadastrar usuário.");
      setSuccessMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro de Usuários</h1>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        {/* Campo Nome */}
        <div className={styles.formGroup}>
          <label htmlFor="nome" className={styles.label}>
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        {/* Campo Email */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        {/* Campo Senha */}
        <div className={styles.formGroup}>
          <label htmlFor="senha" className={styles.label}>
            Senha
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={form.senha}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        {/* Tipo de Permissão */}
        <div className={styles.formGroup}>
          <label htmlFor="tipoPermissao" className={styles.label}>
            Tipo de Permissão
          </label>
          <select
            id="tipoPermissao"
            name="tipoPermissao"
            value={form.tipoPermissao}
            onChange={handleInputChange}
            className={styles.select}
          >
            <option value="usuarioPadrao">Usuário Padrão</option>
            <option value="profissionalSaude">Profissional de Saúde</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {/* Botão de Submissão */}
        <button type="submit" className={styles.button}>
          Cadastrar
        </button>
      </form>

      {/* Mensagens de Sucesso e Erro */}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default CadastrarUsuario;
