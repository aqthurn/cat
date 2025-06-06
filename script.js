const gatinho = document.getElementById("gatinho");
const mensagem = document.getElementById("mensagem");
const contadorSpan = document.getElementById("contador");
const frase = document.getElementById("frase");
const recordeSpan = document.getElementById("recorde");
const timerSpan = document.getElementById("tempo");
const som = document.getElementById("miau-som");
const popup = document.getElementById("popup");
const fecharPopup = document.getElementById("fechar-popup");
const susto = document.getElementById("susto");
const somSusto = document.getElementById("som-susto");

let cliques = 0;
let tempo = 20;
let timer = null;
let recorde = localStorage.getItem("recorde") || 0;
recordeSpan.textContent = recorde;

const frases = [
  "Miau! Você me pegou!",
  "Tô tentando fugir! 😼",
  "Ei! De novo não!",
  "Você é rápido, humano!",
  "Mais um clique? Miau!",
  "Quero sardinha como prêmio!",
  "Pega eu se for capaz!"
];

function moverGatinho() {
  const jogo = document.getElementById("jogo");
  const margem = 20;
  const maxX = jogo.clientWidth - gatinho.offsetWidth - margem;
  const maxY = jogo.clientHeight - gatinho.offsetHeight - margem;
  const x = margem + Math.random() * maxX;
  const y = margem + Math.random() * maxY;

  gatinho.style.left = `${x}px`;
  gatinho.style.top = `${y}px`;
}


function mostrarPopup() {
  popup.style.display = "flex";
}

fecharPopup.addEventListener("click", function () {
  popup.style.display = "none";
});

function iniciarTimer() {
  clearInterval(timer);
  tempo = 20;
  timerSpan.textContent = tempo;

  timer = setInterval(() => {
    tempo--;
    timerSpan.textContent = tempo;

    if (tempo <= 0) {
      clearInterval(timer);
      timer = null;
      mensagem.textContent = `⏰ Tempo esgotado! Você clicou ${cliques} vez(es)!`;

      mostrarPopup();

      if (cliques > recorde) {
        localStorage.setItem("recorde", cliques);
        recordeSpan.textContent = cliques;
        mensagem.textContent += " 🏆 Novo recorde!";
      }

      cliques = 0;
      contadorSpan.textContent = cliques;
    }
  }, 1000);
}

gatinho.addEventListener("click", () => {
  cliques++;
  contadorSpan.textContent = cliques;

  if (cliques === 10) {
    susto.classList.add("mostrar");
    susto.style.display = "flex";
    somSusto.play().catch(console.error);
  
    setTimeout(() => {
      susto.classList.remove("mostrar");
      susto.style.display = "none";
    }, 3000);
  }

  frase.textContent = frases[Math.floor(Math.random() * frases.length)];

  som.currentTime = 0;
  som.play().catch((e) => console.error("Erro ao tocar o som:", e));

  setTimeout(() => {
    moverGatinho();
  }, 500);

  if (!timer) {
    iniciarTimer();
  }

  gatinho.classList.add("pulando");
  setTimeout(() => gatinho.classList.remove("pulando"), 150);
});

gatinho.addEventListener("mouseover", moverGatinho);
window.addEventListener("load", moverGatinho);
