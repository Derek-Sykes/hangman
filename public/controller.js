/*

make spot for hint/s maybe option to reveal more hints maybe tie hints to worng guesses??


add feature where it picks a random word and maybe gives you a hint
make it so that no matter the size of the screen the formatting looks good

game works when spaces are in answer now
be able to click enter to make guess
auto focus in guess box contantly
format to see when you win and lose and other feedback like when game needs to be started
need to make it work when you type more than one letter at once
*/


// taking canvas element from html and putting it in variable
const canvas = document.getElementById('canvas1');
// idk lol
const ctx = canvas.getContext('2d');
// assigning size to canvas
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 400;
//assigning image to variable so that i can manipulate it
const playerImage = new Image();
function drawPlayer() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(
        playerImage,
        spriteWidth * framex,
        spriteHeight * framey,
        spriteWidth,
        spriteHeight,
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
    );
}

playerImage.onload = function() {
    drawPlayer(); // Initial drawing when image loads
};
playerImage.src = 'elements\\hangman_frames.jpg';

// logic
let framex = 0
let framey = 0
let gameFrame = 0;
// speed
let staggerFrames = 1;

//image size
const spriteWidth = 124
const spriteHeight = 170

ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);















// Decrypt and decode data for hangman game
const urlParams = new URLSearchParams(window.location.search);
const receivedData = urlParams.get("data");
const secretKey = decodeURIComponent(urlParams.get("key"));
const hintd = decodeURIComponent(urlParams.get("hint"));
let decryptedBytesA = CryptoJS.AES.decrypt(decodeURIComponent(receivedData), secretKey);
let decryptedMessageA = decryptedBytesA.toString(CryptoJS.enc.Utf8);
let decryptedBytesH = CryptoJS.AES.decrypt(decodeURIComponent(hintd), secretKey);

let hint = decryptedBytesH.toString(CryptoJS.enc.Utf8);
let category = urlParams.get("category");
let spAnswer = decryptedMessageA.toLowerCase();           // word you have to guess   aka "soccer ball"







let answer = removeSpace(spAnswer);     // answer but with no spaces aka "soccerball"
let AL = answer.length
let guessedLetters = "_".repeat(spAnswer.length);
// temp is the letters that have been guessed and _'s that havent been guessed
let temp = guessedLetters;
let guessSpaces = "_ ".repeat(AL)
let wrongGuesses = "";
let prepend = "Guess Space: <hr>"
let q = 0; 
let start = false;
let feedback = "";

let guessSpaceEl = document.getElementById('guessSpace');
let wrongGuessesEl = document.getElementById('wrongGuesses');
let guessEl = document.getElementById('guess');
let feedbackEl = document.getElementById('feedback');
let answerEl = document.getElementById('answer');
let categoryEl = document.getElementById('category');
let hintEl = document.getElementById('hint');
hintEl.innerHTML = "Hint: ";
let guess = "";


function redirectToHangman() {
    let secretKey = "YourSecretKey";
    let answerEl = document.getElementById('answer');
    let hintEl = document.getElementById('hint');
    let categoryEl = document.getElementById('category');
    let c = categoryEl.value;
    let a = answerEl.value;
    let h = hintEl.value;
    answerEl.value = '';
    hintEl.value = '';
    categoryEl.value = '';

    // Encrypt and encode data
    let encryptedMessageA = CryptoJS.AES.encrypt(a, secretKey)
    const encodedData = encodeURIComponent(encryptedMessageA);
    let encryptedMessageH = CryptoJS.AES.encrypt(h, secretKey)
    const encodedHint = encodeURIComponent(encryptedMessageH);

    const encodedKey = encodeURIComponent(secretKey);
    const encodedCategory = encodeURIComponent(c);

    postInfo(a,c,h);
    window.location.href = "hangman.html?data=" + encodedData + "&key=" + encodedKey + "&hint=" + encodedHint + "&category=" + encodedCategory;
}


// function singlePlayer(){

//     const xlsx = require("xlsx");
//     const book = xlsx.readFile("Book1.xlsx");
//     const list = book.Sheets["Sheet1"];
//     const data = xlsx.utils.sheet_to_json(list);
//     let row = randomInt(0, 130);
//     console.log(data[row].Answer, data[row].Category, data[row].Hint, row);

//     let secretKey = "YourSecretKey";
//     let a = data[row].Answer;
//     let c = data[row].Category;
//     let h = data[row].Hint;


//     // Encrypt and encode data
//     let encryptedMessageA = CryptoJS.AES.encrypt(a, secretKey)
//     const encodedData = encodeURIComponent(encryptedMessageA);
//     let encryptedMessageH = CryptoJS.AES.encrypt(h, secretKey)
//     const encodedHint = encodeURIComponent(encryptedMessageH);

//     const encodedKey = encodeURIComponent(secretKey);
//     const encodedCategory = encodeURIComponent(c);
//     console.log("here");

    
//     window.location.href = "hangman.html?data=" + encodedData + "&key=" + encodedKey + "&hint=" + encodedHint + "&category=" + encodedCategory;
// }



// puts space in temp if there is a space in the word

function storeEntry(answer, category, hint){
    return {"answer": answer, "category": category, "hint": hint};
}
function makeTemp(){
    
    let a = 0;
    let x ='';
    if(letterInWordnsp(" ", spAnswer)[0] != -1){
        for(let i=0;i<temp.length;i++){
            if(a < indicies.length && i === indicies[a]){      // if there are more letters to fill
                x += " "                           // add the letter to this spot
                a++;                                           
            }else{
                x += temp[i];
            }
        } 
        temp = x; 
        indicies = []  
    }
    
}


// determines if a number is even
function isEven(x){
    return x%2 === 0;
}

// if the character is a space it replaces it with a <br> tag
function ifspace(char) {
        if (char === " ") {
            return "<br>";
        }else{
            return char;
        }
}

// removes all space from any string
function removeSpace(word){
    let newWord = "";
    for (let letter of word){
        if(letter != " "){
            newWord += letter;
        }
    }
    return newWord;
}

// uses the list indicies to communicate where in the word the letter is located
let indicies = [];
function letterInWord(letter, word){
    for(let i=0; i<word.length; i++){
        if (word[i] == letter && letter != " "){
            indicies.push(i);
        }
    }
    if(indicies.length === 0){
        indicies.push(-1);
    }
    return indicies;
}

function letterInWordnsp(letter, word){
    for(let i=0; i<word.length; i++){
        if (word[i] == letter){
            indicies.push(i);
        }
    }
    if(indicies.length === 0){
        indicies.push(-1);
    }
    return indicies;
}

// will space out the word making first letter at index 0 and second letter at index 2 ...etc
function makeSpace(word){
    let newWord = '';
    for(let letter of word){
        if(letter == " "){
            newWord += ifspace(letter);
        }else{
            newWord += letter + " ";
        }
    }
    return newWord;
}

// changes frame in the canvas logically
function increaseFrame(){
    if (framex <3 && start) framex++
    else if(framey == 1 && framex > 2){
        framey = 0;
        framex = 0;
    }
    else if(framex > 2 && framey == 0){
        framex = 0;
        framey = 1;
    }
    drawPlayer();
    if(framex === 3 && framey === 1){
        start = false;
        feedback = "Game over, You Lose<br>Press START to play again!";
        feedbackEl.innerHTML = feedback;
        feedback = ''
    }
}

// sets frame back to the starting state
function resetGame(){
    framex = 0;
    framey = 0;
    drawPlayer();
    guessSpaces = "_ ".repeat(AL)
    guessSpaceEl.innerHTML = "Guess Space: " + guessSpaces;
    guess = "";
    feedbackEl.innerHTML = feedback;
    z = 0;
    guessedLetters = "_".repeat(spAnswer.length);
    temp = guessedLetters;
    // sets up formatting for the spaces
    makeTemp();
    fillWord();
    hintEl.innerHTML = "Hint: ";
    document.getElementById("revealHint").hidden = false;
    wrongGuesses = '';
    guessSpaceEl.innerHTML = "Guess Space: <hr>" + makeSpace(guessSpaces);
    wrongGuessesEl.innerHTML = "Wrong Guesses: <hr>" + wrongGuesses;
    categoryEl.innerHTML = "Category: " + category;
}

// updates the html with the correct guesses
function fillWord(){
    let q = 0;
    let newWord ='';
    guessedLetters = ''

    for(let i=0; i<spAnswer.length; i++){  // while i < the size of the goal word
        if(q < indicies.length && i === indicies[q]){      // if there are more letters to fill and were at the spot that needs filled
            newWord += spAnswer[i]                           // add the letter to this spot
            guessedLetters += spAnswer[i];
            q++;                                           
        }else{  // need to make it create the word based on already guessed letters
            newWord += temp[i];        // fills guess spaces with characters already guessed or if not then the _'s
            guessedLetters += temp[i];
            
        }
    }
    temp = guessedLetters;
    guessSpaceEl.innerHTML = prepend + makeSpace(newWord); // sets the html of the game to to updated word after correct guess was made
    guessSpaces = newWord                                  // sets guessSpaces to the filled word without any spaces in it.
}

function RevealHint(){
    if(start){
        hintEl.innerHTML = "Hint: " + hint + " ";
        document.getElementById("revealHint").hidden = true;
        increaseFrame();
        document.getElementById("guess").focus();
    }
}

function Reveal2Player(){  
    document.getElementById("player2").hidden = true;
    document.getElementById("singlePlayer").hidden = true;
    document.getElementById("2pf").hidden = false;
    document.getElementById("answer").focus();
    document.getElementById("back").hidden = false;
    
}

function back(){
    document.getElementById("player2").hidden = false;
    document.getElementById("singlePlayer").hidden = false;
    document.getElementById("2pf").hidden = true;
    document.getElementById("back").hidden = true;
    
}

function WrongGuesses(letter){
    let inWrongGuesses = false;
    feedback = "Wrong guess";
    feedbackEl.innerHTML = feedback;
    
    for(let l of wrongGuesses){
        if(l == letter){
            inWrongGuesses = true;
            break;
        }
    }
    if(!inWrongGuesses){
        wrongGuesses += letter + " ";
        wrongGuessesEl.innerHTML = "Wrong Guesses: <hr>" + wrongGuesses;
    }
    increaseFrame();
}




// allows you to hit enter to make a guess
const guessBox = document.getElementById('guess');
guessBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        MakeGuess();
    }
});
document.getElementById("start").onclick = function(){
    start = true;
    feedback = "Game in progress . . .";
    resetGame();
    feedbackEl.innerHTML = feedback;
    guessEl.focus();
    
}
let z = 0;
function MakeGuess(){
    if(start){
    
        guess = guessEl.value.toLowerCase();
        guessEl.value = "";
        makeTemp();
        indicies = []

        for(let letter of guess){
            if(start){
                // If youve already guessed a letter once it will mark it wrong if you guess it again.
                if(letterInWord(letter, temp)[0] != -1 && guess.length<=1){
                    increaseFrame();
                    feedback = "You've already guessed that letter!";
                    feedbackEl.innerHTML = feedback;
                    indicies = [];
                    continue;
                }

                // problem possible (if letter is in word but guess is lorger than 1)
                if(indicies[0] != -1 && guess.length>1){
                    indicies = [];
                    continue;
                }
                indicies=[];

                // if you guess right
                if(letterInWord(letter,spAnswer)[0] != -1){
                    feedback = "That guess is correct";
                    feedbackEl.innerHTML = feedback;
                    fillWord();
                    z += indicies.length;
                    indicies=[];
                    
                    if(answer.length === z){
                        feedback = "You Win!! <br>Press START to play again!";
                        feedbackEl.innerHTML = feedback;
                        feedback = ''
                        start = false;
                    }

                // if you guess wrong
                }else{
                    WrongGuesses(letter);
                }
                indicies=[];
            }            
        }

        
            
    }            
    guessEl.focus();   
    indicies=[];
}


// if there is a space in the answer replace it with the break
// char but only in the guessSpaces variable where that space is,
// keep that space throught modifying the guessSpaces 
// element/variable





 // check if guess is in the word





// decide weather to move to next frame or not

    //frame loop
    // if(/*guess is incorrect*/){
    //     if (framex <3) framex++
    //     else if(framey == 1 && framex > 2){
    //         framey = 0
    //         framex = 0
    //     }
    //     else{
    //         framex = 0
    //         framey = 1
    //     }
//     }else{
//         /* display correct guess on under scores */
//     }
//     gameFrame++
//     //requestAnimationFrame(animate);
// }
// animate();






        // if(isEven(Math.floor(y/400))){
        //     x++;
        // }else{
        //     x--
        // }
        // y++

        // ctx.fillRect(100,50,100,100);
    // if (x===-1500){
    //     y=y-1000
    // }else{
    //     x=x-500;
    // }
    