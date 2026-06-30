import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const [form, setForm] = useState({ usuario: '', senha: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <h2>Entrar na arquibancada</h2>
        <form onSubmit={handleSubmit} className="stack-form">
          <input placeholder="Usuário" value={form.usuario} onChange={(e) => setForm({ ...form, usuario: e.target.value })} />
          <input type="password" placeholder="Senha" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} />
          {error && <p className="error-text">{error}</p>}
          <button className="btn btn-primary">Entrar</button>
        </form>
        <p>Não tem conta? <Link to="/cadastro">Cadastrar</Link></p>
      </section>
    </main>
  );
}
