// The gameBoardModule encapsulates the game board and provides methods for updating and displaying the board, and checking for wins and ties.
const gameBoardModule = (() => {
  // The game board is represented as a 2D array of strings, with each cell initialized to an empty string.
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  // Updates the value of a specific cell on the game board to the specified symbol.
  const updateBoard = (row, col, symbol) => {
    board[row][col] = symbol;
  };

  // Updates the DOM to display the current state of the game board.
  const displayBoard = () => {
    for (let row = 0; row < board.length; row += 1) {
      for (let col = 0; col < board[row].length; col += 1) {
        // Find the DOM element corresponding to current cell.
        const cell = document.querySelector(`.r${row}c${col}`);
        // Update the text content of the cell to match the current value of the game board cell.
        const textContent = board[row][col];
        cell.textContent = textContent;
      }
    }
  };

  // Checks whether the game has ended in a tie by checking whether all cells are non-empty.
  const isTie = () => {
    for (let row = 0; row < board.length; row += 1) {
      for (let col = 0; col < board[row].length; col += 1) {
        if (board[row][col] === '') {
          return false;
        }
      }
    }
    return true;
  };

  // Checks whether the game has been won by checking for a matching row.
  const checkRow = () => {
    for (let row = 0; row < board.length; row += 1) {
      if (
        board[row][0] !== '' &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2]
      ) {
        return true;
      }
    }
    return false;
  };

  // Checks whether the game has been won by checking for a matching column.
  const checkCol = () => {
    for (let col = 0; col < board.length; col += 1) {
      if (
        board[0][col] !== '' &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col]
      ) {
        return true;
      }
    }
    return false;
  };

  // Checks whether the game has been won by checking for a matching diagonal.
  const checkDiag = () => {
    if (
      board[0][0] !== '' &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return true;
    }
    if (
      board[0][2] !== '' &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return true;
    }
    return false;
  };

  return {
    displayBoard,
    board,
    updateBoard,
    isTie,
    checkRow,
    checkCol,
    checkDiag,
  };
})();

// playerModule encapsulates the player objects and provides method to change their turn status.
const playerModule = (() => {
  // Factory function to create player objects with name, symbol and turn status.
  const createPlayer = (name, symbol, turn) => ({ name, symbol, turn });

  // Create two player object using the createPlayer function, representing Player X and Player O.
  const player1 = createPlayer('Player X', 'X', true);
  const player2 = createPlayer('Player O', 'O', false);

  // function to switch turn status of the two players
  const switchTurns = () => {
    player1.turn = !player1.turn;
    player2.turn = !player2.turn;
  };

  return { player1, player2, switchTurns };
})();

// This module handles the logic of the game by defining event listeners for each box on the game board. 
// eslint-disable-next-line no-unused-vars
const gameControllerModule = (() => {
  const boxes = document.querySelectorAll('.box');
  const display = document.querySelector('.display');

  const handleBoxClick = (event) => {
    // Determines the row and column of the clicked box by accessing the by class names of the box element.
    const row = event.target.classList[1].charAt(1);
    const col = event.target.classList[1].charAt(3);

    const currentPlayer = playerModule.player1.turn
      ? playerModule.player1
      : playerModule.player2;

    // If the clicked box is empty, it updates the game board and switch the turn status of players.
    if (gameBoardModule.board[row][col] === '') {
      gameBoardModule.updateBoard(row, col, currentPlayer.symbol);
      playerModule.switchTurns();
    }

    // Checks wether the game has ended or not by checking rows, columns and diagonals of the board.
    if (
      gameBoardModule.checkRow() ||
      gameBoardModule.checkCol() ||
      gameBoardModule.checkDiag()
    ) {
      display.textContent = `Game Over! ${currentPlayer.name} Wins!`;
      // eslint-disable-next-line no-use-before-define
      gameOver();
    } else if (gameBoardModule.isTie()) {
      display.textContent = 'Game Over! Tie!';
      // eslint-disable-next-line no-use-before-define
      gameOver();
    }

    gameBoardModule.displayBoard();
  };

  const gameOver = () => {
    boxes.forEach((box) => {
      box.removeEventListener('click', handleBoxClick);
    });
  };

  boxes.forEach((box) => {
    box.addEventListener('click', handleBoxClick);
  });
})();
