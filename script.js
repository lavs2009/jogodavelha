let tabuleiro = ['', '', '', '', '', '', '', '', '']; // tabuleiro vazio
let vezJogador = 'X';
let jogoAtivo = true;

// Placar inicial ou recuperado do sessionStorage
const placar = JSON.parse(sessionStorage.getItem('placar')) || { jogador1: 0, jogador2: 0 };

// Seleciona os botões do tabuleiro
const botoes = document.querySelectorAll('button[data-pos]');

// Seleciona os spans do placar (corrigir isso no HTML: usar spans com IDs ou classes)
const placarElementos = document.querySelectorAll('header div span');

function desabilitarBotoes() {
  botoes.forEach(botao => {
    botao.disabled = true;
  });
}

function habilitarBotoes() {
  botoes.forEach(botao => {
    botao.disabled = false;
  });
}

function atualizarPlacar() {
  placarElementos[0].textContent = 'Jogador 1: ' + placar.jogador1;
  placarElementos[1].textContent = 'Jogador 2: ' + placar.jogador2;
  sessionStorage.setItem('placar', JSON.stringify(placar)); // corrigido vírgula e chave
}

function jogar(posicao) {
  if (!jogoAtivo || tabuleiro[posicao] !== '') return;

  tabuleiro[posicao] = vezJogador;
  botoes[posicao].textContent = vezJogador;

  const resultado = verificarVitoria();

  if (resultado) {
    jogoAtivo = false;
    desabilitarBotoes();
    if (resultado === 'empate') {
      alert('Empate!');
    } else {
      alert(`Jogador ${vezJogador} venceu!`);
      if (vezJogador === 'X') {
        placar.jogador1++;
      } else {
        placar.jogador2++;
      }
      atualizarPlacar();
    }
    return;
  }

  vezJogador = vezJogador === 'X' ? 'O' : 'X';
}

function reiniciarJogo() {
  tabuleiro = ['', '', '', '', '', '', '', '', ''];
  vezJogador = 'X';
  jogoAtivo = true;
  botoes.forEach(botao => {
    botao.textContent = '';
    botao.disabled = false;
  });
}

// Corrigido: ID estava escrito errado
document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);

// Corrige erro nos índices e nomes
function verificarVitoria() {
  const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < combinacoes.length; i++) {
    const [a, b, c] = combinacoes[i];
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      return tabuleiro[a];
    }
  }

  return tabuleiro.includes('') ? null : 'empate';
}

// Adiciona evento de clique nos botões do tabuleiro
botoes.forEach(botao => {
  botao.addEventListener('click', (e) => {
    const posicao = e.target.dataset.pos;
    jogar(posicao);
  });
});

atualizarPlacar();
