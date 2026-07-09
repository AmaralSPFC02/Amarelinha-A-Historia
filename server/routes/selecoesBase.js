import express from 'express';
import selecoes from '../data/selecoesBase.js';
import authRequired from '../middleware/auth.js';

const router = express.Router();

const finais = {
  1970: ['Cidade do México', 'México', 19.4326, -99.1332],
  1978: ['Buenos Aires', 'Argentina', -34.6037, -58.3816],
  1982: ['Madrid', 'Espanha', 40.4168, -3.7038],
  2010: ['Joanesburgo', 'África do Sul', -26.2041, 28.0473],
};

function slugify(s) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

router.get('/', authRequired, (req, res) => {
  const enriched = selecoes.map((selection) => ({
    ...selection,
    id: `base-${selection.ano}`,
    final: {
      cidade: finais[selection.ano][0],
      pais: finais[selection.ano][1],
      latitude: finais[selection.ano][2],
      longitude: finais[selection.ano][3]
    },
    jogadores: selection.jogadores.map((player) => ({
      ...player,
      foto: `/jogadores/${slugify(player.nome)}-${selection.ano}.jpg`,
      anoCopa: selection.ano,
      estatisticasSelecao: {
        jogos: null,
        gols: null,
        assistencias: null,
        ...player.estatisticasSelecao
      }
    }))
  }));

  res.json({ selecoes: enriched });
});

export default router;