// front/src/components/LoginForm.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const Form = styled.form`…`;
const Input = styled.input`…`;
const Button = styled.button`…`;

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/user/login', { email, password });
      localStorage.setItem('token', data.token);
      onLogin();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(`Erro ao logar: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <Input type="email" placeholder="Email"
             value={email} onChange={e => setEmail(e.target.value)} />
      <Input type="password" placeholder="Senha"
             value={password} onChange={e => setPassword(e.target.value)} />
      <Button type="submit">Entrar</Button>
    </Form>
  );
}

export default LoginForm;
