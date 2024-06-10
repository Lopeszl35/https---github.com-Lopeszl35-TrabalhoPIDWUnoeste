import { Container } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import React, { useState } from 'react';
import "./CadastrarUsuarios.css";

function CadastrarUsuarios() {
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
        tipoUsuarioComum: 'usuarioPadrao',
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
                <h1>Cadastrar Usuário</h1>
                <form className="form-container" onSubmit={handleSubmit}>
                    <h2>Informações Pessoais</h2>
                    <label htmlFor="nomeCompleto">Nome completo:</label>
                    <input type="text" id="nomeCompleto" name="nomeCompleto" value={usuarioInfo.nomeCompleto} onChange={handleInputChange} />
                    {erros.nomeCompleto && <p className="erros">{erros.nomeCompleto}</p>}

                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="dataNasc">Data de nascimento:</label>
                            <input type="date" id="dataNasc" name="dataNasc" value={usuarioInfo.dataNasc} onChange={handleInputChange} />
                            {erros.dataNasc && <p className="erros">{erros.dataNasc}</p>}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="cpf">CPF:</label>
                            <input type="text" id="cpf" name="cpf" value={usuarioInfo.cpf} onChange={handleInputChange} />
                            {erros.cpf && <p className="erros">{erros.cpf}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-6">
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
                        <div className="form-group col-md-6">
                            <label htmlFor="cep">CEP:</label>
                            <input type="text" id="cep" name="cep" value={usuarioInfo.endereco.cep} onChange={handleInputChange} />
                            {erros.cep && <p className="erros">{erros.cep}</p>}
                        </div>
                    </div>

                    <h2>Tipo de Usuário</h2>
                    <div className="form-group">
                        <div className="label-radio">
                            <label>
                                <input
                                    type="radio"
                                    name="tipoUsuario"
                                    value="profissionalSaude"
                                    checked={usuarioInfo.tipoUsuario === 'profissionalSaude'}
                                    onChange={handleInputChange}
                                />
                                Profissional de Saúde
                            </label>
                        </div>
                        <div className="label-radio">
                            <label>
                                <input
                                    type="radio"
                                    name="tipoUsuario"
                                    value="usuarioComum"
                                    checked={usuarioInfo.tipoUsuario === 'usuarioComum'}
                                    onChange={handleInputChange}
                                />
                                Usuário Comum
                            </label>
                        </div>
                    </div>

                    {usuarioInfo.tipoUsuario === 'profissionalSaude' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="areaAtuacao">Área de Atuação:</label>
                                <select
                                    id="areaAtuacao"
                                    name="areaAtuacao"
                                    value={usuarioInfo.areaAtuacao}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione</option>
                                    <option value="medico">Médico</option>
                                    <option value="psicologo">Psicólogo</option>
                                    <option value="nutricionista">Nutricionista</option>
                                    <option value="enfermeiro">Enfermeiro</option>
                                    {/* Adicione outras áreas conforme necessário */}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="registroProfissional">Registro Profissional:</label>
                                <input
                                    type="text"
                                    id="registroProfissional"
                                    name="registroProfissional"
                                    value={usuarioInfo.registroProfissional}
                                    onChange={handleInputChange}
                                />
                                {erros.registroProfissional && <p className="erros">{erros.registroProfissional}</p>}
                            </div>
                        </>
                    )}

                    {usuarioInfo.tipoUsuario === 'usuarioComum' && (
                        <div className="form-group">
                            <div className="label-radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="tipoUsuarioComum"
                                        value="administrador"
                                        checked={usuarioInfo.tipoUsuarioComum === 'administrador'}
                                        onChange={handleInputChange}
                                    />
                                    Administrador
                                </label>
                            </div>
                            <div className="label-radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="tipoUsuarioComum"
                                        value="usuarioPadrao"
                                        checked={usuarioInfo.tipoUsuarioComum === 'usuarioPadrao'}
                                        onChange={handleInputChange}
                                    />
                                    Usuário Padrão
                                </label>
                            </div>
                        </div>
                    )}

                    <div className="botao">
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </Container>
        </div>
    );
}
export default CadastrarUsuarios;
