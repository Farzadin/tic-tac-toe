const gameBoard = (() => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const displayBoard = () => {
    for (let row = 0; row < board.length; row += 1) {
      for (let col = 0; col < board[row].length; col += 1) {
        const cell = document.querySelector(`.r${row}c${col}`);
        const textContent = board[`${row}`][`${col}`];
        cell.textContent = textContent;
      }
    }
  };

  return { displayBoard, board };
})();

const createPlayer = (name, symbol, turn) => ({name, symbol, turn})
const player1 = createPlayer('Player 1', 'X', true);
const player2 = createPlayer('Player 2', 'O', false);

// Get all the boxes on the game board
const boxes = document.querySelectorAll('.box');

function handleBoxClick(event) {
  // Get the row and column of the clicked box
  const row = event.target.classList[1].charAt(1);
  const col = event.target.classList[1].charAt(3);

  // Check if the box is empty and it's the current player's turn
  if (gameBoard.board[row][col] === '' && player1.turn) {
    // Update the game board and change turns
    gameBoard.board[row][col] = player1.symbol;
    player1.turn = false;
    player2.turn = true;
  } else if (gameBoard.board[row][col] === '' && player2.turn) {
    // Update the game board and change turns
    gameBoard.board[row][col] = player2.symbol;
    player1.turn = true;
    player2.turn = false;
  }

  // Display the updated game board
  gameBoard.displayBoard();
}

// Add a click event listener to each box
boxes.forEach(box => {
  box.addEventListener('click', handleBoxClick);
});