import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import selecoesBaseRoutes from './routes/selecoesBase.js';
import minhasSelecoesRoutes from './routes/minhasSelecoes.js';
import weatherRoutes from './routes/weather.js';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Backend online — rodando no servidor, vai Brasil!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/selecoes-base', selecoesBaseRoutes);
app.use('/api/minhas-selecoes', minhasSelecoesRoutes);
app.use('/api/weather', weatherRoutes);

app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));
app.use((err, req, res, next) => {
  console.error('[ERRO]', err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🇧🇷 Rodando no servidor ${PORT}, vai Brasil!`));
