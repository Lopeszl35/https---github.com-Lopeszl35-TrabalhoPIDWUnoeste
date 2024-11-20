import { Container, Alert, Button } from "react-bootstrap";
import { useOutletContext, Link } from "react-router-dom";
import { FaCheckCircle, FaArrowLeft, FaRegSave } from "react-icons/fa";
import React, { useState } from 'react';
import "./CadastrarProfissional.css";
import ProfissionaisService from "../../services/profissionaisService";

const profissionaisService = new ProfissionaisService();

function CadastrarProfissionais() {
    const { show } = useOutletContext();
    const [showMensagem, setShowMensagem] = useState(false);
    const [erros, setErros] = useState({});
    const [profissional, setProfissional] = useState({
        Nome_Completo: '', 
        Data_Nascimento: '', 
        CPF: '', 
        RG: '',
        Email: '',
        Telefone: '',
        registroProfissional: '',
        Especialidade: '',
    });
    const [usuario, setUsuario] = useState({
        Email: '',
        Senha: '',
    });

    const cadastrarProfissional = async () => {
        try {
            const dadosCadastro = { profissional, usuario };
            await profissionaisService.cadastrarProfissional(dadosCadastro);

            setProfissional({
                Nome_Completo: '',
                Data_Nascimento: '',
                CPF: '',
                RG: '',
                Email: '',
                Telefone: '',
                registroProfissional: '',
                Especialidade: '',
            });
            setUsuario({
                Email: '',
                Senha: '',
            });
            setErros({});
            setShowMensagem(true);
        } catch (error) {
            console.error("Erro ao cadastrar profissional:", error);
            setErros({ form: error.message });
        }
    };

    const handleProfissionalChange = (e) => {
        const { name, value } = e.target;
        setProfissional({
            ...profissional,
            [name]: value,
        });
    };

    const handleUsuarioChange = (e) => {
        const { name, value } = e.target;
        setUsuario({
            ...usuario,
            [name]: value,
        });
    };

    const validate = () => {
        const newErros = {};

        if (!profissional.Nome_Completo) newErros.Nome_Completo = 'Nome completo é obrigatório';
        if (!profissional.Data_Nascimento) newErros.Data_Nascimento = 'Data de nascimento é obrigatória';
        if (!profissional.CPF || !/^\d{11}$/.test(profissional.CPF)) newErros.CPF = 'CPF inválido. Deve conter 11 dígitos numéricos';
        if (!profissional.RG || !/^\d+$/.test(profissional.RG)) newErros.RG = 'RG inválido. Deve conter apenas dígitos numéricos';
        if (!profissional.Email) newErros.Email = 'Email é obrigatório';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profissional.Email)) newErros.Email = 'Email inválido';
        if (!profissional.Telefone || !/^\d{10,11}$/.test(profissional.Telefone)) newErros.Telefone = 'Telefone inválido. Deve conter 10 ou 11 dígitos';
        if (!profissional.registroProfissional) newErros.registroProfissional = 'Registro profissional é obrigatório';
        if (!usuario.Senha) newErros.Senha = 'Senha é obrigatória';
        else if (usuario.Senha.length < 6) newErros.Senha = 'A senha deve ter pelo menos 6 caracteres';

        setErros(newErros);
        return Object.keys(newErros).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            cadastrarProfissional();
        }
    };

    return (
        <Container className={`container-usuario ${show ? "container-usuario-active" : ""}`}>
            <h1>Cadastrar Profissional</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Informações Pessoais</h2>
                <label htmlFor="Nome_Completo">Nome completo:</label>
                <input type="text" id="Nome_Completo" name="Nome_Completo" value={profissional.Nome_Completo} onChange={handleProfissionalChange} />
                {erros.Nome_Completo && <p className="erros">{erros.Nome_Completo}</p>}

                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="Data_Nascimento">Data de nascimento:</label>
                        <input type="date" id="Data_Nascimento" name="Data_Nascimento" value={profissional.Data_Nascimento} onChange={handleProfissionalChange} />
                        {erros.Data_Nascimento && <p className="erros">{erros.Data_Nascimento}</p>}
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="RG">RG:</label>
                        <input type="text" id="RG" name="RG" value={profissional.RG} onChange={handleProfissionalChange} />
                        {erros.RG && <p className="erros">{erros.RG}</p>}
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="CPF">CPF:</label>
                        <input type="text" id="CPF" name="CPF" value={profissional.CPF} onChange={handleProfissionalChange} />
                        {erros.CPF && <p className="erros">{erros.CPF}</p>}
                    </div>
                </div>

                <h2>Informações de Contato</h2>
                <label htmlFor="Email">Email:</label>
                <input type="email" id="Email" name="Email" value={profissional.Email} onChange={(e) => {
                    handleProfissionalChange(e);
                    handleUsuarioChange(e);
                }} />
                {erros.Email && <p className="erros">{erros.Email}</p>}

                <label htmlFor="Telefone">Telefone:</label>
                <input type="text" id="Telefone" name="Telefone" value={profissional.Telefone} onChange={handleProfissionalChange} />
                {erros.Telefone && <p className="erros">{erros.Telefone}</p>}

                <label htmlFor="registroProfissional">Registro Profissional:</label>
                <input type="text" id="registroProfissional" name="registroProfissional" value={profissional.registroProfissional} onChange={handleProfissionalChange} />
                {erros.registroProfissional && <p className="erros">{erros.registroProfissional}</p>}

                <h2>Acesso ao Sistema</h2>
                <label htmlFor="Senha">Senha:</label>
                <input type="password" id="Senha" name="Senha" value={usuario.Senha} onChange={handleUsuarioChange} />
                {erros.Senha && <p className="erros">{erros.Senha}</p>}

                <div className="d-flex justify-content-end mt-3">
                    <Link to={"/Profissionais"}>
                        <Button variant="secondary" className="me-2">
                            <FaArrowLeft className="me-2" /> Voltar
                        </Button>
                    </Link>
                    <Button type="submit" variant="primary">
                        <FaRegSave className="me-2" /> Cadastrar
                    </Button>
                </div>

                {erros.form && <p className="erros text-danger mt-3">{erros.form}</p>}

                <Alert show={showMensagem} variant="success" className="mt-3" dismissible onClose={() => setShowMensagem(false)}>
                    <Alert.Heading>
                        <FaCheckCircle className="me-2" /> Profissional Cadastrado!
                    </Alert.Heading>
                </Alert>
            </form>
        </Container>
    );
}

export default CadastrarProfissionais;
