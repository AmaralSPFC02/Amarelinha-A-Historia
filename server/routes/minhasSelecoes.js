import express from 'express';
import crypto from 'crypto';
import { z } from 'zod';
import { readJson, writeJson } from '../utils/fileDb.js';
import authRequired from '../middleware/auth.js';

const router = express.Router();
router.use(authRequired);

const jogadorSchema = z.object({
  nome: z.string().trim().min(1, 'Nome do jogador é obrigatório'),
  posicao: z.string().trim().min(1, 'Posição é obrigatória'),
  clubeEpoca: z.string().optional().default(''),
  idadeCopa: z.union([z.string(), z.number()]).optional().default(''),
  titular: z.boolean().default(false),
  slot: z.string().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  foto: z.string().optional().default('/jogadores/jogador-padrao.jpg'),
  estatisticasSelecao: z.object({
    jogos: z.union([z.string(), z.number(), z.null()]).optional(),
    gols: z.union([z.string(), z.number(), z.null()]).optional(),
    assistencias: z.union([z.string(), z.number(), z.null()]).optional()
  }).optional().default({ jogos: null, gols: null, assistencias: null })
});

const selecaoSchema = z.object({
  nome: z.string().trim().min(1, 'Nome da seleção é obrigatório'),
  ano: z.union([z.string(), z.number()]).optional().default(''),
  tecnico: z.string().optional().default(''),
  formacao: z.string().optional().default('Rascunho'),
  jogadores: z.array(jogadorSchema).min(1, 'Adicione pelo menos um jogador')
});

router.get('/', async (req, res) => {
  const all = await readJson('minhasSelecoes.json', []);
  res.json({ selecoes: all.filter((s) => s.userId === req.user.id) });
});

router.post('/', async (req, res) => {
  const parsed = selecaoSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });

  const all = await readJson('minhasSelecoes.json', []);
  const item = {
    id: crypto.randomUUID(),
    userId: req.user.id,
    ...parsed.data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  all.push(item);
  await writeJson('minhasSelecoes.json', all);
  res.status(201).json({ selecao: item });
});

router.put('/:id', async (req, res) => {
  const parsed = selecaoSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });

  const all = await readJson('minhasSelecoes.json', []);
  const index = all.findIndex((s) => s.id === req.params.id && s.userId === req.user.id);
  if (index === -1) return res.status(404).json({ error: 'Seleção não encontrada' });

  all[index] = { ...all[index], ...parsed.data, updatedAt: new Date().toISOString() };
  await writeJson('minhasSelecoes.json', all);
  res.json({ selecao: all[index] });
});

router.delete('/:id', async (req, res) => {
  const all = await readJson('minhasSelecoes.json', []);
  const exists = all.some((s) => s.id === req.params.id && s.userId === req.user.id);
  if (!exists) return res.status(404).json({ error: 'Seleção não encontrada' });

  await writeJson('minhasSelecoes.json', all.filter((s) => !(s.id === req.params.id && s.userId === req.user.id)));
  res.json({ success: true });
});

export default router;
