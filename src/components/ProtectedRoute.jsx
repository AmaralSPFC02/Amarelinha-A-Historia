import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <main className="screen-center">Carregando...</main>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
