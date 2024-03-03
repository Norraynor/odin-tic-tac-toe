
const playerOne = createPlayer('bob', 'X');

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
    //return obj
    return {};
})();

function createPlayer(name, marker) {
    console.log(name + ': ' +marker)
    return {name,marker};
}

//controler to manage game