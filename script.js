// Wait until DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('game-status');
    const resetBtn = document.getElementById('reset-btn');
  
    // Game variables
    let board = ['', '', '', '', '', '', '', '', '']; // 9 cells
    let currentPlayer = 'X'; // X always starts
    let gameActive = true; // Game ongoing
  
    // Messages
    const winningMessage = () => `Player ${currentPlayer} has won! 🎉`;
    const drawMessage = () => `Game ended in a draw! 🤝`;
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;
  
    // Winning combinations by indices
    const winningConditions = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6]
    ];
  
    // Update the status message display
    function updateStatusMessage() {
      if (!gameActive) return; // If game ended, don't update turn message
      statusDisplay.textContent = currentPlayerTurn();
    }
  
    // Handle cell click
    function handleCellClick(clickedCellEvent) {
      const clickedCell = clickedCellEvent.target;
      const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));
  
      // Ignore click if cell already filled or game over
      if (board[clickedIndex] !== '' || !gameActive) {
        return;
      }
  
      // Update board and UI
      board[clickedIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
      clickedCell.classList.add('disabled');
  
      // Check if current move wins the game
      if (checkWin()) {
        statusDisplay.textContent = winningMessage();
        gameActive = false;
        disableAllCells();
        return;
      }
  
      // Check for draw (all cells filled)
      if (board.every(cell => cell !== '')) {
        statusDisplay.textContent = drawMessage();
        gameActive = false;
        return;
      }
  
      // Switch player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatusMessage();
    }
  
    // Check winning conditions
    function checkWin() {
      return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return (
          board[a] === currentPlayer &&
          board[b] === currentPlayer &&
          board[c] === currentPlayer
        );
      });
    }
  
    // Disable all cells (used after game ends)
    function disableAllCells() {
      cells.forEach(cell => cell.classList.add('disabled'));
    }
  
    // Reset the game to initial state
    function resetGame() {
      board = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;
      statusDisplay.textContent = currentPlayerTurn();
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
      });
    }
  
    // Add event listeners to each cell
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  
    // Reset button listener
    resetBtn.addEventListener('click', resetGame);
  
    // Initialize status
    updateStatusMessage();
  });
  