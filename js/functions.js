var engine = {
    "colors": ['green', 'purple', 'pink', 'red', 'yellow', 'orange', 'grey', 'black', 'blue', 'brown', 'white', 'beige', 'violet'],
    "hexadecimals": {
        'green': '#02EF00',
        'purple': '#790093',
        'pink': '#F02A7E',
        'red': '#E90808',
        'yellow': '#E7D703',
        'orange': '#F16529',
        'grey': '#D3D3D3',
        'black': '#141414',
        'blue': '#0000FF',
        'brown': '#8B4513',
        'white': '#FFFFFF',
        'beige': '#F5F5DC',
        'violet': '#EE82EE',
    },
    "coins": 0
}

var newGame = document.getElementById('restart');

const coinAudio = new Audio('audio/moeda.mp3');
const errorAudio = new Audio('audio/errou.mp3');

function shuffleColor() {
    var indexColorSelected = Math.floor(Math.random() * engine.colors.length);
    var captionBoxColor = document.getElementById('box-color');
    var colorSelectedName = engine.colors[indexColorSelected];

    captionBoxColor.innerText = colorSelectedName.toUpperCase();

    return engine.hexadecimals[colorSelectedName];
}

function colorBoxSelect(colorName) {
    var colorsBox = document.getElementById('current-color');

    colorsBox.style.backgroundColor = colorName;
    colorsBox.style.backgroundImage = "url('/img/caixa-fechada.png')";
    colorsBox.style.backgroundSize = "100%";
}

function scoreUpdate(value) {
    var score = document.getElementById('current-score');

    engine.coins += value;

    if (value < 0) {
        errorAudio.play();
    } else {
        coinAudio.play();
    }

    score.innerText = engine.coins;
}

colorBoxSelect(shuffleColor())

var btnRecorder = document.getElementById("answer-btn");
var audioTranscription = "";
var rightAnswer = "";

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recorder = new SpeechAPI();

    recorder.continuous = false;
    recorder.lang = "en-US";

    recorder.onstart = function() {
        btnRecorder.innerText = "Estou ouvindo";

        btnRecorder.style.backgroundColor = "white";
        btnRecorder.style.color = "black";
    }

    recorder.onend = function() {
        btnRecorder.innerText = "Responder";

        btnRecorder.style.backgroundColor = "transparent";
        btnRecorder.style.color = "white";
    }

    recorder.onresult = function(event) {
        audioTranscription = event.results[0][0].transcript.toUpperCase();
        rightAnswer = document.getElementById('box-color').innerText.toUpperCase();

        if (audioTranscription === rightAnswer) {
            scoreUpdate(1);
        } else {
            scoreUpdate(-1);
        }
        colorBoxSelect(shuffleColor());
    }

} else {
    alert('Não tem suporte');
}

btnRecorder.addEventListener('click', function(e) {
    recorder.start();
})

newGame.addEventListener('click', function() {
    var score = document.getElementById('current-score');
    engine.coins = 0;

    score.innerText = engine.coins;
    colorBoxSelect(shuffleColor());
})