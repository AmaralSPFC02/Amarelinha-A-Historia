import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';

export default function RegisterPage() {
  const [form, setForm] = useState({ usuario: '', email: '', senha: '', confirmacaoSenha: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setField = (field, value) => setForm((old) => ({ ...old, [field]: value }));

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      await api.register(form);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <h2>Cadastro da torcida</h2>
        <form onSubmit={handleSubmit} className="stack-form">
          <input placeholder="Usuário" value={form.usuario} onChange={(e) => setField('usuario', e.target.value)} />
          <input placeholder="Email" value={form.email} onChange={(e) => setField('email', e.target.value)} />
          <input type="password" placeholder="Senha" value={form.senha} onChange={(e) => setField('senha', e.target.value)} />
          <input type="password" placeholder="Confirmar senha" value={form.confirmacaoSenha} onChange={(e) => setField('confirmacaoSenha', e.target.value)} />
          {error && <p className="error-text">{error}</p>}
          <button className="btn btn-primary">Cadastrar</button>
        </form>
        <Link to="/login">Já tenho conta</Link>
      </section>
    </main>
  );
}
