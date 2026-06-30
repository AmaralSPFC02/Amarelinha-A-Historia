import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { z } from 'zod';
import { readJson, writeJson } from '../utils/fileDb.js';
import authRequired from '../middleware/auth.js';

const router = express.Router();

const registerSchema = z.object({
  usuario: z.string().trim().min(1, 'Campo usuário é obrigatório'),
  email: z.string().trim().min(1, 'Campo e-mail é obrigatório').email('E-mail inválido'),
  senha: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
  confirmacaoSenha: z.string().min(4, 'Confirmação deve ter no mínimo 4 caracteres')
}).refine((data) => data.senha === data.confirmacaoSenha, {
  message: 'Senha e confirmação não conferem',
  path: ['confirmacaoSenha']
});

const loginSchema = z.object({
  usuario: z.string().trim().min(1, 'Campo usuário é obrigatório'),
  senha: z.string().min(1, 'Campo senha é obrigatório')
});

const sign = (user) => jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'dev-secret-amarelinha', { expiresIn: '2h' });
const publicUser = (user) => ({ id: user.id, usuario: user.usuario, email: user.email });

router.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });

  const { usuario, email, senha } = parsed.data;
  const users = await readJson('users.json', []);

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: 'Já existe usuário com esse e-mail' });
  }

  if (users.some((u) => u.usuario.toLowerCase() === usuario.toLowerCase())) {
    return res.status(409).json({ error: 'Já existe usuário com esse nome de usuário' });
  }

  const user = {
    id: crypto.randomUUID(),
    usuario,
    email,
    passwordHash: await bcrypt.hash(senha, 10),
    createdAt: new Date().toISOString()
  };

  users.push(user);
  await writeJson('users.json', users);
  res.status(201).json({ user: publicUser(user), token: sign(user) });
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });

  const users = await readJson('users.json', []);
  const user = users.find((u) => u.usuario.toLowerCase() === parsed.data.usuario.toLowerCase());
  if (!user || !(await bcrypt.compare(parsed.data.senha, user.passwordHash))) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }

  res.json({ user: publicUser(user), token: sign(user) });
});

router.get('/me', authRequired, (req, res) => res.json({ user: req.user }));

export default router;
