import { Container, Alert, Button } from "react-bootstrap";
import { useOutletContext, Link } from "react-router-dom";
import { FaCheckCircle, FaArrowLeft, FaRegSave } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import "./CadastrarProfissional.css";
import ProfissionaisService from "../../services/profissionaisService";
import ServicosService from "../../services/servicosService";

const profissionaisService = new ProfissionaisService();
const servicosService = new ServicosService();

function CadastrarProfissionais() {
    const { show } = useOutletContext();
    const [showMensagem, setShowMensagem] = useState(false);
    const [erros, setErros] = useState({});
    const [servicos, setServicos] = useState([]);
    const [usuarioInfo, setUsuarioInfo] = useState({
        nomeCompleto: '', 
        dataNasc: '', 
        cpf: '', 
        rg: '',
        email: '',
        telefone: '',
        especialidade: '',
        registroProfissional: '',
        senha: '',
    });

    // Método para cadastrar profissional no backend
    const cadastrarProfissional = async () => {
        try {
            await profissionaisService.cadastrarProfissional(usuarioInfo);
            setUsuarioInfo({
                nomeCompleto: '',
                dataNasc: '',
                cpf: '',
                rg: '',
                email: '',
                telefone: '',
                especialidade: '',
                registroProfissional: '',
                senha: '',
            });
            setErros({});
            setShowMensagem(true); 
        } catch (error) {
            console.error("Erro ao cadastrar profissional:", error);
    
            // Verifica se o erro contém mensagens de duplicidade específicas para os campos
            if (error.response && error.response.data.errors) {
                setErros(error.response.data.errors);
            } else {
                setErros({ form: 'Erro ao cadastrar o profissional. Tente novamente.' });
            }
        }
    };

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const servicosData = await servicosService.obterTodos();
                setServicos(servicosData);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            }
        };
        fetchServicos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUsuarioInfo({
            ...usuarioInfo,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validate = () => {
        const newErros = {};
        if (!usuarioInfo.nomeCompleto) newErros.nomeCompleto = 'Nome completo é obrigatório';
        if (!usuarioInfo.dataNasc) newErros.dataNasc = 'Data de nascimento é obrigatória';
        if (!usuarioInfo.cpf || !/^\d{11}$/.test(usuarioInfo.cpf)) newErros.cpf = 'CPF inválido. Deve conter 11 dígitos numéricos';
        if (!usuarioInfo.rg || !/^\d+$/.test(usuarioInfo.rg)) newErros.rg = 'RG inválido. Deve conter apenas dígitos numéricos';
        if (!usuarioInfo.email) newErros.email = 'Email é obrigatório';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuarioInfo.email)) newErros.email = 'Email inválido';
        if (usuarioInfo.telefone && !/^\d{10,11}$/.test(usuarioInfo.telefone)) newErros.telefone = 'Telefone inválido. Deve conter 10 ou 11 dígitos';
        if (!usuarioInfo.especialidade) newErros.especialidade = 'Especialidade é obrigatória';
        if (!usuarioInfo.registroProfissional) newErros.registroProfissional = 'Registro profissional é obrigatório';
        if (!usuarioInfo.senha) newErros.senha = 'Senha é obrigatória';
        else if (usuarioInfo.senha.length < 6) newErros.senha = 'A senha deve ter pelo menos 6 caracteres';
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

        <h2>Informações de Contato</h2>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={usuarioInfo.email} onChange={handleInputChange} />
        {erros.email && <p className="erros">{erros.email}</p>}

        <label htmlFor="telefone">Telefone:</label>
        <input type="text" id="telefone" name="telefone" value={usuarioInfo.telefone} onChange={handleInputChange} />
        {erros.telefone && <p className="erros">{erros.telefone}</p>}

        <h2>Informações Profissionais</h2>
        <label htmlFor="especialidade">Especialidade:</label>
        <select id="especialidade" name="especialidade" value={usuarioInfo.especialidade} onChange={handleInputChange}>
            <option value="">Selecione</option>
            {servicos.map((servico) => (
                <option key={servico.ID_Servico} value={servico.Nome_Servico}>{servico.Nome_Servico}</option>
            ))}
        </select>
        {erros.especialidade && <p className="erros">{erros.especialidade}</p>}

        <label htmlFor="registroProfissional">Registro Profissional:</label>
        <input type="text" id="registroProfissional" name="registroProfissional" value={usuarioInfo.registroProfissional} onChange={handleInputChange} />
        {erros.registroProfissional && <p className="erros">{erros.registroProfissional}</p>}

        <h2>Acesso ao Sistema</h2>
        <label htmlFor="senha">Senha:</label>
        <input type="password" id="senha" name="senha" value={usuarioInfo.senha} onChange={handleInputChange} />
        {erros.senha && <p className="erros">{erros.senha}</p>}

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

            <Alert show={showMensagem} variant="success" className="mt-3" dismissible onClose={() =>   setShowMensagem    (false)}>
                <Alert.Heading>
                    <FaCheckCircle className="me-2" /> Profissional Cadastrado!
                </Alert.Heading>
            </Alert>
        </form>
    </Container>
    );
}

export default CadastrarProfissionais;
