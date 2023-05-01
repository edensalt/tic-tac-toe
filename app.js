import { addPlayer2Form } from "./player2form";

// GAME BOARD

const gameBoard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = "";
    }
  }

  const getBoard = () => board;

  return { getBoard };
})();

// PLAYERS

const Players = function () {
  let players = [];

  function playerFactory(playerName, symbol) {
    return {
      name: playerName,
      symbol: symbol,
    };
  }

  const form1 = document.querySelector("#player-one-form");

  // Add player 1

  form1.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameInput = document.querySelector("#player1-name");
    const symbolInput = document.querySelector('input[name="symbol1"]:checked');
    const name = nameInput.value;
    const symbol = symbolInput.value;
    const newPlayer = playerFactory(name, symbol);
    players.push(newPlayer);
    console.table(players);
    welcomePlayer1();
    addForm2();
  });

  // Remove form for player1

  function welcomePlayer1() {
    form1.remove();
    const container = document.querySelector(".player1side");
    const welcome = document.createElement("h3");
    welcome.textContent = `Welcome to the game, ${players[0].name}! Your symbol is ${players[0].symbol}.`;
    container.appendChild(welcome);
  }

  // Add player 2 form

  function addForm2() {
    const side2 = document.querySelector(".player2side");
    while (side2.firstChild) {
      side2.removeChild(side2.firstChild);
    }
    side2.appendChild(addPlayer2Form());
  }

  // Determine player 2 type

  function welcomePlayer2() {
    form2.remove();
    const container = document.querySelector(".player1side");
    const welcome = document.createElement("h3");
    welcome.textContent = `Welcome to the game, ${players[1].name}!`;
    container.appendChild(welcome);
  }

  return { players };
};

// GAME CONTROLLER

const gameController = (function () {
  const board = gameBoard.getBoard();
  const players = Players().players;

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const playRound = (cellRow, cellColumn) => {
    if (
      board[cellRow][cellColumn] === "x" ||
      board[cellRow][cellColumn] === "o"
    )
      return;
    board[cellRow][cellColumn] = getActivePlayer().symbol;

    // Announce winner

    const decideWinner = () => {
      const boardRows = board.length;

      // Winner across a row

      for (i = 0; i < boardRows; i++) {
        if (
          board[i][0] === board[i][1] &&
          board[i][1] === board[i][2] &&
          board[i][0] !== ""
        ) {
          return getActivePlayer().playerName;
        }
      }

      // Winner across a column

      for (i = 0; i < boardRows; i++) {
        if (
          board[0][i] === board[1][i] &&
          board[1][i] === board[2][i] &&
          board[0][i] !== ""
        ) {
          return getActivePlayer().playerName;
        }
      }

      // Winner diagonal to bottom right

      if (
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2] &&
        board[1][1] !== ""
      ) {
        return getActivePlayer().playerName;
      }

      // Winner to diagonal bottom left

      if (
        board[2][0] === board[1][1] &&
        board[1][1] === board[2][0] &&
        board[1][1] !== ""
      ) {
        return getActivePlayer().playerName;
      }

      return false;
    };
    console.log(decideWinner());
    switchPlayerTurn();
  };

  return { getActivePlayer, playRound, getActivePlayer };
})();

// DISPLAY CONTROLLER

const displayController = (function () {
  const boardDiv = document.querySelector("#board");
  const board = gameBoard.getBoard();

  // Render the board
  function updateBoard() {
    boardDiv.textContent = "";

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.textContent = cell;
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.addEventListener("click", handleClick);
        boardDiv.appendChild(cellButton);
      });
    });
  }

  // Add event listener for selecting square
  function handleClick(e) {
    e.preventDefault;
    const cellRow = parseInt(e.target.getAttribute("data-row"));
    const cellColumn = parseInt(e.target.getAttribute("data-column"));
    gameController.playRound(cellRow, cellColumn);
    updateBoard();
  }

  updateBoard();
})();
