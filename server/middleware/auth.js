import jwt from 'jsonwebtoken';
import { readJson } from '../utils/fileDb.js';

export default async function authRequired(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Token não informado' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-amarelinha');
    const users = await readJson('users.json', []);
    const user = users.find((u) => u.id === decoded.id);
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    req.user = { id: user.id, usuario: user.usuario, email: user.email };
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}
