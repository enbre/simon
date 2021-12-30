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
   let selection = document.getElementById('myModal')
   selection.classList.toggle('modal')
}

// -light up and turn off one game section
const lightUpSection = (idx, interval) => {
   setTimeout(() => {
      toggleLight(idx)
   }, interval)
   setTimeout(() => {
      toggleLight(idx)
   }, interval + 500)
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

// user's turn:
// -as user selects each section, check it against the corrosponding index in compPattern
// -if they don't match, trigger a "game over" modal with a "play again" button
// -increment user score

// Figures out which section was clicked and compares it to the index in the compPattern. If it doesn't match, the game is over.

const userClick = (event) => {
   // only 'SECTION's are clickable
   if (event.target.nodeName === 'SECTION') {
      // figure out which section the user has selected.
      console.log(compPattern,"compPattern[count]:", compPattern[count], 'count:',count)
      // count++;
      let clicked = parseInt(event.target.id)
      // console.log('clicked section:', clicked); 


      if (clicked !== compPattern[count]) {
         console.log("count:", count, 'compPattern:', compPattern)
         gameOver()
         return
      }
      if (compPattern.length === count) {
         console.log('next round')
         setTimeout(() => {
            compTurn()
         }, 1500)
         // }
         console.log('end of user turn')
      }
      lightUpSection(clicked, 200)
      count++;
      userScore++;
      updateScores()
   }

}

const userTurn = () => {
   // reset counter to zero
   count = 0;
   // enable user to click
   window.addEventListener('click', userClick )
      // for (let i = 0;i<compPattern.length;i++) {
         console.log('count:', count, "compPattern Length:",compPattern.length)
         // increment userScore and update current and high scores on screen
         userScore++;
         updateScores()
         // once user has matched the entire computer pattern, their turn is over
         // if (compPattern.length === count) {
         //    console.log('next round')
         //    setTimeout(() => {
         //       compTurn()
         //    }, 1500)
         //    // }
         //    console.log('end of user turn')
         // }
      // }
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
   let selection = document.getElementById('myModal')
   selection.classList.add('modal-game-over')
   let gameStatus = document.getElementById('gameStatus');
   gameStatus.innerText = 'Game Over!!!'
}

const newGame = () => {
   let selection = document.getElementById('myModal')
   selection.classList.remove('modal-game-over')
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