import { Container } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import React, { useState } from 'react';
import "./CadastrarProfissional.css";

function CadastrarProfissionais() {
    const { show } = useOutletContext();

    const [usuarioInfo, setUsuarioInfo] = useState({
        nomeCompleto: '', 
        dataNasc: '', 
        cpf: '', 
        rg: '',
        endereco: {numero: '', rua: '', bairro: '', estado: '', cidade: '', cep: ''},
        email: '',
        telefone: '',
        cargo: '',
        dataInicio: '',
        acesso: '',
        senha: '',
        tipoUsuario: 'profissionalSaude',
        areaAtuacao: '',
        registroProfissional: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUsuarioInfo({
            ...usuarioInfo,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAddressInputChange = (e, addressType) => {
        const { name, value } = e.target;
        setUsuarioInfo((prevState) => ({
            ...prevState,
            [addressType]: {
                ...prevState[addressType],
                [name]: value,
            },
        }));
    };

    const [erros, setErros] = useState({});

    const validate = () => {
        const newErros = {};
        if (!usuarioInfo.nomeCompleto) {
            newErros.nomeCompleto = 'Nome completo é obrigatório';
        }
        if (!usuarioInfo.dataNasc) {
            newErros.dataNasc = 'Data de nascimento é obrigatória';
        }
        const cpfRegex = /^\d{11}$/;
        if (!usuarioInfo.cpf || !cpfRegex.test(usuarioInfo.cpf)) {
            newErros.cpf = 'CPF inválido. Deve conter 11 dígitos numéricos';
        }
        const rgRegex = /^\d+$/;
        if (!usuarioInfo.rg || !rgRegex.test(usuarioInfo.rg)) {
            newErros.rg = 'RG inválido. Deve conter apenas dígitos numéricos';
        }
        const cepRegex = /^\d{8}$/;
        if (!usuarioInfo.endereco.cep || !cepRegex.test(usuarioInfo.endereco.cep)) {
            newErros.cep = 'CEP inválido. Deve conter 8 dígitos numéricos';
        }
        if (usuarioInfo.tipoUsuario === 'profissionalSaude' && !usuarioInfo.registroProfissional) {
            newErros.registroProfissional = 'Registro profissional é obrigatório';
        }
        if (!usuarioInfo.email) {
            newErros.email = 'Email é obrigatório';
        }
        if (!usuarioInfo.senha) {
            newErros.senha = 'Senha é obrigatória';
        }
        setErros(newErros);
        return Object.keys(newErros).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Dados do usuário:', usuarioInfo);
        }
    };

    return (
        <div>
            <Container className={`container-usuario ${show ? "container-usuario-active" : ""}`}>
                <h1>Cadastrar Profissional</h1>
                <form className="form-container" onSubmit={handleSubmit}>
                    <h2>Informações Pessoais</h2>
                    <label htmlFor="nomeCompleto">Nome completo:</label>
                    <input type="text" id="nomeCompleto" name="nomeCompleto" value={usuarioInfo.nomeCompleto} onChange={handleInputChange} />
                    {erros.nomeCompleto && <p className="erros">{erros.nomeCompleto}</p>}

                    <div className="row">
                        <div className="form-group col-md-6 input-group">
                            <label htmlFor="dataNasc">Data de nascimento:</label>
                            <div className="input-group">
                            <input type="date" id="dataNasc" name="dataNasc" value={usuarioInfo.dataNasc} onChange={handleInputChange} />
                            {erros.dataNasc && <p className="erros">{erros.dataNasc}</p>}
                            </div>
                        </div>
                        <div className="form-group col-md-6 input-group">
                            <label htmlFor="cpf">CPF:</label>
                            <input type="text" id="cpf" name="cpf" value={usuarioInfo.cpf} onChange={handleInputChange} />
                            {erros.cpf && <p className="erros">{erros.cpf}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-6 input-group">
                            <label htmlFor="rg">RG:</label>
                            <input type="text" id="rg" name="rg" value={usuarioInfo.rg} onChange={handleInputChange} />
                            {erros.rg && <p className="erros">{erros.rg}</p>}
                        </div>
                    </div>

                    <h2>Endereço</h2>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="rua">Rua:</label>
                            <input type="text" id="rua" name="rua" value={usuarioInfo.endereco.rua} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="numero">Numero:</label>
                            <input type="text" id="numero" name="numero" value={usuarioInfo.endereco.numero} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="bairro">Bairro:</label>
                            <input type="text" id="bairro" name="bairro" value={usuarioInfo.endereco.bairro} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="cidade">Cidade:</label>
                            <input type="text" id="cidade" name="cidade" value={usuarioInfo.endereco.cidade} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="estado">Estado:</label>
                            <input type="text" id="estado" name="estado" value={usuarioInfo.endereco.estado} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
                        </div>
                        <div className="form-group col-md-6 input-group">
                            <label htmlFor="cep">CEP:</label>
                            <input type="text" id="cep" name="cep" value={usuarioInfo.endereco.cep} onChange={handleInputChange} />
                            {erros.cep && <p className="erros">{erros.cep}</p>}
                        </div>
                    </div>
                    
                    <h2>Informações de Contato</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={usuarioInfo.email} onChange={handleInputChange} />
                    {erros.email && <p className="erros">{erros.email}</p>}

                    <label htmlFor="telefone">Telefone:</label>
                    <input type="text" id="telefone" name="telefone" value={usuarioInfo.telefone} onChange={handleInputChange} />

                    <h2>Informações Profissionais</h2>
                    <label htmlFor="areaAtuacao">Área de Atuação:</label>
                    <select id="areaAtuacao" name="areaAtuacao" value={usuarioInfo.areaAtuacao} onChange={handleInputChange}>
                        <option value="">Selecione</option>
                        <option value="medico">Médico</option>
                        <option value="psicologo">Psicólogo</option>
                        <option value="nutricionista">Nutricionista</option>
                        <option value="enfermeiro">Enfermeiro</option>
                        {/* Adicione outras áreas conforme necessário */}
                    </select>

                    <label htmlFor="registroProfissional">Registro Profissional:</label>
                    <input type="text" id="registroProfissional" name="registroProfissional" value={usuarioInfo.registroProfissional} onChange={handleInputChange} />
                    {erros.registroProfissional && <p className="erros">{erros.registroProfissional}</p>}

                    <h2>Acesso ao Sistema</h2>
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" value={usuarioInfo.senha} onChange={handleInputChange} />
                    {erros.senha && <p className="erros">{erros.senha}</p>}

                    <div className="botao">
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </Container>
        </div>
    );
}
export default CadastrarProfissionais;
