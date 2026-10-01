const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const pontuacaoTexto = document.getElementById("pontuacao");
const blocosTexto = document.getElementById("blocos");
const botaoReiniciar = document.getElementById("reiniciar");


// ==============================
// CONFIGURAÇÕES
// ==============================

const larguraTela = canvas.width;
const alturaTela = canvas.height;


// ==============================
// JOGADOR
// ==============================

const jogador = {
    largura: 100,
    altura: 15,

    x: 350,
    y: 750,

    velocidade: 8,

    esquerda: false,
    direita: false
};


// ==============================
// BOLA
// ==============================

const bola = {
    x: 100,
    y: 500,

    tamanho: 15,

    velocidadeX: 7,
    velocidadeY: -7
};


// ==============================
// BLOCOS
// ==============================

const quantidadeColunas = 8;
const quantidadeLinhas = 5;

const larguraBloco = 95;
const alturaBloco = 15;

const espacamento = 5;

let blocos = [];


// ==============================
// PONTUAÇÃO
// ==============================

let pontuacao = 0;

let jogoAtivo = true;


// ==============================
// CRIAR BLOCOS
// ==============================

function criarBlocos() {

    blocos = [];

    for (let linha = 0; linha < quantidadeLinhas; linha++) {

        for (let coluna = 0; coluna < quantidadeColunas; coluna++) {

            const bloco = {
                x: coluna * (larguraBloco + espacamento),
                y: linha * 25,

                largura: larguraBloco,
                altura: alturaBloco,

                ativo: true
            };

            blocos.push(bloco);
        }
    }
}


// ==============================
// DESENHAR JOGADOR
// ==============================

function desenharJogador() {

    ctx.fillStyle = "#0066ff";

    ctx.fillRect(
        jogador.x,
        jogador.y,
        jogador.largura,
        jogador.altura
    );
}


// ==============================
// DESENHAR BOLA
// ==============================

function desenharBola() {

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        bola.x,
        bola.y,
        bola.tamanho,
        bola.tamanho
    );
}


// ==============================
// DESENHAR BLOCOS
// ==============================

function desenharBlocos() {

    ctx.fillStyle = "#00ff00";

    for (const bloco of blocos) {

        if (bloco.ativo) {

            ctx.fillRect(
                bloco.x,
                bloco.y,
                bloco.largura,
                bloco.altura
            );
        }
    }
}


// ==============================
// MOVIMENTAR JOGADOR
// ==============================

function movimentarJogador() {

    if (jogador.esquerda) {

        jogador.x -= jogador.velocidade;
    }

    if (jogador.direita) {

        jogador.x += jogador.velocidade;
    }


    // Limite esquerdo

    if (jogador.x < 0) {

        jogador.x = 0;
    }


    // Limite direito

    if (jogador.x + jogador.largura > larguraTela) {

        jogador.x = larguraTela - jogador.largura;
    }
}


// ==============================
// MOVIMENTAR BOLA
// ==============================

function movimentarBola() {

    bola.x += bola.velocidadeX;
    bola.y += bola.velocidadeY;


    // Parede esquerda

    if (bola.x <= 0) {

        bola.x = 0;

        bola.velocidadeX *= -1;
    }


    // Parede direita

    if (bola.x + bola.tamanho >= larguraTela) {

        bola.x = larguraTela - bola.tamanho;

        bola.velocidadeX *= -1;
    }


    // Parede superior

    if (bola.y <= 0) {

        bola.y = 0;

        bola.velocidadeY *= -1;
    }


    // Bola bate no jogador

    if (

        bola.x < jogador.x + jogador.largura &&

        bola.x + bola.tamanho > jogador.x &&

        bola.y + bola.tamanho >= jogador.y &&

        bola.y <= jogador.y + jogador.altura &&

        bola.velocidadeY > 0

    ) {

        bola.y = jogador.y - bola.tamanho;

        bola.velocidadeY *= -1;
    }


    // Verificar blocos

    for (const bloco of blocos) {

        if (!bloco.ativo) {
            continue;
        }


        if (

            bola.x < bloco.x + bloco.largura &&

            bola.x + bola.tamanho > bloco.x &&

            bola.y < bloco.y + bloco.altura &&

            bola.y + bola.tamanho > bloco.y

        ) {

            bloco.ativo = false;

            bola.velocidadeY *= -1;

            pontuacao++;

            atualizarInformacoes();

            break;
        }
    }


    // Bola caiu

    if (bola.y > alturaTela) {

        jogoAtivo = false;

        mostrarGameOver();
    }


    // Vitória

    if (pontuacao === quantidadeColunas * quantidadeLinhas) {

        jogoAtivo = false;

        mostrarVitoria();
    }
}


// ==============================
// ATUALIZAR INFORMAÇÕES
// ==============================

function atualizarInformacoes() {

    pontuacaoTexto.textContent = pontuacao;

    blocosTexto.textContent =
        (quantidadeColunas * quantidadeLinhas) - pontuacao;
}


// ==============================
// GAME OVER
// ==============================

function mostrarGameOver() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";

    ctx.fillRect(
        0,
        0,
        larguraTela,
        alturaTela
    );


    ctx.fillStyle = "#ffffff";

    ctx.font = "bold 50px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "GAME OVER",
        larguraTela / 2,
        alturaTela / 2
    );


    ctx.font = "25px Arial";

    ctx.fillText(
        "Clique em Reiniciar",
        larguraTela / 2,
        alturaTela / 2 + 50
    );
}


// ==============================
// VITÓRIA
// ==============================

function mostrarVitoria() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";

    ctx.fillRect(
        0,
        0,
        larguraTela,
        alturaTela
    );


    ctx.fillStyle = "#ffffff";

    ctx.font = "bold 50px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "VOCÊ VENCEU!",
        larguraTela / 2,
        alturaTela / 2
    );


    ctx.font = "25px Arial";

    ctx.fillText(
        "Parabéns!",
        larguraTela / 2,
        alturaTela / 2 + 50
    );
}


// ==============================
// DESENHAR JOGO
// ==============================

function desenhar() {

    ctx.clearRect(
        0,
        0,
        larguraTela,
        alturaTela
    );


    desenharBlocos();

    desenharJogador();

    desenharBola();
}


// ==============================
// LOOP DO JOGO
// ==============================

function jogo() {

    if (!jogoAtivo) {
        return;
    }


    movimentarJogador();

    movimentarBola();

    desenhar();


    requestAnimationFrame(jogo);
}


// ==============================
// TECLADO
// ==============================

document.addEventListener("keydown", function(evento) {

    if (evento.key === "ArrowLeft") {

        jogador.esquerda = true;

        evento.preventDefault();
    }


    if (evento.key === "ArrowRight") {

        jogador.direita = true;

        evento.preventDefault();
    }
});


document.addEventListener("keyup", function(evento) {

    if (evento.key === "ArrowLeft") {

        jogador.esquerda = false;
    }


    if (evento.key === "ArrowRight") {

        jogador.direita = false;
    }
});


// ==============================
// REINICIAR
// ==============================

botaoReiniciar.addEventListener("click", function() {

    jogador.x = 350;

    bola.x = 100;
    bola.y = 500;

    bola.velocidadeX = 7;
    bola.velocidadeY = -7;

    pontuacao = 0;

    jogoAtivo = true;

    criarBlocos();

    atualizarInformacoes();

    jogo();
});


// ==============================
// INICIAR
// ==============================

criarBlocos();

atualizarInformacoes();

jogo();