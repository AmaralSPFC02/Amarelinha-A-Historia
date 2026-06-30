import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="brand">
        <span className="flag-ball">◆</span>
        <div>
          <h1>Amarelinha: A História</h1>
          <p>Escalações históricas da Seleção Brasileira</p>
        </div>
      </div>
      <div className="topbar-actions">
        {user ? (
          <>
            <span>Olá, {user.usuario}</span>
            <button className="btn" onClick={() => { logout(); navigate('/login'); }}>Sair</button>
          </>
        ) : (
          <>
            <Link className="btn" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/cadastro">Cadastro</Link>
          </>
        )}
      </div>
    </header>
  );
}
