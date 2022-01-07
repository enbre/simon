console.log("insanity check");

let highScore = 0;

// const game = () => {
// game variables:
let compPattern = [];
let userScore = 0;
let count = 0;
let base = 1000;


// each round, the computer pattern gets one digit longer using the digits 0-3 
const compPatternPicker = () => {
   let newSelectIDX = Math.floor(Math.random() * 4)
   compPattern.push(newSelectIDX)
}

const toggleLight = (idx) => {
   let selection = document.getElementById(`${idx}`)
   selection.classList.toggle('lit')
}
// not currently using this, but would like to figure out why ternary doesn't work:
// const toggleModal = () => {
//    let selection = document.getElementById('compTurnModal')
//    console.log('display:',selection.style.display)
//    selection.style.display = 'none' | '' ? 'flex' : 'none'
// }

// -light up and turn off one game section
const lightUpSection = (idx, interval) => {
   setTimeout(() => {
      toggleLight(idx)
      // console.log('on',idx)
   }, interval)
   setTimeout(() => {
      toggleLight(idx)
      // console.log('off', idx)
   }, interval + base/2)
}
// light up each section in compPattern
const lightUpCompPattern = (interval) => {
   for (let i in compPattern) {
      lightUpSection(compPattern[i], interval)
      interval += base;
   }
   console.log('compPattern', compPattern)
}

// computer turn:
const compTurn = () => {
   // disable user from clicking
   window.removeEventListener('click', userClick)
   // reset timing variable
   interval = 500;
   // remove start button
   let start = document.getElementById('start')
   start.style.display='none'
   // dim background
   // toggleModal()
   // let selection = document.getElementById('compTurnModal')
   // selection.style.display = 'flex'
   changeGameStatus("Computer's turn")
   // add new index to compPattern
   compPatternPicker();
   // light up all sections in compPattern
   lightUpCompPattern(interval);
   // remove dim background after whole pattern has run
   setTimeout(() => {
      // toggleModal()
      // selection.style.display = 'none'
      changeGameStatus("Your turn")
   }, (interval + base * compPattern.length))
   console.log('end of comp turn')
   userTurn()
}

const changeGameStatus = (input) => {
   const status = document.getElementById('gameStatus')
   status.innerText = input
}

const userClick = (event) => {
   if (event.target.nodeName === 'SECTION') {
      let clicked = parseInt(event.target.id)
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
         console.log('end of user turn')
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
   console.log("Game Over!! Poop!!")
   let selection = document.getElementById('gameOverModal')
   selection.style.display = 'flex'
}

const newGame = () => {
   let selection = document.getElementById('gameOverModal')
   selection.style.display = 'none'
   changeGameStatus("Welcome to Simon!")

   userScore = 0;
   compPattern = [];
   updateScores()
   compTurn()
}

// game:
// -reset compPattern to empty array, userCurrentScore to 0;
// -keep repeating rounds until the user makes a mistake
//
// end of game()
// }