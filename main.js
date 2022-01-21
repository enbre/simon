console.log("insanity check");

let highScore = 0;

// const game = () => {
// game variables:
let compPattern = [];
const startPattern = [0,1,3,2];
let userScore = 0;
let count = 0;
let base = 1000;
let globalIntervalId = '';


// each round, the computer pattern gets one digit longer using the digits 0-3 
const compPatternPicker = () => {
   let newSelectIDX = Math.floor(Math.random() * 4)
   compPattern.push(newSelectIDX)
}

const toggleLight = (idx) => {
   let selection = document.getElementById(`${idx}`)
   selection.classList.toggle('lit')
}
// -light up and turn off one game section
const lightUpSection = (idx, interval) => {
   let intervalId = setInterval(() => {
      toggleLight(idx)
      playSound(idx)
      setTimeout(() => {
         toggleLight(idx)
      }, base/2)
   }, interval )
   globalIntervalId = intervalId
   // console.log(globalIntervalId, intervalId)
   setTimeout(()=> {clearInterval(intervalId)}, interval)
   console.log(intervalId)
}
// light up each section in compPattern
const lightUpCompPattern = (interval) => {
   for (let i in compPattern) {
      lightUpSection(compPattern[i], interval)
      interval += base;
   }
   console.log('compPattern:', compPattern, 'interval:', interval)
}

const playSound = (idx) => {
   let mySound = new Audio(`./assets/sounds/beep${idx}.mp3`)
   mySound.play();
}

// computer turn:
const compTurn = () => {
   // disable user from clicking
   window.removeEventListener('click', userClick)
   // reset timing variable
   interval = 500;
   // hide start button
   let start = document.getElementById('start')
   start.style.visibility='hidden'
   changeGameStatus("Computer's turn")
   // add new index to compPattern
   compPatternPicker();
   // light up all sections in compPattern
   lightUpCompPattern(interval);
   setTimeout(() => {
      changeGameStatus("Your turn")
   }, (interval + base * compPattern.length))
   // console.log('end of comp turn')
   userTurn()
}

const changeGameStatus = (input) => {
   const status = document.getElementById('gameStatus')
   status.innerText = input
}

const userClick = (event) => {
   if (event.target.nodeName === 'SECTION') {
      let clicked = parseInt(event.target.id)
      console.log(clicked)
      if (clicked !== compPattern[count]) {
         console.log("count:", count, 'compPattern:', compPattern)
         gameOver()
         return
      }
      count++;
      lightUpSection(clicked, base/4)
      if (compPattern.length === count) {
         console.log('next round')
         userScore++;
         updateScores()
         setTimeout(() => {
            compTurn()
         }, base)
         // console.log('end of user turn')
         return;
      }
   }
}

const userTurn = () => {
   // reset counter to zero
   count = 0;
   // allows user to click
   window.addEventListener('click', userClick)
};

const updateScores = () => {
   let showScore = document.getElementById('userScore');
   showScore.innerText = `Score: ${userScore}`
   highScore = Math.max(userScore, highScore)
   let showHighScore = document.getElementById('highScore');
   showHighScore.innerText = `High Score: ${highScore}`
}

const gameOver = () => {
   console.log("Game Over!! Poop!!", globalIntervalId)

   clearInterval(globalIntervalId)
   let selection = document.getElementById('gameOverModal')
   selection.style.display = 'flex'
   let mySound = new Audio(`./assets/sounds/game_over.mp3`)
   mySound.play();
}
const newGame = () => {
   let selection = document.getElementById('gameOverModal')
   selection.style.display = 'none'

   userScore = 0;
   compPattern = [];
   updateScores()
   setTimeout(() => {
      compTurn()
   },interval)
}

// game:
// -reset compPattern to empty array, userCurrentScore to 0;
// -keep repeating rounds until the user makes a mistake
//
// end of game()
// }