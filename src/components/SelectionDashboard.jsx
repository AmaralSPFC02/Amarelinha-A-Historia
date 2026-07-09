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

function initialPlayerForm() {
  return {
    nome: '',
    posicao: '',
    clubeEpoca: '',
    idadeCopa: '',
    jogos: '',
    gols: '',
    assistencias: '',
    titular: false
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
  const [draftSelection, setDraftSelection] = useState(null);
  const [playerForm, setPlayerForm] = useState(initialPlayerForm());
  const [message, setMessage] = useState('');
  const [editingStats, setEditingStats] = useState(null);

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
    setEditingStats(null);
  }

  function handleReserveClick(reserve) {
    setSelectedPlayer(reserve);
    setEditingStats(null);
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

  function updatePlayerStats(field, value) {
    setEditingStats((old) => ({ ...old, [field]: value }));
    setSelectedPlayer((old) => ({
      ...old,
      estatisticasSelecao: { ...old.estatisticasSelecao, [field]: value || null }
    }));
  }

  function savePlayerStats() {
    if (!current || !selectedPlayer) return;
    const jogadores = current.jogadores.map((j) =>
      j.nome === selectedPlayer.nome
        ? { ...selectedPlayer }
        : j
    );
    setCurrent({ ...current, jogadores });
    setEditingStats(null);
    setMessage(`Estatísticas de ${selectedPlayer.nome} atualizadas!`);
  }

  function updateFormField(field, value) {
    setForm((old) => ({ ...old, [field]: value }));
  }

  function updateGoalkeeperField(field, value) {
    setForm((old) => ({ ...old, goleiro: { ...old.goleiro, [field]: value } }));
  }

  function updatePlayerFormField(field, value) {
    setPlayerForm((old) => ({ ...old, [field]: value }));
  }

  function startNewSelection() {
    setForm(initialDraft());
    setDraftSelection(null);
  }

  function openDraftSelection(selection) {
    setDraftSelection(selection);
    setForm(null);
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

    const created = await api.createSavedSelection({
      nome: form.nome,
      ano: form.ano,
      tecnico: form.tecnico,
      formacao: 'Rascunho',
      jogadores: [goleiro]
    });

    setForm(null);
    setDraftSelection(created.selecao);
    setMessage('Seleção criada com sucesso! Clique nela para continuar adicionando jogadores quando quiser.');
    await reloadMine();
  }

  async function addPlayerToSelection(event) {
    event.preventDefault();
    if (!draftSelection) return;

    const jogador = {
      nome: playerForm.nome,
      posicao: playerForm.posicao,
      clubeEpoca: playerForm.clubeEpoca,
      idadeCopa: playerForm.idadeCopa,
      titular: playerForm.titular,
      slot: playerForm.posicao || 'POS',
      foto: '/jogadores/jogador-padrao.jpg',
      estatisticasSelecao: {
        jogos: playerForm.jogos || null,
        gols: playerForm.gols || null,
        assistencias: playerForm.assistencias || null
      }
    };

    const updated = await api.updateSavedSelection(draftSelection.id, {
      ...draftSelection,
      jogadores: [...draftSelection.jogadores, jogador]
    });

    setDraftSelection(updated.selecao);
    setMine((old) => old.map((selection) => (selection.id === updated.selecao.id ? updated.selecao : selection)));
    setPlayerForm(initialPlayerForm());
    setMessage(`${jogador.nome} foi adicionado à seleção ${updated.selecao.nome}.`);
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
              {editingStats ? (
                <div className="stack-form">
                  <input
                    type="number"
                    placeholder="Jogos"
                    value={editingStats.jogos || ''}
                    onChange={(e) => updatePlayerStats('jogos', e.target.value || null)}
                  />
                  <input
                    type="number"
                    placeholder="Gols"
                    value={editingStats.gols || ''}
                    onChange={(e) => updatePlayerStats('gols', e.target.value || null)}
                  />
                  <input
                    type="number"
                    placeholder="Assistências"
                    value={editingStats.assistencias || ''}
                    onChange={(e) => updatePlayerStats('assistencias', e.target.value || null)}
                  />
                  <button className="btn btn-primary" onClick={savePlayerStats} type="button">Salvar</button>
                  <button className="btn" onClick={() => setEditingStats(null)} type="button">Cancelar</button>
                </div>
              ) : (
                <>
                  <p>Jogos: {fmt(selectedPlayer.estatisticasSelecao?.jogos)}</p>
                  <p>Gols: {fmt(selectedPlayer.estatisticasSelecao?.gols)}</p>
                  <p>Assistências: {fmt(selectedPlayer.estatisticasSelecao?.assistencias)}</p>
                  <button className="btn btn-primary" onClick={() => setEditingStats(selectedPlayer.estatisticasSelecao || {})} type="button">Editar estatísticas</button>
                </>
              )}
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
            <button className="btn btn-primary" onClick={startNewSelection} type="button">Criar</button>
          </div>

          {form && (
            <div className="stack-form" style={{ marginTop: '12px' }}>
              <p className="muted">Comece apenas com o goleiro. Depois você pode clicar na seleção e continuar adicionando jogadores um por um.</p>
              <form onSubmit={saveSelection} className="stack-form">
                <input required placeholder="Nome da seleção" value={form.nome} onChange={(e) => updateFormField('nome', e.target.value)} />
                <input placeholder="Ano ou descrição" value={form.ano} onChange={(e) => updateFormField('ano', e.target.value)} />
                <input placeholder="Técnico" value={form.tecnico} onChange={(e) => updateFormField('tecnico', e.target.value)} />

                <h4>Goleiro inicial</h4>
                <input required placeholder="Nome do goleiro" value={form.goleiro.nome} onChange={(e) => updateGoalkeeperField('nome', e.target.value)} />
                <input placeholder="Clube" value={form.goleiro.clubeEpoca} onChange={(e) => updateGoalkeeperField('clubeEpoca', e.target.value)} />
                <input placeholder="Idade" value={form.goleiro.idadeCopa} onChange={(e) => updateGoalkeeperField('idadeCopa', e.target.value)} />
                <input placeholder="Jogos pela Seleção" value={form.goleiro.jogos} onChange={(e) => updateGoalkeeperField('jogos', e.target.value)} />
                <input placeholder="Gols pela Seleção" value={form.goleiro.gols} onChange={(e) => updateGoalkeeperField('gols', e.target.value)} />
                <input placeholder="Assistências" value={form.goleiro.assistencias} onChange={(e) => updateGoalkeeperField('assistencias', e.target.value)} />

                <button className="btn btn-canary" type="submit">Salvar seleção</button>
                <button className="btn" type="button" onClick={() => setForm(null)}>Cancelar</button>
              </form>
            </div>
          )}

          {mine.length === 0 && <p className="muted">Nenhuma seleção criada ainda.</p>}

          {mine.map((selection) => (
            <article className={`saved-item ${draftSelection?.id === selection.id ? 'selected' : ''}`} key={selection.id}>
              <div className="stack-form">
                <button className="btn btn-primary" onClick={() => openDraftSelection(selection)} type="button">
                  {selection.nome}
                </button>
                <span>{selection.ano} · {selection.jogadores?.length || 0} jogador(es) cadastrado(s)</span>
                <div className="inline-actions">
                  <button className="btn" onClick={() => editSelectionName(selection)} type="button">Editar nome</button>
                  <button className="btn btn-danger" onClick={() => deleteSelection(selection.id)} type="button">Excluir</button>
                </div>
              </div>
            </article>
          ))}

          {draftSelection && (
            <div className="stack-form" style={{ marginTop: '12px' }}>
              <h4>Adicionar jogador</h4>
              <p className="muted">Você pode parar a qualquer momento. Os cadastros ficam salvos automaticamente na seleção selecionada.</p>
              <form onSubmit={addPlayerToSelection} className="stack-form">
                <input required placeholder="Nome do jogador" value={playerForm.nome} onChange={(e) => updatePlayerFormField('nome', e.target.value)} />
                <input required placeholder="Posição" value={playerForm.posicao} onChange={(e) => updatePlayerFormField('posicao', e.target.value)} />
                <input placeholder="Clube" value={playerForm.clubeEpoca} onChange={(e) => updatePlayerFormField('clubeEpoca', e.target.value)} />
                <input placeholder="Idade" value={playerForm.idadeCopa} onChange={(e) => updatePlayerFormField('idadeCopa', e.target.value)} />
                <input placeholder="Jogos" value={playerForm.jogos} onChange={(e) => updatePlayerFormField('jogos', e.target.value)} />
                <input placeholder="Gols" value={playerForm.gols} onChange={(e) => updatePlayerFormField('gols', e.target.value)} />
                <input placeholder="Assistências" value={playerForm.assistencias} onChange={(e) => updatePlayerFormField('assistencias', e.target.value)} />
                <label className="muted">
                  <input type="checkbox" checked={playerForm.titular} onChange={(e) => updatePlayerFormField('titular', e.target.checked)} />
                  {' '}Titular
                </label>
                <button className="btn btn-canary" type="submit">Salvar jogador</button>
              </form>
            </div>
          )}
        </section>
      </aside>
    </main>
  );
}
