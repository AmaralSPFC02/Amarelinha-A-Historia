require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth");
const selecoesBaseRoutes = require("./src/routes/selecoesBase");
const minhasSelecoesRoutes = require("./src/routes/minhasSelecoes");
const wikiRoutes = require("./src/routes/wiki");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Backend Seleções Brasileiras - online" });
});

app.use("/api/auth", authRoutes);
app.use("/api/selecoes-base", selecoesBaseRoutes);
app.use("/api/minhas-selecoes", minhasSelecoesRoutes);
app.use("/api/wiki", wikiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use((err, req, res, next) => {
  console.error("Erro:", err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
