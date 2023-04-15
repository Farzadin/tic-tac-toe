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
        const textContent = board[`${row}`][`${col}`];
        cell.textContent = textContent;
      }
    }
  };

  return { displayBoard, board, updateBoard };
})();

const playerModule = (() => {
  const createPlayer = (name, symbol, turn) => ({ name, symbol, turn });

  const player1 = createPlayer('Player 1', 'X', true);
  const player2 = createPlayer('Player 2', 'O', false);

  const switchTurns = () => {
    player1.turn = !player1.turn;
    player2.turn = !player2.turn;
  };

  return { player1, player2, switchTurns };
})();

const gameControllerModule = (() => {
  const boxes = document.querySelectorAll('.box');

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

    gameBoardModule.displayBoard();
  };

  boxes.forEach((box) => {
    box.addEventListener('click', handleBoxClick);
  });
})();
