import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('sb_token')) {
      setLoading(false);
      return;
    }

    api.me()
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem('sb_token'))
      .finally(() => setLoading(false));
  }, []);

  async function login(payload) {
    const data = await api.login(payload);
    localStorage.setItem('sb_token', data.token);
    setUser(data.user);
  }

  async function register(payload) {
    const data = await api.register(payload);
    localStorage.setItem('sb_token', data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem('sb_token');
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, login, register, logout, isAuthenticated: Boolean(user) }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
