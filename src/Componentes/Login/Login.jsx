import React, { useState } from 'react';
import './Login.css';
import { Container, Form, Button } from "react-bootstrap";

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const validEmail = 'usuario@exemplo.com';
        const validPassword = 'senha123';

        if (email === validEmail && password === validPassword) {
            onLoginSuccess();
        } else {
            setError('Email ou senha incorretos.');
        }
    };

    return (
        <div className="container-principal-login">
            <Container className="container-login">
                <h1 className='text-center'>Login</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form onSubmit={handleLogin}>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="email"
                            placeholder="nome@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        />
                        <label htmlFor="floatingPasswordCustom">Senha</label>
                    </Form.Floating>
                    <Button variant="dark" type="submit" className="w-100 mt-3">Entrar</Button>
                </Form>
            </Container>
        </div>
    );
}

export default Login;
