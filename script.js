// Variáveis e Configurações Iniciais
let tabuleiro = ['', '', '', '', '', '', '', '', '']; // Tabuleiro vazio
let vezJogador = 'X'; // Começa com o jogador X
let jogoAtivo = true; // O jogo começa ativo

// Carrega o placar do sessionStorage ou inicia com 0
const placar = JSON.parse(sessionStorage.getItem('placar')) || { jogador1: 0, jogador2: 0 };

// Seleção dos botões do tabuleiro e elementos do placar
const botoes = document.querySelectorAll('button[data-pos]');
const placarElementos = document.querySelectorAll('.placar span');

// Função para desabilitar os botões após o fim do jogo
function desabilitarBotoes() {
  botoes.forEach(botao => botao.disabled = true);
}

// Função para habilitar os botões novamente
function habilitarBotoes() {
  botoes.forEach(botao => botao.disabled = false);
}

// Função para atualizar o placar na interface

function atualizarPlacar() {
  // Atualiza o conteúdo dos spans com base nos IDs
  document.getElementById('jogador1').textContent = 'Jogador 1: ' + placar.jogador1;
  document.getElementById('jogador2').textContent = 'Jogador 2: ' + placar.jogador2;

  // Salva o placar atualizado no sessionStorage
  sessionStorage.setItem('placar', JSON.stringify(placar));
}


// Função para verificar se há uma vitória ou empate
function verificarVitoria() {
  const combinacoes = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
  ];

  for (const [a, b, c] of combinacoes) {
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      return tabuleiro[a]; // Retorna 'X' ou 'O'
    }
  }

  return tabuleiro.includes('') ? null : 'empate'; // Se não houver vitória e não houver mais espaços, é empate
}

// Função para realizar uma jogada
// Função para realizar uma jogada
function jogar(posicao) {
  if (!jogoAtivo || tabuleiro[posicao]) return; // Se já foi jogado ou o jogo acabou, nada acontece

  tabuleiro[posicao] = vezJogador; // Marca a jogada no tabuleiro
  botoes[posicao].textContent = vezJogador; // Atualiza o texto do botão

  const resultado = verificarVitoria(); // Verifica se alguém venceu

  if (resultado) {
    jogoAtivo = false; // Finaliza o jogo

    // Exibe o símbolo do vencedor antes da mensagem
    let vencedorMensagem = `Jogador ${vezJogador === 'X' ? '1' : '2'} venceu! (${vezJogador})`;

    // Atualiza o placar
    if (resultado === 'empate') {
      vencedorMensagem = 'Empate!';
    } else {
      if (vezJogador === 'X') {
        placar.jogador1++;
      } else {
        placar.jogador2++;
      }
    }

    atualizarPlacar(); // Atualiza o placar na interface

    // Aguarda 500ms para mostrar a mensagem com o vencedor
    setTimeout(() => {
      alert(vencedorMensagem); // Exibe o vencedor ou empate
      // Pergunta se o jogador deseja jogar novamente
      if (confirm('Deseja jogar novamente?')) {
        reiniciarJogo(); // Reinicia o jogo sem alterar o placar
      } else {
        desabilitarBotoes(); // Desabilita os botões após o fim do jogo
      }
    }, 500);

    return;
  }

  // Alterna entre os jogadores
  vezJogador = vezJogador === 'X' ? 'O' : 'X';
}

// Função para reiniciar o jogo sem resetar o placar
function reiniciarJogo() {
  tabuleiro = ['', '', '', '', '', '', '', '', '']; // Limpa o tabuleiro
  vezJogador = 'X'; // Reseta a vez do jogador para 'X'
  jogoAtivo = true; // O jogo volta a estar ativo

  // Limpa os botões (remover texto de 'X' e 'O')
  botoes.forEach(botao => botao.textContent = '');

  habilitarBotoes(); // Habilita os botões novamente
}

// Adiciona o evento de clique para cada botão do tabuleiro
botoes.forEach(botao => {
  botao.addEventListener('click', (e) => {
    const posicao = e.target.dataset.pos; // Obtém a posição do botão clicado
    jogar(posicao); // Chama a função de jogar
  });
});

// Adiciona o evento para o botão de reiniciar
document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);

// Inicializa o placar na interface
atualizarPlacar();
