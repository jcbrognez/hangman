// create array of words
let words = [
    "javascript",
    "monkey",
    "amazing",
    "pancake",
    "python",
    "visualbasic",
    "csharp",
    "algorithm",
    "compiler",
    "css",
];

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    answer = words[Math.floor(Math.random() * words.length)];
}

randomWord();

function generateButtons() {
    let buttonHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
        <button
        class="btn btn-md btn-primary m-1"
        id='` + letter + `'
        onclick="handleGuess('` + letter + `')"
        >
        ` + letter + `
        </button>
        `);

        document.getElementById('keyboard').innerHTML = buttonHTML.join('');
}

generateButtons();

document.getElementById('maxWrong').innerHTML = maxWrong;

// replace underscore by guessed letter if exist, updates the letters
function guesseWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordSpotLight').innerHTML = wordStatus;
}

guesseWord();


function handleGuess(chosenLetter) {
    //if chosen letter does'nt exist push in array, if does exist, do nothing
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null; // null : disable
    document.getElementById(chosenLetter).setAttribute('disabled', true); // disable the buttons when used

    if (answer.indexOf(chosenLetter) >= 0) { // does exist
        guesseWord(); // updates the letters
        checkWin();
    } else if (answer.indexOf(chosenLetter) === -1) { // does not exist
        mistakes++; //increment mistakes
        updateMistakes(); // and update
        checkLoss();
        updateImage(); // update picture
    }
}

// update picture
function updateImage() {
    if (mistakes < 6) {
        document.getElementById('hangman-image').src = 'assets/img/' + mistakes + '.jpg';
    } else if (mistakes === 6) {
        document.getElementById('hangman-image').src = 'https://media.giphy.com/media/VCD63s5JpEgs8/giphy.gif';
    }
}

//UPDATE mistakes
function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

// WIN
function checkWin() {
    if (wordStatus === answer) {
        document.getElementById('hangman-image').src = 
        document.getElementById('keyboard').innerHTML = 'You won !';
        document.getElementById('hangman-image').src = 'https://media.giphy.com/media/aBktINOpjrWAE/giphy.gif';
    }
}

// LOSS
function checkLoss() {
    if (mistakes === maxWrong) {
        document.getElementById('keyboard').innerHTML = 'You dig !';
        document.getElementById('wordSpotLight').innerHTML = 'The answer was : ' + answer;
    }
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangman-image').src = 'assets/img/0.jpg';

    randomWord();
    guesseWord();
    updateMistakes();
    generateButtons();
}