console.log("insanity check");

let userHighScore = 0;
const game = () =>{
// game variables:
   const compPattern = [],
   userPattern = [],
   userCurrentScore = 0;

// each round, the computer pattern gets one digit longer (0-3)
   const compPatternPicker = () => {
      let newSelectIDX = Math.floor(Math.random()*4)
      compPattern.push(newSelectIDX)
   }
// need to add and remove "lit" class from each section index in computer pattern
// need some way to designate when it's the computer's turn and when it's the users

}
game()