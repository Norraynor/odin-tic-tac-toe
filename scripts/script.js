const htmlGameboard = document.querySelector('.gameboard');
const cellArray = htmlGameboard.querySelectorAll('.cell');
const winDiv = document.querySelector('.win-text');
const winText = winDiv.querySelector('.text');
const startButton = document.querySelector('.start-button');
const resetButton = document.querySelector('.reset-button');

cellArray.forEach(cell => {
    cell.addEventListener('click', (e) => {
        let currentCellValue = null;
        let element = null;
        if (e.target === cell) {
            element = e.target;
            currentCellValue = element.children[0].textContent;            
        } else {
            element = e.target.parentNode;
            currentCellValue = element.children[0].textContent;
        }

        if (currentCellValue !== '') {
            return false;
        } else {
            //play round
            let position = element.getAttribute("index");
            gameController.playRound(position[0], position[1]);
        }
    })
});


//add logic for game status(is it on going or not?) if not then start button should allow to start if players input data and if its on going then reset button should reset board
    

startButton.addEventListener('click', (e) => {
})

resetButton.addEventListener('click', (e) => {
    gameboard.resetBoard();
    //add display reset too
})

const gameboard = (function createGameboard() {
    function createBoard(rows = 3, cols = 3) {
        const array = [];
				for (let i = 0; i < rows; i++) {
					array[i] = [];
					for (let j = 0; j < cols; j++) {
						array[i][j] = null;
					}
				}
				return array; 
    }
    let board = createBoard();
    function markBoard(posX,posY,player) {
        console.log(board);
        board[posX][posY] = player;
    }
    function getBoard() {
        return board;
    }
    function getCell(posX,posY) {
        return board[posX][posY];
    }
    function resetBoard() {
        return board = createBoard();
    }
    function boardFull() {
        let anyNull = board.filter(arr => arr.filter(cell => cell === null).length).length;
        if (anyNull === 0) {
            return true;
        } 
        return false;
    }
    return { markBoard, getBoard, resetBoard, getCell, boardFull };
})();


const playerOne = createPlayer("bob", "X");
const playerTwo = createPlayer("john", "O");

function createPlayer(name, marker) {
    console.log(name + ': ' + marker)
    return { name, marker };
}


//controller to manage game
const gameController = (function createController(board) {
    let round = 0;
    let onGoing = false;
    let winner = null;
    let currentPlayer = playerOne;

    function gameStatus() {        
        console.log(board.getBoard());
    }
    function changeTurn() {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
        console.log('changing turn: ' + currentPlayer.name);
    }

    function playRound(posX, posY) {
        let boardCell = board.getBoard()[posX][posY];
        if (!checkWin()) {
            if (boardCell === null) {
                board.markBoard(posX, posY, currentPlayer);
                round++;
                displayController.updateDisplay(posX, posY);
            }            
        }
        if (checkWin()) {
            //end game
            displayController.updateWinText(true);
            console.log("end game. Winner: " + winner.name);
        } else {
            if (!gameboard.boardFull()) {
                changeTurn();
                displayController.updateWinText(false);                    
            } else {                
                displayController.updateWinText(false,true);    
            }
        }
    }

    //need to add null checking
    const allEqual = (arr) => arr.every((v) => {
        if (arr[0] !== null) {
            return v === arr[0];
        }
        return false;
    });

    function checkWin() {
			let currentBoard = board.getBoard();
			let checkValue = null;
        if (allEqual(currentBoard[0])) {
                winner = currentBoard[0][0]
				return true;
			}
			if (allEqual(currentBoard[1])) {
                winner = currentBoard[1][0];
				return true;
			}
			if (allEqual(currentBoard[2])) {
                winner = currentBoard[2][0];
				return true;
			}

			
            checkValue = currentBoard[0][0];
            if (checkValue !== null) {
                // X o o
                // o X o
                // o o X
                if (
                    currentBoard[0][0] === checkValue &&
                    currentBoard[1][1] === checkValue &&
                    currentBoard[2][2] === checkValue
                ) {
                    winner = currentBoard[0][0];
                    return true;
                }
                // X o o
                // X o o
                // X o o

                if (
                    currentBoard[0][0] === checkValue &&
                    currentBoard[1][0] === checkValue &&
                    currentBoard[2][0] === checkValue
                ) {
                    winner = currentBoard[0][0];
                    return true;
                }
            }
            // o X o
            // o X o
            // o X o
            checkValue = currentBoard[0][1];
            if (checkValue !== null) {
                if (
                    currentBoard[0][1] === checkValue &&
                    currentBoard[1][1] === checkValue &&
                    currentBoard[2][1] === checkValue
                ) {
                    winner = currentBoard[0][1];
                    return true;
                }
            }			

            checkValue = currentBoard[0][2];
            if (checkValue !== null) {
                // o o X
                // o o X
                // o o X
                if (
                    currentBoard[0][2] === checkValue &&
                    currentBoard[1][2] === checkValue &&
                    currentBoard[2][2] === checkValue
                ) {
                    winner = currentBoard[0][2];
                    return true;
                }
                // o o X
                // o X o
                // X o o
                if (
                    currentBoard[0][2] === checkValue &&
                    currentBoard[1][1] === checkValue &&
                    currentBoard[2][0] === checkValue
                ) {
                    winner = currentBoard[0][2];
                    return true;
                }
            }	
			
			return false;
    }
    
    function getCurrentPlayer() {
        return currentPlayer;
    }
    function getWinner() {
        return winner;
    }
    //control win conditions
    //manage gameboard
    return { gameStatus, playRound, getCurrentPlayer, getWinner };
})(gameboard);

const displayController = (function (board) {
    function updateDisplay(posX, posY) {
        let currentBoard = board.getBoard();
        cellArray.forEach((cell, index) => {
            position = cell.getAttribute('index');
            if (position[0] == posX && position[1] == posY) {
                console.log({ position });
                cell.children[0].textContent = gameController.getCurrentPlayer().marker;
            }
        })
    }
    function updateWinText(win = false, draw = false) {        
        if (!draw) {
            if (!win) {
                winText.textContent = "Turn: " + gameController.getCurrentPlayer().name;
            } else {
                winText.textContent = "Winner: " + gameController.getWinner().name;
            }            
        } else {
            winText.textContent = 'Its a draw';
        }
    }
    return { updateDisplay, updateWinText };
})(gameboard);

//player > plays round > next turn > opponent > plays round

//test
//gameboard.markBoard(1, 1, playerOne);
gameController.gameStatus();