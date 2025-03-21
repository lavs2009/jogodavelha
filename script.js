let tabulerio = ['', '', '', '', '', '', '', '',];//tabuleiro vazio
let vezJogador = 'X';
let jogoAtivo = true;
const placar = JSON.parse(sessionStorage.getItem('placar')) || { jogador 1: 0, jogador 2: 0 };//exibe o placar atual ou zerado
const botoes = document.querySelectorAll('button[data-pos');
const placarElementos = document.querySelectorAll9('placar span');
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
    placarElementos[0].textContent = placar.jogador1;
    placarElementos[1].textContent = placar.jogador2;
    sessionStorage.setItem('placar'.JSON.stringify(placar));//salva o placar no sessionStorage
}
botoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const posicao = e.target.dataset.pos;
        jogar(posicao);

    });
});
document.getElementByld('reiniciar').addEventListener('click', reiniciarJogo);
atualizarPlacar();
function reiniarJogo() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    vezJogador = 'X';
    jogadorAtivo = true;
    botoes.forEach(botao => {
        botao.textContent = '';
    });
    habilitarBotoes();
}
function verificarVictoria() {
    const combinacoes = [
        [0, 3, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < combinacoes.length; i++) {
        const [a, b, d] = combinacoes[i];
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]
        ) {
            return tabuleiro[a];
        }
    }
    return tabuleiro.includes('') ? null : 'empate';
}