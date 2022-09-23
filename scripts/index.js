function getFirstPlayer() {
  if (document.getElementById("jogadorInicial1").checked) {
    return "X";
  } else {
    return "O";
  }
}

let jogadorAtual = getFirstPlayer();
let started = false;
document.getElementById("jogador").innerHTML =
  "Próximo Jogador<br>" + getCurretPlayer(jogadorAtual);
document.getElementById("message").innerText = "Jogo Não Iniciado";

function getCurretPlayer(jogador) {
  return jogador === "X"
    ? "<img src='imgs/Ironman.png'>"
    : "<img src='imgs/Spiderwoman.png'>";
}

function setCurrentPlayer(jogador) {
  document.getElementById("jogador").innerHTML =
    "Próximo Jogador<br>" + getCurretPlayer(jogador);
}

function restart() {
  jogadorAtual = getFirstPlayer();
  for (let element of document.getElementsByClassName("grid-container")[0]
    .children) {
    element.style.backgroundColor = "#faebd7";
    element.innerText = "";
  }
  setCurrentPlayer(jogadorAtual);
  document.getElementById("message").innerText = "Jogo em Andamento";
  document.getElementById("restart").type = "hidden";
}

function init(element) {
  restart();
  started = true;
  for (let element of document.getElementsByName("jogadorInicial")) {
    element.disabled = true;
  }
  mark(element);
}

function checkWinSequence(jogadas, posicao01, posicao02, posicao03) {
  if (
    jogadas[posicao01].innerHTML === jogadas[posicao02].innerHTML &&
    jogadas[posicao02].innerHTML === jogadas[posicao03].innerHTML &&
    jogadas[posicao03].innerHTML &&
    jogadas[posicao03].innerHTML.length !== 0
  ) {
    jogadas[posicao01].style.backgroundColor = "yellow";
    jogadas[posicao02].style.backgroundColor = "yellow";
    jogadas[posicao03].style.backgroundColor = "yellow";
    return true;
  } else {
    return false;
  }
}

function checkWin() {
  let jogadas = document.getElementsByClassName("grid-container")[0].children;
  if (
    checkWinSequence(jogadas, 0, 1, 2) ||
    checkWinSequence(jogadas, 3, 4, 5) ||
    checkWinSequence(jogadas, 6, 7, 8) ||
    checkWinSequence(jogadas, 0, 3, 6) ||
    checkWinSequence(jogadas, 1, 4, 7) ||
    checkWinSequence(jogadas, 2, 5, 8) ||
    checkWinSequence(jogadas, 0, 4, 8) ||
    checkWinSequence(jogadas, 2, 4, 6)
  ) {
    return true;
  } else {
    return false;
  }
}

function checkNoWin() {
  let noWin = true;
  for (let element of document.getElementsByClassName("grid-container")[0]
    .children) {
    noWin = noWin && element.innerHTML !== "";
  }
  if (noWin) {
    for (let element of document.getElementsByClassName("grid-container")[0]
      .children) {
      element.style.backgroundColor = "aqua";
    }
    for (let element of document.getElementsByName("jogadorInicial")) {
      element.disabled = false;
    }
  }
  return noWin;
}

function mark(element) {
  let gameOver = true;
  if (element.innerHTML.length === 0 && started) {
    element.innerHTML =
      jogadorAtual === "X"
        ? "<img src='imgs/Ironman.png'>"
        : "<img src='imgs/Spiderwoman.png'>";
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    setCurrentPlayer(jogadorAtual);
    document.getElementById("message").innerText = "Jogo em Andamento";
    if (checkWin()) {
      document.getElementById("jogador").innerHTML =
        "VENCEDOR<br>" + element.innerHTML;
      document.getElementById("message").innerText = "Reinicie o Jogo";
      for (let element of document.getElementsByName("jogadorInicial")) {
        element.disabled = false;
      }
    } else if (checkNoWin()) {
      document.getElementById("message").innerText = "Jogo Sem Ganhadores!";
    } else {
      gameOver = false;
    }
    if (gameOver) {
      document.getElementById("restart").type = "button";
      started = false;
    }
  } else if (!started && document.getElementById("restart").type === "hidden") {
    init(element);
  } else if (document.getElementById("restart").type === "hidden") {
    document.getElementById("message").innerText = "Posição em Uso!";
  }
}
