console.log("insanity check");
// let body = window.document.getElementsByTagName("body")[0];
// var document;
let userHighScore = 0;
let compPattern = []
let round = 1;


const game = () => {
   // game variables:
   let compPatternDummy = [2, 1, 0, 0, 3, 0, 1], // yellow, red, green, green, blue, green, red
      // userPattern = [],
      userCurrentScore = 0;
   // round: 
   let round = 1;
   // - computer's turn
   // - user's turn

   // each round, the computer pattern gets one digit longer using the digits 0-3 
   const compPatternPicker = () => {
      let newSelectIDX = Math.floor(Math.random() * 4)
      compPattern.push(newSelectIDX)
      // console.log('after', newSelectIDX, compPatternDummy)
   }
   // -light up and turn off one game section
   const lightUpSection = (idx) => {
      let selection = document.getElementById(`section-${idx}`)
      setTimeout(() => {
         selection.classList.add("lit");
      }, 600);
      setTimeout(() => {
         selection.classList.remove("lit");
      }, 600);
   }

   // computer turn:
   const compTurn = () => {
      // -trigger the "computer's turn" modal
      compPatternPicker()
      // compPatternPicker()
      // -light up and turn off each game section in order of compPattern
      console.log('pattern', compPatternDummy)
      for (let i in compPatternDummy) {
         lightUpSection(compPatternDummy[i])
      }
      // -remove the "computer's turn" modal
   }
   compTurn()

   // user's turn:
   // -as user selects each section, check it against the corrosponding index in compPattern
   // figure out which section the user has selected.

   // -if they don't match, trigger a "game over" modal with a "play again" button
   // -increment user score

   // game:
   // -reset compPattern to empty array, userCurrentScore to 0;
   // -keep repeating rounds until the user makes a mistake
   // -userHighScore = Math.max(userCurrentScore, userHighScore)
}






let compPatternDummy = [2, 3, 0]
// let compPatternDummy = [2,2,3,3,0,0]
// let compPatternDummy = [2,3,0,2,3,0]
// let compPatternDummy = [2,1,0,0,3,0,1]

const lightUpSection = (idx) => {
   let selection = document.getElementById(`${idx}`)
   // selection.classList.toggle('lit')
   let increment = 600;
   setTimeout(() => {
      selection.classList.toggle("lit");
      console.log('toggle on', selection)
   }, increment);

   // setTimeout(() => {
   //    selection.classList.toggle("lit");
   //    console.log('toggle off', selection)
   // }, increment*4);

}
const lightUpSectionRemove = () => {
   let selection = document.querySelector('.lit')
   console.log('remove', selection)
   selection.classList.remove("lit");
}

const compTurn = () => {
   for (let i in compPatternDummy) {
      console.log('test', i, compPatternDummy[i])
      lightUpSection(compPatternDummy[i])
      // lightUpSection(compPatternDummy[i])
      setTimeout(() => {
         lightUpSectionRemove()
      }, 2500)
   }
}
// Figures out which section was clicked and compares it to the index in the compPattern. If it doesn't match, the game is over.
const onClick = (event) => {
   if (event.target.nodeName === 'SECTION') {
      let clicked = parseInt(event.target.id)
      console.log('clicked section:', clicked)

      if (clicked !== compPatternDummy[round-1]){
         console.log("Game over!!!!")
      }
      else console.log("Next round")
   }
};
window.addEventListener('click', onClick)
