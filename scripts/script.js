

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
    function resetBoard() {
        return board = createBoard();
    }
    return { markBoard, getBoard, resetBoard };
})();

const playerOne = createPlayer("bob", "X");
function createPlayer(name, marker) {
    console.log(name + ': ' + marker)
    return { name, marker };
}


//controler to manage game
const gameController = (function createController(board) {
    let round = 0;
    function gameStatus() {        
        console.log(board.getBoard());
    }
    function playRound(posX, posY, player) {
        let boardCell = board.getBoard()[posX][posY];
        console.log(boardCell);
        if (boardCell === null) {
            board.markBoard(posX, posY, player);
            round++;            
        }
        board.getBoard();
    }
    //control win conditions
    //manage gameboard
    return { gameStatus, playRound };
})(gameboard);

//player > plays round > next turn > opponent > plays round

//test
gameboard.markBoard(1, 1, playerOne);
gameController.gameStatus();