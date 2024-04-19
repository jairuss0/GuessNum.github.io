const display = document.getElementById("displayInput");

const min = 1;
const max = 50;
//let randomNum = Math.floor(Math.random() * (max - min)) + min;
let randomNum = Math.floor(Math.random() * max) + min;

let playerAttempts = 0;
let playerPoints = 0;

// const maxAttempts = 3;
function UserInput(inputValue) {
  display.value += inputValue; // will display the user guess number in the input
}
function ClearGuess() {
  display.value = ""; // will clear the user guess value in input
}

// audios
var cashSound = new Audio('Sounds/plusPoints.mp3');
var yameteSound = new Audio('Sounds/yamete.mp3');
const clueMessage = document.querySelector(".clue-message");
const randomNum_clue = document.querySelector(".random-num-clue");

// -- this click function is for the guess button
function UserGuess() {
  if (Number(display.value) == randomNum) {
    clueMessage.classList.add("CmessageIn");
    playerPoints++;
    playerAttempts++;
    remainingTime = 15;

    clueMessage.innerHTML = "1+ YOU GUESSED THE NUMBER (" + randomNum + ")";
    clueMessage.style.color = "#59CE8F";
    cashSound.play();
    

    clueMessage.addEventListener("animationend", () => {
      clueMessage.classList.remove("CmessageIn");
    });

    randomNum = Math.floor(Math.random() * max) + min;
    randomNum_clue.textContent = randomNum;
    display.value = "";

  } else if (display.value == "") {
    clueMessage.classList.add("CmessageIn");
    clueMessage.innerHTML = "PICK A NUMBER FIRST";
    clueMessage.style.color = "#F05454";

    yameteSound.play();

    clueMessage.addEventListener("animationend", () => {
      clueMessage.classList.remove("CmessageIn");
    });
  } else if (
    Number(display.value) > randomNum &&
    Number(display.value) <= max &&
    Number(display.value) >= min &&
    display.value != ""
  ) {
    clueMessage.classList.add("CmessageIn");

    clueMessage.innerHTML = "GO LOWER!";
    clueMessage.style.color = "#59CE8F";

    //yameteSound.play();

    clueMessage.addEventListener("animationend", () => {
      clueMessage.classList.remove("CmessageIn");
    });

    playerAttempts++;
  } else if (
    Number(display.value) < randomNum &&
    Number(display.value) <= max &&
    Number(display.value) >= min &&
    display.value != ""
  ) {
    clueMessage.classList.add("CmessageIn");

    clueMessage.innerHTML = "GO HIGHER!";
    clueMessage.style.color = "#59CE8F";

    //yameteSound.play();

    clueMessage.addEventListener("animationend", () => {
      clueMessage.classList.remove("CmessageIn");
    });
    playerAttempts++;
  }
  else{
    clueMessage.classList.add("CmessageIn");

    clueMessage.innerHTML = "OUT OF BOUNDS!";
    clueMessage.style.color = "#F05454";
    
    yameteSound.play();

    clueMessage.addEventListener("animationend", () => {
      clueMessage.classList.remove("CmessageIn");
    });
    
  }
}

// -- function for the timer before the game starts
const countdownBfr = document.querySelector(".boxTmr");
const container_tmr = document.querySelector(".timer-before-str");
let timer_bfr_strs = 3;
isStarted = false;

function GameTimer_bfr_start() {
  if (timer_bfr_strs > 0) {
    countdownBfr.style.setProperty("--animate-duration", "1s");
    countdownBfr.classList.add("animate__animated", "animate__backInDown");
    countdownBfr.style.animationIterationCount = "4";
    countdownBfr.textContent = timer_bfr_strs;

    timer_bfr_strs--;
    setTimeout(GameTimer_bfr_start, 1000);
  } else {
    countdownBfr.style.color = "#6ff886";
    countdownBfr.textContent = "Guess!";
    setTimeout(function () {
      GameTimerBar(); // game timer will start after the 5 seconds
      container_tmr.remove(); // remove the following timer bfr start menu after 1sec
      console.log("Game Started");
      isStarted = true;
    }, 1000);
  }
}

function StartGame() {

  document.getElementById("start").disabled = true;

  gameBg = document.querySelector(".gamebg");

  gameMenu = document.querySelector(".menu-container");
  gameMenu.classList.toggle("close-menu");

  gameBg.classList.toggle("show-gameplay");
  gameBg.classList.add("gameplay-container");

  gameOverMenu = document.querySelector(".game-over-modal");
  gameOverMenu.classList.toggle("close-G-over");

  setTimeout(GameTimer_bfr_start, 1000); // countdown before guessing

  randomNum_clue.textContent = randomNum; // initialize and displays the random number
}

// -- function for the progress timer while playing the game
const countdownEl = document.querySelector(".countdown");
const progressBar = document.querySelector(".progress");

let remainingTime = 15; // seconds
let totalTime = remainingTime;

function GameTimerBar() {
  start(); // player timer starts
  if (remainingTime > 0) {
    countdownEl.style.setProperty("--animate-duration", "1s");
    countdownEl.classList.add("animate__animated", "animate__headShake");
    countdownEl.style.animationIterationCount = "infinite";
    countdownEl.textContent = remainingTime;

    // update progress bar
    progress = ((totalTime - remainingTime) / totalTime) * 100;
    console.log(progress);
    progressBar.style.width = `${progress}%`;

    remainingTime--;
    setTimeout(GameTimerBar, 1000);
    // update countdown timer
  } else {
    // countdown finished
    progressBar.style.width = "100%";
    countdownEl.textContent = "Time's up!";
    countdownEl.style.animationIterationCount = "";
    GameOver();
  }
}

// TIME PLAYER LASTED 
const timePlayerLasted = document.getElementById("gameplay-time");
// player lasted time
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

var speedRunAudio = new Audio('Sounds/dream.mp3');
var failedAudio = new Audio('/Sounds/failed.mp3');
// functions for the player timer while playing or isnt game over
function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 10);
    isRunning = true;
    speedRunAudio.play(); 
    speedRunAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
  }
}

function stop() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    speedRunAudio.pause();
    speedRunAudio.currentTime = 0;
    failedAudio.play();

  }
}

function reset() {
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  timePlayerLasted.textContent = "00:00:00:00";
  failedAudio.pause();
  failedAudio.currentTime = 0;
}

function update() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  milliseconds = String(milliseconds).padStart(2, "0");

  timePlayerLasted.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
//// -- ends here

// function if the game is over
const buttons = document.querySelectorAll(".btn");
function GameOver() {
  stop(); // stop the player timer
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
    console.log(buttons);
  }
  gameOverMenu.classList.toggle("show-G-over");
  document.getElementById("player-attempts").textContent = playerAttempts;
  document.getElementById("player-points").textContent = playerPoints;
  timePlayerLasted.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// reload the document if user wants to play again
function PlayAgain() {
  reset(); // resets the timer

  location.reload();
}


// KEYBOARD USER EVENTS
// prevents user to inspect element the document

document.onkeydown = function(e) {
    if(event.keyCode == 123) {
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.key == 'I'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.key == 'J'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.key == 'U'.charCodeAt(0)){
    return false;
    }
}

document.onkeyup = function (e) {
  //backspace
  if (e.key == "Backspace") {
    display.value = display.value.slice(0, -1);
  } else {
   
    numkeys1 = [0,1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (i = 0; i < numkeys1.length; i++) {
      if (e.key == numkeys1[i]) {
        display.value += i;
      } else if (e.key == numkeys1[i]) {
        display.value += i;
      }
    }
  }

  if(e.key == "Enter"){
    if(isStarted){
      UserGuess();
    }
  }
};

var gagoKaba = new Audio('Sounds/gagoKaba.mp3');
const bluff = document.querySelector(".bluff");
const originalText = bluff.innerText;

bluff.addEventListener('mouseover', function(){
  bluff.textContent = "ULOL";
  gagoKaba.play();
})

bluff.addEventListener('mouseout', function(){
  bluff.textContent = originalText;
})






// ----- to do's ----
// create a menu for game-over
// create a timer while game is not times up for the game over player stats
// speed the timer if the guess is wrong (still have to decide)

/* creat player stats during the gameplay:
1. attempts 
2. right guesses 
3. wrong guesses 
4. the time gameplay
5. change the hint display number into rolling numbers
6. create a scoreboard
7. refactor everything if possible
8. implement user keyboard event
9. create local high scores ask their name 
10. create random number effects rolling


 -- MAKE SURE LEAVE COMMENTS ON EVERY CODE BLOCK ---
*/
