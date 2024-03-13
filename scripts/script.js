const htmlGameboard = document.querySelector('.gameboard');
const cellArray = htmlGameboard.querySelectorAll('.cell');
console.log(cellArray);
cellArray.forEach(cell => {
    cell.addEventListener('click', (e) => {
        currentCellValue = null;
        if (e.target === cell) {
            currentCellValue = e.target.children[0].textContent;            
        } else {
            currentCellValue = e.target.parentNode.children[0].textContent;
        }
        //if empty then play and set value else ignore
        
    })
});

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
    return { markBoard, getBoard, resetBoard, getCell };
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
    let turn = false;
    let winner = null;
    let players = [playerOne, playerTwo];
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
        console.log(boardCell);
        if (boardCell === null) {
            board.markBoard(posX, posY, currentPlayer);
            round++;            
        }
        board.getBoard();
        if (checkWin()) {
            //end game
            console.log('end game. Winner: ' + winner.name);
        } else {
            changeTurn();            
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
    //control win conditions
    //manage gameboard
    return { gameStatus, playRound };
})(gameboard);

//player > plays round > next turn > opponent > plays round

//test
gameboard.markBoard(1, 1, playerOne);
gameController.gameStatus();