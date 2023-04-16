/* eslint-disable no-use-before-define */
const gameBoardModule = (() => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const updateBoard = (row, col, symbol) => {
    board[row][col] = symbol;
  };

  const displayBoard = () => {
    for (let row = 0; row < board.length; row += 1) {
      for (let col = 0; col < board[row].length; col += 1) {
        const cell = document.querySelector(`.r${row}c${col}`);
        const textContent = board[row][col];
        cell.textContent = textContent;
      }
    }
  };

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

const playerModule = (() => {
  const createPlayer = (name, symbol, turn) => ({ name, symbol, turn });

  const player1 = createPlayer('Player X', 'X', true);
  const player2 = createPlayer('Player O', 'O', false);

  const switchTurns = () => {
    player1.turn = !player1.turn;
    player2.turn = !player2.turn;
  };

  return { player1, player2, switchTurns };
})();

const gameControllerModule = (() => {
  const boxes = document.querySelectorAll('.box');
  const display = document.querySelector('.display');

  const handleBoxClick = (event) => {
    const row = event.target.classList[1].charAt(1);
    const col = event.target.classList[1].charAt(3);

    const currentPlayer = playerModule.player1.turn
      ? playerModule.player1
      : playerModule.player2;

    if (gameBoardModule.board[row][col] === '') {
      gameBoardModule.updateBoard(row, col, currentPlayer.symbol);
      playerModule.switchTurns();
    }

    if (
      gameBoardModule.checkRow() ||
      gameBoardModule.checkCol() ||
      gameBoardModule.checkDiag()
    ) {
      display.textContent = `Game Over! ${currentPlayer.name} Wins!`;
      gameOver();
    } else if (gameBoardModule.isTie()) {
      display.textContent = 'Game Over! Tie!';
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
