console.log("insanity check");
// let body = window.document.getElementsByTagName("body")[0];
// var document;
let userHighScore = 0;
let compPattern = []

const game = () => {
   // game variables:
   let compPatternDummy = [2,1,0,0,3,0,1], // yellow, red, green, green, blue, green, red
      // userPattern = [],
      userCurrentScore = 0;
   // round: 
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
      setTimeout(() =>{
         selection.classList.add("lit");
      },600);
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
   // -if they don't match, trigger a "game over" modal with a "play again" button
   // -increment user score

   // game:
   // -reset compPattern to empty array, userCurrentScore to 0;
   // -keep repeating rounds until the user makes a mistake
   // -userHighScore = Math.max(userCurrentScore, userHighScore)
}

let compPatternDummy = [2,1]
// let compPatternDummy = [2,1,0,0,3,0,1]

const lightUpSection = (idx) => {
   let selection = document.getElementById(`section-${idx}`)
   setTimeout(() =>{
      selection.classList.add("lit");
      console.log('add',selection)
   },300);
   setTimeout(() => {
   console.log('remove',selection)
   selection.classList.remove("lit");
   }, 2000);
   
}   
const lightUpSectionRemove = (idx) => {
   let selection = document.getElementById(`section-${idx}`)
      setTimeout(() => {
      console.log('remove',selection)
      selection.classList.remove("lit");
   }, 2000);
}   



const compTurn = () => {
   for (let i in compPatternDummy) {
      console.log('test', i, compPatternDummy[i])
      // setTimeout(()=>{

         lightUpSection(compPatternDummy[i])
      // },1000)
      // setTimeout(() => {
         // lightUpSectionRemove(compPatternDummy[i])

      // },2000)
   }
}