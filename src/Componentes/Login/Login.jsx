import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from "react-bootstrap";
import './Login.css';
import { useAuth } from '../../context/AuthProvider';

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/home');
        } catch (error) {
            setError(error.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-principal-login">
            <Container className="container-login">
                <div className="d-flex justify-content-center mb-3">
                    <img width={100} src="./img/Login/Logo-removebg-preview.png" alt="Logo" className="logo" />
                </div>
                <h1 className='text-center'>CareConnect</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form onSubmit={handleLogin}>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="email"
                            placeholder="nome@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                        <label htmlFor="floatingInputCustom">Email</label>
                    </Form.Floating>
                    <Form.Floating>
                        <Form.Control
                            id="floatingPasswordCustom"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                        <label htmlFor="floatingPasswordCustom">Senha</label>
                    </Form.Floating>
                    <Button 
                        variant="dark" 
                        type="submit" 
                        className="w-100 mt-3"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default Login;
