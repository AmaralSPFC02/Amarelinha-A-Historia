import express from 'express';
import authRequired from '../middleware/auth.js';

const router = express.Router();

const finais = {
  1970: ['Cidade do México', 'México', 19.4326, -99.1332],
  1978: ['Buenos Aires', 'Argentina', -34.6037, -58.3816],
  1982: ['Madrid', 'Espanha', 40.4168, -3.7038],
  1998: ['Saint-Denis', 'França', 48.9362, 2.3574],
  2010: ['Joanesburgo', 'África do Sul', -26.2041, 28.0473],
  2022: ['Lusail', 'Catar', 25.4207, 51.49]
};

router.get('/:ano', authRequired, async (req, res, next) => {
  try {
    const local = finais[req.params.ano];
    if (!local) return res.status(404).json({ error: 'Ano sem cidade de final cadastrada' });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${local[2]}&longitude=${local[3]}&current=temperature_2m,apparent_temperature,wind_speed_10m&timezone=auto`);
    if (!response.ok) return res.status(502).json({ error: 'Falha ao consultar clima' });
    const data = await response.json();

    res.json({
      cidade: local[0],
      pais: local[1],
      temperatura: data.current?.temperature_2m,
      sensacao: data.current?.apparent_temperature,
      vento: data.current?.wind_speed_10m
    });
  } catch (err) {
    next(err);
  }
});

export default router;
