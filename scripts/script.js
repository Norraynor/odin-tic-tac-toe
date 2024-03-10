

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
        board[posX][posY] = player.marker;
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
function createPlayer(name, marker) {
    console.log(name + ': ' + marker)
    return { name, marker };
}


//controller to manage game
const gameController = (function createController(board) {
    let round = 0;
    let turn = false;
    function gameStatus() {        
        console.log(board.getBoard());
    }
    function changeTurn() {
        turn = !turn;
        console.log('changing turn: ' + turn);
    }

    //to do: remove player - it should change based on current turn
    function playRound(posX, posY, player) {
        let boardCell = board.getBoard()[posX][posY];
        console.log(boardCell);
        if (boardCell === null) {
            board.markBoard(posX, posY, player);
            round++;            
        }
        board.getBoard();
        if (checkWin()) {
            //end game
            console.log('end game');
        } else {
            changeTurn();            
        }

    }

    //need to add null checking
    const allEqual = (arr) => arr.every((v) => v === arr[0]);

    function checkWin() {
        let currentBoard = board.getBoard();
        if (allEqual(currentBoard[0])) {
            return true;
        } 
        if (allEqual(currentBoard[1])) {
            return true;
        } 
        if (allEqual(currentBoard[2])) {
            return true;
        } 

			// X o o
			// o X o
			// o o X

			// o X o
			// o X o
			// o X o

			// X o o
			// X o o
            // X o o
        
			// o o X
			// o o X
            // o o X
        
			// o o X
			// o X o
            // X o o
        
            
        
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