document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart-btn');
    const status = document.getElementById('status');
    const playerXInput = document.getElementById('playerX');
    const playerOInput = document.getElementById('playerO');
    const setNamesButton = document.getElementById('set-names-btn');
    const playerNamesDiv = document.getElementById('player-names');
  
    let currentPlayer = 'X';
    let gameActive = false;
    let playerXName = '';
    let playerOName = '';
  
    function handleCellClick(e) {
      const cell = e.target;
  
      if (!gameActive || cell.textContent !== '') {
        return;
      }
  
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer.toLowerCase());
      checkGameStatus();
    }
  
    function checkGameStatus() {
      const winner = checkWinner();
      if (winner) {
        displayWinner(winner);
      } else if (isBoardFull()) {
        status.textContent = 'It\'s a tie!';
        gameActive = false;
        restartButton.style.display = 'block';
      } else {
        togglePlayer();
      }
    }
  
    function togglePlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatus();
    }
  
    function updateStatus() {
      const currentPlayerName = currentPlayer === 'X' ? playerXName : playerOName;
      status.textContent = `${currentPlayerName}'s turn`;
    }
  
    function checkWinner() {
      const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (
          cells[a].textContent &&
          cells[a].textContent === cells[b].textContent &&
          cells[a].textContent === cells[c].textContent
        ) {
          return cells[a].textContent;
        }
      }
  
      return null;
    }
  
    function displayWinner(winner) {
      const winnerName = winner === 'X' ? playerXName : playerOName;
      status.textContent = `${winnerName} wins!`;
      gameActive = false;
      restartButton.style.display = 'block';
  
      cells.forEach(cell => {
        if (cell.textContent === winner) {
          cell.classList.add('winning-cell');
        }
      });
    }
  
    function isBoardFull() {
      return [...cells].every(cell => cell.textContent !== '');
    }
  
    function restartGame() {
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning-cell');
      });
  
      gameActive = true;
      currentPlayer = 'X';
      updateStatus();
      restartButton.style.display = 'none';
    }
  
    setNamesButton.addEventListener('click', () => {
      playerXName = playerXInput.value || 'Player X';
      playerOName = playerOInput.value || 'Player O';
      playerNamesDiv.style.display = 'none';
      updateStatus();
      restartGame();
    });
  
    restartButton.addEventListener('click', restartGame);
  
    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });
  });
  