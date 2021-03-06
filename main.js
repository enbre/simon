console.log("insanity check");

let highScore = 0;

// const game = () => {
// game variables:
let compPattern = [];
const startPattern = [0, 1, 3, 2];
let userScore = 0;
let count = 0;
let base = 1000;
let globalInterval = 0;
let isMuted = false;
let sound = "beep";
let isBeep = true;


// each round, the computer pattern gets one digit longer using the digits 0-3 
const compPatternPicker = () => {
   let newSelectIDX = Math.floor(Math.random() * 4)
   compPattern.push(newSelectIDX)
}

const toggleLight = (idx) => {
   let selection = document.getElementById(`${idx}`)
   selection.classList.toggle('lit')
}
// light up and turn off one game section
const lightUpSection = (idx, interval) => {
   let intervalId = setInterval(() => {
      toggleLight(idx)
      playSound(idx)
      setTimeout(() => {
         toggleLight(idx)
      }, base / 2)
   }, interval)

   setTimeout(() => {
      clearInterval(intervalId)
   }, interval)
}
// light up each section in compPattern
const lightUpCompPattern = (interval) => {
   for (let i in compPattern) {
      lightUpSection(compPattern[i], interval)
      interval += base;
      // allow access to incremented interval outside of function:
      globalInterval = interval
   }
}

document.getElementById("mute").onclick = () => {
   isMuted = !isMuted;
}; 

document.getElementById("sounds").onclick = () => {
   let soundType = document.getElementById("soundType")
   isBeep = !isBeep
   soundType.innerText = (isBeep ? 'BEEPS': 'FARTS')
   sound = (isBeep ? "beep":"fart");
}; 

const playSound = (idx) => {
   let mySound = new Audio(`./assets/sounds/${sound}${idx}.mp3`);
   if (!isMuted ) mySound.play();
}
// computer turn:
const compTurn = () => {
   // disable user from clicking
   window.removeEventListener('click', userClick)
   // reset timing variable
   interval = 500;
   // hide start button
   let start = document.getElementById('start')
   start.style.display = 'none'
   changeGameStatus("Computer's turn")
   // add new index to compPattern
   compPatternPicker();
   // light up all sections in compPattern
   lightUpCompPattern(interval);
   setTimeout(() => {
      changeGameStatus("Your turn")
   }, (interval + base * compPattern.length))
   userTurn()
}

const changeGameStatus = (input) => {
   const status = document.getElementById('gameStatus')
   status.innerText = input
}

const userClick = (event) => {
   if (event.target.nodeName === 'SECTION') {
      let clicked = parseInt(event.target.id)
      if (clicked === compPattern[count]) {
         count++;
         lightUpSection(clicked, base / 4)
         if (compPattern.length === count) {
            console.log('next round')
            userScore++;
            updateScores()
            setTimeout(() => {
               compTurn()
            }, base)
         }
      } else {
         gameOver()
      }
   }
}

const userTurn = () => {
   // reset counter to zero
   count = 0;
   // allows user to click

   setTimeout(()=> {
      window.addEventListener('click', userClick)},globalInterval)
};

const updateScores = () => {
   let showScore = document.getElementById('userScore');
   showScore.innerText = `Score: ${userScore}`
   highScore = Math.max(userScore, highScore)
   let showHighScore = document.getElementById('highScore');
   showHighScore.innerText = `High Score: ${highScore}`
}

const gameOver = () => {
   console.log("Game Over!! Poop!!")
   let selection = document.getElementById('gameOverModal')
   selection.style.display = 'flex'
   let mySound = new Audio(`./assets/sounds/game_over.mp3`)
   if (isMuted === false) mySound.play();
}
const newGame = () => {
   let selection = document.getElementById('gameOverModal')
   selection.style.display = 'none'
   userScore = 0;
   compPattern = [];
   updateScores()
   setTimeout(() => {
      compTurn()
   }, base)
}

// game:
// -reset compPattern to empty array, userCurrentScore to 0;
// -keep repeating rounds until the user makes a mistake
//
// end of game()
// }