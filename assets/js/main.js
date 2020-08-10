// create array of words
let words = [
    "javascript",
    "monkey",
    "amazing",
    "pancake",
    "python",
    "visualbasic",
    "csharp"
    "algorithm",
    "compiler",
];

let maxGuesses = 7; // max tries = how many failed guesses

let guessedLetters = []; // store array unique letters guessed
let word; // index to store randomly selected word in array
let guessingWord = []; // array that stores guessed letters
let remainingGuesses = 0; // tries left
let gameStarted = false; // to tell if game has started
let hasFinished = false; // for 'press any key to try again'
let wins = 0; // how many wins


// reset game-level variables
function resetGame() {
    remainingGuesses = maxGuesses; // reset number of remaining tries
    gameStarted = false;

    // pick a random word from array
    let word = words[Math.floor(Math.random() * words.length)];

    // clear out arrays
    guessedLetters = [];
    guessingWord = [];

    // clear hangman-image
    document.getElementById('hangman-image').src = "";

    // build guessing word and clear it out
    for (let i = 0; i < word.length; i++) {
        guessingWord.push("_"); // initialize word with '_' to be replaced with correct answers
    }
    
    // hide game over and win text/image
    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("win-image").style.cssText = "display: none";

    // show display
    updateDisplay();
};

// update the display on HTML page
function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById('currentWord').innerText = "";
    for (let i = 0; i < guessingWord.length; i ++) {
        document.getElementById('currentWord').innerText += guessingWord[i];
    }
    document.getElementById('remainingGuesses').innertText = remainingGuesses;
    document.getElementById('guessedLetters').innerText = guessedLetters;
    if (remainingLetters <= 0) {
        document.getElementById('gameover-image').style.cssText = "display: block";
        document.getElementById('pressKeyTryAgain').style.cssText = "display: block";
        hasFinished = true;
    }
};

// update hanging image depending on number of guesses
function updateHangmanImage() {
    document.getElementById('hangman-image').src = "assets/img/" + (maxGuesses - remainingGuesses) + ".jpg";
};

// Input on key event listener
document.onkeydown = function(event) {
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // check if a-z pressed
        if (event.keycode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase()); // force lowercase input
        }
    }
};


/*
// answer array
let answerArray = [];
// create looping variable 
for (let i = 0; i < word.length; i ++) {
    answerArray[i] = "_";
}
// variable to keep tracks of remaing letters and decrement guesses
let remainingLetters = word.length;

// game loop
while (remaingLetters > 0) {
    // show progress
    document.getElementById('answer').innerHTML = answerArray.join(" ");
    // take input
    let guess = prompt("Guess a letter");
    if (guess === null) {
        break; // exit the game loop
    }   else if (guess.length !== 1) {
        alert("Please enter a single letter");
    } else {
        //update game state with the guess
        for (let j = 0; j < word.length; j ++) {
            // update answerArray and remainingLetters if good guess
            if (word[j] === guess) {
                answerArray[j] = guess;
                remainingLetters --;
            }
        }
    }
    // end of loop
}

// show final result
document.getElementById('answer').innerHTML = answerArray.join(" ");
alert("Good job ! The answer was " + word);

// add variable to track number of guesses and end game if runs out
// and in while (remaing > 0 && nbGues > 0)

// FIX BUG (if guess same correct letter, remainingLetters keeps decrementing)
// add other condition to check if value in answerArray is still underscore
// if not underscore, then letter has already been guessed
*/