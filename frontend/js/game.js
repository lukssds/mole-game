const $levels = { "easy": 3, "medium": 5, "hard": 7 }
const $imageWidth = 100; // largura da imagem da toupeira
const $imageHeight = 80; // altura da imagem da toupeira
const $imgsTheme = { "default": "buraco.gif", "active": "toupeira.gif", "dead": "morreu.gif" };
const initialTime = 30;
var $timeGame = initialTime;
var $idChronoGame; // controla o set interval do cronometro
var $idChronoStartGame; // controla o setInterval do jogo
$(document).ready(function () {
    fillBoard();
  
    hammerCursor();
    ranking();
    $("#chrono").text(initialTime);

    $("#btnPlay").click(function () {
        play();
    });

    $("#btnPause").click(function () {
        pause();
    });

    $("#btnStop").click(function () {
        stop();
    });

    $("#btnExit").click(function () {
        exit();
    });
});

function play() {
    btnCtrl();
    $idChronoStartGame = setInterval(startGame, 1180);
    $idChronoGame = setInterval(startChronoGame, 1000);
}
function pause() {
    $("#btnPlay").prop("disabled", false);
    $("#btnPause").prop("disabled", true)
    clearInterval($idChronoStartGame);
    clearInterval($idChronoGame);
}
function stop() {
    endGame();
    $("#btnPlay").prop("disabled", false);
}
function exit() {
    pause();
    var confirma = confirm("Tem certeza que Quer deixar o jogo ? ")
    if (confirma) {
        window.open("login.html", "_self")
    }
    else {
        play();
    }
}
function startChronoGame() {
    let $secondsFormat = (--$timeGame).toLocaleString("pt-br", { minimumIntegerDigits: 2 });
    ($timeGame >= 0) ? $("#chrono").text($secondsFormat) : endGame();
}

function endGame() {
    salvaPontuacao();
    clearInterval($idChronoGame);
    clearInterval($idChronoStartGame);

    //alert(`Fim de jogo, sua pontuação foi: ${$("#score").text()}`)
   
    alertWifi(`Fim de jogo, sua pontuação foi: ${$("#score").text()} Veja A sua posição no ranque clicando abaixo`, false, 0, `img/${$imgsTheme.dead } ` , 50);

   
               
    $timeGame = initialTime;
    fillBoard();
    $("#score").text("0");
    $("#chrono").text(initialTime);
    $("#btnPause").prop("disabled", true);
    $("#btnStop").prop("disabled", true);
    $("#btnPlay").prop("disabled", false);
}

function btnCtrl() {
    $("#btnPause").prop("disabled", false);
    $("#btnStop").prop("disabled", false);
    $("#btnPlay").prop("disabled", true);
}
// cria tabuleiro conforme o nivel de dificuldade
function fillBoard() {
    $level = getLevel();
    $boardWidth = $imageWidth * $level;
    $boardHieght = $imageHeight * $level;
    $("#board").css({ "width": $boardWidth, "height": $boardHieght });
    placeHolesBoard($level);
}

//Insere  a imagem das toupeiras no tabuleiro
function placeHolesBoard($level) {

    $("#board").empty();
    for ($i = 0; $i < Math.pow($level, 2); $i++) {
        $div = $("<div></div>"); //.attr("id",`mole_${$i+1}`);
        $img = $("<img>").attr({ "src": `img/${$imgsTheme.default}`, "id": `mole_${$i + 1}` });
        $($img).click(function () { updateScore(this) });
        $($div).append($img);
        $("#board").append($div);
    }
}

function updateScore($img) {

    if ($($img).attr("src").search("toupeira") != -1) {
        $("#score").text(parseInt($("#score").text()) + 1);
        $($img).attr("src", `img/${$imgsTheme.dead}`);
    }
}
function startGame() {

    $level = getLevel();
    $randNumber = getRandNumber(1, Math.pow($level, 2));
    $(`#mole_${$randNumber}`).attr("src", `./img/${$imgsTheme.active}`);
    setTimeout(() => {
        $(`#mole_${$randNumber}`).attr("src", `./img/${$imgsTheme.default}`)
    }, 1000);

}

//Gera um numero aleatorio entre "min" e "max"
function getRandNumber(min, max) {
    return Math.round((Math.random() * Math.abs(max - min)) + min);
}

//Retorna o numero correspondente ao nivel de dificuldade selecionado
function getLevel() {
    return $level = $levels[$("#level").val()];
}

function hammerCursor() {

    $("main section").on({
        mousemove: function (e) {
            $(".cursor").css({ left: e.clientX, top: e.clientY })
        },
        mouseover: function () {
            $(".cursor").show();
        },
        mouseout: function () {
            $(".cursor").hide();
        },
        mousedown: function () {
            $(".cursor img").css("animation", "hit 0.1s ease");
            $("#hammerSound")[0].play();
        },
        mouseup: function () {
            $(".cursor img").css("animation", "");
        },
        click: function () {
            $(".cursor img").delay(2000);
        }
    });

}

function salvaPontuacao() {
    let user = JSON.parse(localStorage.getItem("usuario"));
    const url = "http://localhost:8080/ranking"
    let data = {
        "usuario": {
            "id": user.id
        },
        "pontuacao": $("#score").text(),
        "nivel": getLevel()
    }
    axios.post(url, data);
}

function comparaLevel ($level) { 
    (($level ==3)?$level ="Facil":($level == 5)? $level= "Medio":$level="Dificil");
    return $level;
}
function ranking(){ 
    $.getJSON("http://localhost:8080/ranking", function($ranking){

       $ranking.sort((a, b) => b.pontuacao - a.pontuacao); 
       console.log($ranking);
        for($i = 0 ; $i< $ranking.length;$i++){ 
            $("#tableRanking tbody").append(
                "<tr>"+
                    `<td class="active">${$ranking[$i].usuario.user}</td>`+
                    `<td>${$ranking[$i].pontuacao}</td>`+
                    `<td>${comparaLevel($ranking[$i].nivel)}</td>`+
                "</tr>"
                ); 
        }
    });

}