console.log("insanity check");

let highScore = 0;
let compPattern = [];
// let round = 1;


// const game = () => {
   // game variables:
   let userScore = 0;
   let compPatternDummy = [2, 1, 0, 0, 3, 0, 1] // yellow, red, green, green, blue, green, red
      // userPattern = [],

   // round: 
   // - computer's turn
   // - user's turn

   // each round, the computer pattern gets one digit longer using the digits 0-3 
   const compPatternPicker = () => {
      let newSelectIDX = Math.floor(Math.random() * 4)
      compPattern.push(newSelectIDX)
   }

   // toggle lit class on/off
   const toggleLight = (idx) => {
      let selection = document.getElementById(`${idx}`)
      selection.classList.toggle('lit')
   }
   const toggleModal = () => {
      let selection = document.getElementById('myModal')
      selection.classList.toggle('modal')
      // console.log(selection)
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
         console.log('compPattern',compPattern)
         interval += 1000;
      }
   }

   // computer turn:
   const compTurn = () => {
      // disable user from clicking
      window.removeEventListener('click', userTurn)
      // reset timing variable
      let interval = 500;
      // dim background
      toggleModal()
      // add new index to compPattern
      compPatternPicker();
      // light up all sections in compPattern
      lightUpCompPattern(interval);
      // remove dim background after whole pattern has run
      setTimeout(()=>{
         toggleModal()
      },(interval + 1000 * compPattern.length))
      // enable user to click
      window.addEventListener('click', userTurn)
      // let count = 0;
   }

   // user's turn:
   // -as user selects each section, check it against the corrosponding index in compPattern
   // figure out which section the user has selected.

   // -if they don't match, trigger a "game over" modal with a "play again" button
   // -increment user score



   // Figures out which section was clicked and compares it to the index in the compPattern. If it doesn't match, the game is over.
   const userTurn = (event) => {
      if (event.target.nodeName === 'SECTION') {
         // let count = 0;
         let clicked = parseInt(event.target.id)
         console.log('clicked section:', clicked)
         lightUpSection(clicked, 200)
         for (let i in compPattern){
         }
         console.log('test',count)
         // if (clicked !== compPattern[count]) {
         //    console.log("count:", count, 'compPattern:', compPattern)
         //    gameOver()
         // } else 
         count++;
         userScore++;
         updateScores()
         console.log('length',compPattern.length)
         if(compPattern.length === count) {
            console.log('next round')
            setTimeout(()=>{
               compTurn()
            },1500)
         }
      }
   };





   const updateScores = ()=>{
      let showScore = document.getElementById('userScore');
      showScore.innerText=`Score: ${userScore}`
      highScore = Math.max(userScore, highScore)
      let showHighScore = document.getElementById('highScore');
      showHighScore.innerText=`High Score: ${highScore}`
   }
   const gameOver = () =>{
      console.log("Game Over!! Poop!!")
      let selection = document.getElementById('myModal')
      selection.classList.add('modal-game-over')
      let gameStatus = document.getElementById('gameStatus');
      gameStatus.innerText='Game Over!!!'

   }

   // game:
   // -reset compPattern to empty array, userCurrentScore to 0;
   // -keep repeating rounds until the user makes a mistake
   //
// end of game()
// }

