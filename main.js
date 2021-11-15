console.log("insanity check");
// let body = window.document.getElementsByTagName("body")[0];
// var document;
let userHighScore = 0;

const game = () => {
   // game variables:
   const compPattern = [],
      // userPattern = [],
      userCurrentScore = 0;

   // round: 
   // - computer's turn
   // - user's turn
   // 


   // each round, the computer pattern gets one digit longer using the digits 0-3 
   const compPatternPicker = () => {
      let newSelectIDX = Math.floor(Math.random() * 4)
      compPattern.push(newSelectIDX)
      console.log('test', newSelectIDX, compPattern)
   }
   // -light up and turn off one game section
   const lightUpSection = (idx) => {
      let selection = document.getElementById(`section-${idx}`)
      selection.classList.add("lit")
      setTimeout(() => {
         selection.classList.remove("lit");
      }, 300);
   }
   
   // computer turn:
   const compTurn = () => {
      // -trigger the "computer's turn" modal
      // -add a new selection to compPattern
      compPatternPicker()
      // -light up and turn off each game section in order of compPattern

      
      for (let i in compPattern) {
         // console.log(i, compPattern[i], compPattern)
         lightUpSection(compPattern[i])
      }
      // -remove the "computer's turn" modal
   }
   
   // user's turn:
   // -as user selects each section, check it against the corrosponding index in compPattern
   // -if they don't match, trigger a "game over" modal with a "play again" button
   // -increment user score

   // game:
   // -reset compPattern to empty array, userCurrentScore to 0;
   // -keep repeating rounds until the user makes a mistake
   // -userHighScore = Math.max(userCurrentScore, userHighScore)
}
game();