console.log("insanity check");

let highScore = 0;
let compPattern = [];
let round = 1;


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
         interval += 1000;
      }
   }

   // computer turn:
   const compTurn = () => {
      window.removeEventListener('click', onClick)
      let interval = 500;
      toggleModal()
      compPatternPicker();
      lightUpCompPattern(interval);
      setTimeout(()=>{
         toggleModal()
      },(interval + 1000 * compPattern.length))
      window.addEventListener('click', onClick)
      
   }

   // user's turn:
   // -as user selects each section, check it against the corrosponding index in compPattern
   // figure out which section the user has selected.

   // -if they don't match, trigger a "game over" modal with a "play again" button
   // -increment user score

   // const userTurn = () => {
   //    // adds event listener to sections
   //    window.addEventListener('click', onClick)
   //    console.log('user turn')
   // }

   // Figures out which section was clicked and compares it to the index in the compPattern. If it doesn't match, the game is over.
   const onClick = (event) => {
      if (event.target.nodeName === 'SECTION') {
         let clicked = parseInt(event.target.id)
         console.log('clicked section:', clicked)
         lightUpSection(clicked, 200)
         if (clicked !== compPatternDummy[round - 1]) {
            console.log("Game over!!!!")
         } else console.log("Next round")
         userScore++;
         updateScores()
      }
   };
   const updateScores = ()=>{
      let showScore = document.getElementById('userScore');
      showScore.innerText=`Score: ${userScore}`
      highScore = Math.max(userScore, highScore)
      let showHighScore = document.getElementById('highScore');
      showHighScore.innerText=`High Score: ${highScore}`
   }


   // game:
   // -reset compPattern to empty array, userCurrentScore to 0;
   // -keep repeating rounds until the user makes a mistake
   //
// end of game()
// }

