//🧱 3. Golden rule (VERY important)

//Before coding, you should ALWAYS be able to answer:

//What data do I store?
//What actions exist?
//Who owns each action?
//What is the step-by-step flow?

//If any of these are unclear → don’t code yet.




//🧠 5. Simple reusable template (use this always)

//Copy this mentally:

//1. Goal:
// build a 3x3 x o game where the game ends when someone wins or tie

//(one sentence)

//2. Data:
//player names
//status 
//whose turn
//did game end
//markers that belong to each player 

//(what exists?)

//3. Actions:
//reset game after it finishs
//update empty places when it gets clicked by user
//places that are filled don't  get replaced
//show score and the final result of who won and lost or tied

//(verbs)

//4. Modules:
//three sections :
//1.gameboard control  
//2.playerboard hold names and information
//3.gamedisplay control game logic and rules
//4.uidisplayer connect html and js with DOM

//(who owns what?)

//5. Flow:
// user click start button
// he enter the game
//start by clickingg on empty spaces
//by clicking on one of the boxs his turns end and can't perform more than once at a time  
//the other player turn begin
//this continoue until game fiinnish in someone winning or tie
//restart button appear to restart the game
//game restarts and gets updated 

//(step-by-step story)

//1. What THINGS exist?

//(Data)

//Example:

//board
//player
//score
//2. What can those things DO?

//(Actions)

//Example:

//place marker
//reset
//switch player
//3. Who should do each action?

//(Ownership)

//Example:

//Gameboard → place marker
//GameController → switch player
//DisplayController → render board
//4. In what order do things happen?

//(Flow)

//Example:

//Start

//↓

//Click

//↓

//Update board

//↓

//Check winner

//↓

//Switch player

//5. How do the objects communicate?

//(Architecture)

//Example:

//Display → GameController → Gameboard → Display


// THE ARCHETICHER OF MAKEMOVE FUNCTION //

//check first if the game ended






//makeMove
  //↓
//update board
 // ↓
//winner?
  //├── yes → stop game
  //└── no
      //  ↓
      //tie?
        //├── yes → stop game
        //└── no
            //  ↓
          //switch player