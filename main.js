console.log("insanity check");

let highScore = 0;

// const game = () => {
// game variables:
let compPattern = [];
let userScore = 0;
let count = 0;

let compPatternDummy = [2, 1, 0, 0, 3, 0, 1] // yellow, red, green, green, blue, green, red

// each round, the computer pattern gets one digit longer using the digits 0-3 
const compPatternPicker = () => {
   let newSelectIDX = Math.floor(Math.random() * 4)
   compPattern.push(newSelectIDX)
}

const toggleLight = (idx) => {
   let selection = document.getElementById(`${idx}`)
   selection.classList.toggle('lit')
}
const toggleModal = () => {
   let selection = document.getElementById('compTurnModal')
   selection.style.display = 'none' ? 'flex' : 'none'
}

// -light up and turn off one game section
const lightUpSection = (idx, interval) => {
   setTimeout(() => {
      toggleLight(idx)
   }, interval)
   setTimeout(() => {
      toggleLight(idx)
   }, interval + 300)
}
// light up each section in compPattern- might need to rename:
const lightUpCompPattern = (interval) => {
   for (let i in compPattern) {
      lightUpSection(compPattern[i], interval)
      interval += 1000;
   }
   console.log('compPattern', compPattern)
}

// computer turn:
const compTurn = () => {
   // disable user from clicking
   window.removeEventListener('click', userClick)
   // reset timing variable
   let interval = 500;
   // remove start button
   let start = document.getElementById('start')
   start.style.display='none'
   // dim background
   toggleModal()
   // add new index to compPattern
   compPatternPicker();
   // light up all sections in compPattern
   lightUpCompPattern(interval);
   // remove dim background after whole pattern has run
   setTimeout(() => {
      toggleModal()
   }, (interval + 1000 * compPattern.length))
   console.log('end of comp turn')
   userTurn()
}

const userClick = (event) => {
   if (event.target.nodeName === 'SECTION') {
      // figure out which section the user has selected.
      console.log(compPattern, "compPattern[count]:", compPattern[count], 'count:', count)
      let clicked = parseInt(event.target.id)
      if (clicked !== compPattern[count]) {
         console.log("count:", count, 'compPattern:', compPattern)
         gameOver()
         return
      }
      count++;
      console.log('compare:', compPattern.length, count)
      if (compPattern.length === count) {
         console.log('next round')
         userScore++;
         updateScores()
         setTimeout(() => {
            compTurn()
         }, 1000)
         console.log('end of user turn')
         return;
      }
      lightUpSection(clicked, 500)
   }
}

const userTurn = () => {
   // reset counter to zero
   count = 0;
   // allows user to click
   window.addEventListener('click', userClick)
   // console.log('count:', count, "compPattern Length:", compPattern.length)
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
   // let gameStatus = document.getElementById('gameStatus');
   // gameStatus.innerText = 'Game Over!!!'
}

const newGame = () => {
   let selection = document.getElementById('gameOverModal')
   selection.style.display = 'none'
   userScore = 0;
   compPattern = [];
   compTurn()
}

// game:
// -reset compPattern to empty array, userCurrentScore to 0;
// -keep repeating rounds until the user makes a mistake
//
// end of game()
// }