

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
    const board = createBoard();
    console.log(board);
    function markBoard(posX,posY,player) {
        board[posX][posY] = player.marker;
    }
    //return obj
    return {markBoard};
})();

const playerOne = createPlayer("bob", "X");
function createPlayer(name, marker) {
    console.log(name + ': ' + marker)
    return {name,marker};
}


//controler to manage game
const controller = (function createController() {
    //control win conditions
    //manage gameboard
})();

//player > plays round > next turn > opponent > plays round

//test
gameboard.markBoard(1, 1, playerOne);