const Gameboard = (() => {
    const board = [null, null, null, null, null, null, null , null, null];
    
    const getBoard = () => {
        return board;
    };

        const restart = () => {
    return board.fill(null);
    };

      const indexValidation = (index) => {
        if(index < 0 || index > 8) {
        return false;
         } else {
            return true;
        }
    }

    const update = (index, marker) => {
        if(board[index] !== null) { 
        return false;
    } 
    else {
        board[index] = marker;
        return true;
    }
    };
    
    return { restart, update, indexValidation, getBoard };
})()

const Player = (name, marker ) => {
    return {
        name,
        marker,
    };
};

const GameController = (() => {

    let playerone = Player('not named', 'X');
    let playertwo = Player('not named', 'O');   
    
   let currentPlayer = playerone;
   let gameFinished = false;
   let gameStarted = false;

   const status = document.querySelector('.status');

   let  playerScore1 = 0;  
   let playerScore2 = 0;

   let roundPlayed = 0;
   
   const winPatterns = [
    [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
   ]

   const winnerCheck = (marker) => {   
    const board = Gameboard.getBoard(); 
    for(let pattern of winPatterns) {
      const a = pattern[0];
      const b = pattern[1];
      const c = pattern[2];
   console.log(a, b, c)
      if(board[a] === marker && board[b] === marker && board[c] === marker) {
        return true;
    }}
   
   return false;
   }; 
   
   const tieCheck = () => {
    const board2 = Gameboard.getBoard();
    const nullCheck = board2.every((cell) => {
        return cell !== null;
    });
    if(nullCheck === true) {
        if(winnerCheck('X')|| winnerCheck('O')) {
        return false;
    } else {
        return true;
    }}
    else if(nullCheck === false) {
        return false;
    } else {
    return true;
   }
   };

   const switchPlayer = () => {
    if(currentPlayer === playerone) {
        return currentPlayer = playertwo;
    } else if (currentPlayer === playertwo) {
        return currentPlayer = playerone;
    }
   }
   
    const makeMove = (index) => {
       console.log(gameStarted)
        if (gameFinished === true) {
        return status.textContent = 'STATE: game finished';
        }
         else if(gameStarted === false) { 
            return 'click start to start game';
         }  else {
                     
               status.textContent = 'STATE: game in progress'    

        if(Gameboard.indexValidation(index) === true) {
            if(Gameboard.update(index, currentPlayer.marker) === true) {

                if(winnerCheck(currentPlayer.marker) === true) {
                status.textContent = `STATE: ${currentPlayer.name} won`;
                console.log('what is happening', playerScore1)
                if(currentPlayer.marker === 'X') {
                     playerScore1++;
                     roundPlayed++;
                     console.log('after increment', playerScore1)
                } else {
                     playerScore2++;
                     roundPlayed++;
                } 
                return gameFinished = true;
                        
                } 
                else if (winnerCheck(currentPlayer.marker) === false) {
                    if(tieCheck() === true) {
                        status.textContent = `STATE: it's a tie`;
                        roundPlayed++;
                        return gameFinished = true;
                    
                    }
                     else if (tieCheck() === false) {
                        switchPlayer();
                        return true;
                    } 
                  
                }
            }}
        } 
    } 
   
    const restartGame = () => {
        currentPlayer = playerone;
         gameFinished = false;  
         const board3 = Gameboard.getBoard();
         board3.fill(null)
         status.textContent = '';
         
        if (roundPlayed === 5 ) {
            playerScore1 = 0;
            playerScore2 = 0;
            roundPlayed = 0;
            gameStarted = false;
        } 
       


    }

    const startGame = (name1, name2) => {
        playerone = Player(name1, 'X');
        playertwo = Player(name2, 'O');
        currentPlayer = playerone;
        status.textContent = 'STATE: game started'; 
        return gameStarted = true;

    }
    
    return {
        playerScores1: () => playerScore1,
        playerScores2: () => playerScore2,
        roundPlayeds: () => roundPlayed,
        makeMove,
        switchPlayer,
        winnerCheck,
        tieCheck,
        getCurrentPlayer: () => currentPlayer,
        restartGame,
        startGame,
    };
   
})()  



const displayController = (() => {
    
    const player1 = document.querySelector('#player1');
    const player2 = document.querySelector('#player2');
    
    const restartBtn = document.querySelector('.restart-button');
    const startBtn = document.querySelector('.start-button');

    const boardMarkers = document.querySelectorAll('.xo');
    const currentTurn = document.querySelector('.current-turn');
    
    const xscore = document.querySelector('.xscore');
    const oscore = document.querySelector('.oscore');
    
    const roundsplayed = document.querySelector('.roundsplayed');

    const board4 = Gameboard.getBoard();
   
  startBtn.addEventListener('click', () => {
    GameController.startGame(player1.value, player2.value);
    startBtn.disabled = true;
        })
        
    boardMarkers.forEach((cell) => {
        cell.addEventListener('click', (event) => {
        let stringToNumber = event.target.id.slice(4);
        stringToNumber = Number(stringToNumber);
        
        const result = GameController.makeMove(stringToNumber);
        
        if(result === true) {

        cell.textContent = board4[stringToNumber]
        const playerName = GameController.getCurrentPlayer().name;
    currentTurn.textContent = `Current turn:${playerName}`;
    xscore.textContent = `${player1.value}: ${GameController.playerScores1()}`;
        oscore.textContent =  `${player2.value}: ${GameController.playerScores2()}`;

        const rounds = GameController.roundPlayeds();
        roundsplayed.textContent = `rounds played: ${rounds}`;
        } else {
            return false;
        }
        });

  
    })     
     

      restartBtn.addEventListener('click', () => { 
         boardMarkers.forEach((cell) => {
               
            const boardRestart = GameController.restartGame();
            startBtn.disabled = false; 
            if(GameController.roundPlayeds() === 0) {
                startBtn.disabled = false;
            }
            else {
                startBtn.disabled = true;
            } 
              cell.textContent = ''; 
        })

        
      });

     
})()
