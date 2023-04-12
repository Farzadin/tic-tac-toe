const board = [
    ['1', 'O', 'X'],
    ['2', '3', '4'],
    ['3', '4', '5']
]

for (let row = 0; row < board.length; row += 1 ) {
  for (let col = 0; col < board[row].length; col += 1) {
    const cell = document.querySelector(`.r${row}c${col}`)
    const textContent = board[`${row}`][`${col}`]
    cell.addEventListener('click', () => {
      cell.textContent = textContent
    })
  }
}