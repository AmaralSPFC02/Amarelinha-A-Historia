const BASE_URL = '';

async function request(path, options = {}) {
  const token = localStorage.getItem('sb_token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || 'Falha na requisição');
  return body;
}

export const api = {
  register: (payload) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/api/auth/me'),
  getSelecoesBase: () => request('/api/selecoes-base'),
  getPlayerWiki: (name) => request(`/api/wiki/player?name=${encodeURIComponent(name)}`),
  getSavedSelections: () => request('/api/minhas-selecoes'),
  createSavedSelection: (payload) => request('/api/minhas-selecoes', { method: 'POST', body: JSON.stringify(payload) }),
  updateSavedSelection: (id, payload) => request(`/api/minhas-selecoes/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteSavedSelection: (id) => request(`/api/minhas-selecoes/${id}`, { method: 'DELETE' })
};
