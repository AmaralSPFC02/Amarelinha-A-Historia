import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';

function adjust(players) {
  const out = players.map((p) => ({ ...p, _x: p.x ?? 50, _y: p.y ?? 50 }));
  for (let loop = 0; loop < 80; loop++) {
    let moved = false;
    for (let i = 0; i < out.length; i++) {
      for (let j = i + 1; j < out.length; j++) {
        let dx = out[j]._x - out[i]._x;
        let dy = out[j]._y - out[i]._y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
        if (dist < 11) {
          const push = (11 - dist) / 2;
          dx /= dist;
          dy /= dist;
          out[i]._x -= dx * push;
          out[i]._y -= dy * push;
          out[j]._x += dx * push;
          out[j]._y += dy * push;
          moved = true;
        }
      }
    }
    out.forEach((p) => {
      p._x = Math.max(9, Math.min(91, p._x));
      p._y = Math.max(8, Math.min(92, p._y));
    });
    if (!moved) break;
  }
  return out;
}

function fmt(value) {
  return value === null || value === undefined || value === '' ? '—' : value;
}

function initialDraft() {
  return {
    nome: '',
    ano: '2026',
    tecnico: '',
    goleiro: { nome: '', clubeEpoca: '', idadeCopa: '', jogos: '', gols: '', assistencias: '' }
  };
}

export default function SelectionDashboard() {
  const [base, setBase] = useState([]);
  const [ano, setAno] = useState('1970');
  const [current, setCurrent] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [weather, setWeather] = useState(null);
  const [mine, setMine] = useState([]);
  const [selectedStarter, setSelectedStarter] = useState(null);
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.getSelecoesBase().then((data) => {
      setBase(data.selecoes);
      setCurrent(data.selecoes[0]);
    });
    reloadMine();
  }, []);

  useEffect(() => {
    const selection = base.find((item) => String(item.ano) === String(ano));
    if (selection) {
      setCurrent(JSON.parse(JSON.stringify(selection)));
      setSelectedPlayer(null);
      setSelectedStarter(null);
    }
    api.getWeather(ano).then(setWeather).catch(() => {});
  }, [ano, base]);

  const titulares = useMemo(() => adjust((current?.jogadores || []).filter((j) => j.titular)), [current]);
  const reservas = (current?.jogadores || []).filter((j) => !j.titular);

  async function reloadMine() {
    const data = await api.getSavedSelections();
    setMine(data.selecoes);
  }

  function handleStarterClick(player) {
    setSelectedPlayer(player);
    setSelectedStarter(player);
  }

  function handleReserveClick(reserve) {
    setSelectedPlayer(reserve);
    if (!selectedStarter || !current) return;

    const jogadores = current.jogadores.map((j) => ({ ...j }));
    const starterIndex = jogadores.findIndex((j) => j.nome === selectedStarter.nome && j.titular);
    const reserveIndex = jogadores.findIndex((j) => j.nome === reserve.nome && !j.titular);
    if (starterIndex < 0 || reserveIndex < 0) return;

    const starterPosition = {
      x: jogadores[starterIndex].x,
      y: jogadores[starterIndex].y,
      slot: jogadores[starterIndex].slot,
      posicao: jogadores[starterIndex].posicao
    };

    jogadores[starterIndex] = { ...jogadores[starterIndex], titular: false, x: undefined, y: undefined, slot: undefined };
    jogadores[reserveIndex] = { ...jogadores[reserveIndex], titular: true, ...starterPosition };

    setCurrent({ ...current, jogadores });
    setSelectedStarter(null);
    setMessage(`${reserve.nome} entrou no lugar de ${selectedStarter.nome}.`);
  }

  function updateFormField(field, value) {
    setForm((old) => ({ ...old, [field]: value }));
  }

  function updateGoalkeeperField(field, value) {
    setForm((old) => ({ ...old, goleiro: { ...old.goleiro, [field]: value } }));
  }

  async function saveSelection(event) {
    event.preventDefault();

    const goleiro = {
      nome: form.goleiro.nome,
      posicao: 'GOL',
      clubeEpoca: form.goleiro.clubeEpoca,
      idadeCopa: form.goleiro.idadeCopa,
      titular: true,
      slot: 'GOL',
      x: 50,
      y: 88,
      foto: '/jogadores/jogador-padrao.jpg',
      estatisticasSelecao: {
        jogos: form.goleiro.jogos || null,
        gols: form.goleiro.gols || null,
        assistencias: form.goleiro.assistencias || null
      }
    };

    await api.createSavedSelection({
      nome: form.nome,
      ano: form.ano,
      tecnico: form.tecnico,
      formacao: 'Rascunho',
      jogadores: [goleiro]
    });

    setForm(null);
    setMessage('Seleção criada com sucesso! O restante do elenco pode ser cadastrado depois.');
    await reloadMine();
  }

  async function editSelectionName(selection) {
    const newName = prompt('Novo nome da seleção:', selection.nome);
    if (!newName) return;
    await api.updateSavedSelection(selection.id, { ...selection, nome: newName });
    await reloadMine();
  }

  async function deleteSelection(id) {
    if (!confirm('Deseja excluir esta seleção?')) return;
    await api.deleteSavedSelection(id);
    await reloadMine();
  }

  return (
    <main className="layout">
      <section className="main-column">
        <section className="hero-card">
          <div>
            <span className="eyebrow">Brasil em campo</span>
            <h2>Seleções históricas</h2>
            <p>Clique em um titular e depois em um reserva para substituir.</p>
          </div>
          <div className="controls">
            <select value={ano} onChange={(e) => setAno(e.target.value)}>
              {base.map((selection) => <option key={selection.ano}>{selection.ano}</option>)}
            </select>
          </div>
        </section>

        {message && <p className="success-text">{message}</p>}

        {current && (
          <section className="card">
            <p><b>Técnico:</b> {current.tecnico}</p>
            <div className="pitch">
              <div className="pitch-lines">
                <div className="half-line" />
                <div className="center-circle" />
                <div className="box top" />
                <div className="box bottom" />
              </div>

              {titulares.map((player) => (
                <button
                  className={`shirt-player kit-${ano} ${selectedStarter?.nome === player.nome ? 'selected' : ''}`}
                  style={{ left: `${player._x}%`, top: `${player._y}%` }}
                  onClick={() => handleStarterClick(player)}
                  key={`${player.nome}-${player.slot}`}
                  type="button"
                >
                  <span className="shirt-body">
                    <span className="sleeve left" />
                    <span className="sleeve right" />
                    <span className="number">{player.posicao}</span>
                  </span>
                  <span className="shirt-name">{player.nome}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="card">
          <h3>Banco de reservas</h3>
          <div className="reserve-grid">
            {reservas.map((player) => (
              <button className="reserve-item" onClick={() => handleReserveClick(player)} key={player.nome} type="button">
                <b>{player.nome}</b>
                <span>{player.posicao} · {player.clubeEpoca} · {player.idadeCopa} anos</span>
              </button>
            ))}
          </div>
        </section>

        {form && (
          <section className="card">
            <h2>Criar nova seleção</h2>
            <p className="muted">Para agilizar a apresentação, basta cadastrar um goleiro inicial. O restante do elenco pode ser cadastrado depois.</p>
            <form onSubmit={saveSelection} className="stack-form">
              <input required placeholder="Nome da seleção" value={form.nome} onChange={(e) => updateFormField('nome', e.target.value)} />
              <input placeholder="Ano ou descrição" value={form.ano} onChange={(e) => updateFormField('ano', e.target.value)} />
              <input placeholder="Técnico" value={form.tecnico} onChange={(e) => updateFormField('tecnico', e.target.value)} />

              <h3>Goleiro inicial</h3>
              <div className="players-form-grid">
                <div className="mini-card">
                  <b>GOL</b>
                  <input required placeholder="Nome do goleiro" value={form.goleiro.nome} onChange={(e) => updateGoalkeeperField('nome', e.target.value)} />
                  <input placeholder="Clube" value={form.goleiro.clubeEpoca} onChange={(e) => updateGoalkeeperField('clubeEpoca', e.target.value)} />
                  <input placeholder="Idade" value={form.goleiro.idadeCopa} onChange={(e) => updateGoalkeeperField('idadeCopa', e.target.value)} />
                  <input placeholder="Jogos pela Seleção" value={form.goleiro.jogos} onChange={(e) => updateGoalkeeperField('jogos', e.target.value)} />
                  <input placeholder="Gols pela Seleção" value={form.goleiro.gols} onChange={(e) => updateGoalkeeperField('gols', e.target.value)} />
                  <input placeholder="Assistências" value={form.goleiro.assistencias} onChange={(e) => updateGoalkeeperField('assistencias', e.target.value)} />
                </div>
              </div>

              <button className="btn btn-canary" type="submit">Salvar seleção</button>
              <button className="btn" type="button" onClick={() => setForm(null)}>Cancelar</button>
            </form>
          </section>
        )}
      </section>

      <aside className="side">
        {selectedPlayer ? (
          <section className="card player-details">
            <img className="details-photo" src={selectedPlayer.foto || '/jogadores/jogador-padrao.jpg'} alt={`Foto de ${selectedPlayer.nome}`} />
            <div>
              <h3>{selectedPlayer.nome}</h3>
              <p><b>Posição:</b> {selectedPlayer.posicao}</p>
              <p><b>Clube:</b> {selectedPlayer.clubeEpoca}</p>
              <p><b>Idade:</b> {selectedPlayer.idadeCopa} anos</p>
              <h4>Números pela Seleção</h4>
              <p>Jogos: {fmt(selectedPlayer.estatisticasSelecao?.jogos)}</p>
              <p>Gols: {fmt(selectedPlayer.estatisticasSelecao?.gols)}</p>
              <p>Assistências: {fmt(selectedPlayer.estatisticasSelecao?.assistencias)}</p>
            </div>
          </section>
        ) : (
          <section className="card">Clique em uma camiseta ou reserva.</section>
        )}

        <section className="card climate-card">
          <h3>Clima da final</h3>
          {weather && (
            <>
              <b>{weather.cidade}, {weather.pais}</b>
              <p className="temperature">{Math.round(weather.temperatura)}°C</p>
              <p>Sensação: {Math.round(weather.sensacao)}°C</p>
            </>
          )}
        </section>

        <section className="card">
          <div className="section-heading">
            <h3>Minhas seleções</h3>
            <button className="btn btn-primary" onClick={() => setForm(initialDraft())} type="button">Criar</button>
          </div>

          {mine.length === 0 && <p className="muted">Nenhuma seleção criada ainda.</p>}

          {mine.map((selection) => (
            <article className="saved-item" key={selection.id}>
              <b>{selection.nome}</b>
              <span>{selection.ano} · {selection.jogadores?.length || 0} jogador(es) cadastrado(s)</span>
              <div className="inline-actions">
                <button className="btn" onClick={() => editSelectionName(selection)} type="button">Editar nome</button>
                <button className="btn btn-danger" onClick={() => deleteSelection(selection.id)} type="button">Excluir</button>
              </div>
            </article>
          ))}
        </section>
      </aside>
    </main>
  );
}
