// GAME BOARD ARRAY

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

// PLAYER FACTORY

const playersArr = [];

const Player = (playerName, playerSymbol) => {
  const getName = () => playerName;
  const getSymbol = () => playerSymbol;
  const player = { name: playerName, symbol: playerSymbol };
  playersArr.push(player);

  return { getName, getSymbol };
};

// GAME CONTROLLER: Select a square, determine current player, determine winner

const gameController = (function () {
  const board = gameBoard.getBoard();

  let currentPlayerIndex = 0;
  let round = 1;

  const playRound = (cellRow, cellColumn) => {
    if (round % 2 === 0) {
      currentPlayerIndex = 1;
    } else currentPlayerIndex = 0;

    function getCurrentPlayerName() {
      const currentPlayer = playersArr[currentPlayerIndex];
      return currentPlayer.name;
    }

    function getCurrentPlayerSymbol() {
      const currentPlayer = playersArr[currentPlayerIndex];
      return currentPlayer.symbol;
    }

    if (
      board[cellRow][cellColumn] === "x" ||
      board[cellRow][cellColumn] === "o"
    )
      return;
    board[cellRow][cellColumn] = getCurrentPlayerSymbol();
    round++;

    // Announce winner

    const decideWinner = () => {
      const boardRows = board.length;

      // Remove board and declare winner

      function displayWinner() {
        const container = document.querySelector("#players-board");
        const title = document.querySelector("#title");
        const h1 = document.createElement("h1");
        h1.textContent = `Congratulations! ${getCurrentPlayerName()} has won!`;
        const btn = document.createElement("button");
        btn.textContent = "Play again?";
        btn.addEventListener("click", function () {
          location.reload();
        });
        container.style.display = "none";
        title.appendChild(h1);
        title.appendChild(btn);
      }

      // Win conditions

      // Winner across a row

      for (i = 0; i < boardRows; i++) {
        if (
          board[i][0] === board[i][1] &&
          board[i][1] === board[i][2] &&
          board[i][0] !== ""
        ) {
          displayWinner();
          return getCurrentPlayerName();
        }
      }

      // Winner across a column

      for (i = 0; i < boardRows; i++) {
        if (
          board[0][i] === board[1][i] &&
          board[1][i] === board[2][i] &&
          board[0][i] !== ""
        ) {
          displayWinner();
          return getCurrentPlayerName();
        }
      }

      // Winner diagonal to bottom right

      if (
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2] &&
        board[1][1] !== ""
      ) {
        displayWinner();
        return getCurrentPlayerName();
      }

      // Winner diagonal to bottom left

      if (
        board[2][0] === board[1][1] &&
        board[1][1] === board[2][0] &&
        board[1][1] !== ""
      ) {
        displayWinner();
        return getCurrentPlayerName();
      }

      return false;
    };
    console.log(decideWinner());
  };

  return { playRound };
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
        cellButton.classList.add(
          "rounded-none",
          "border-2",
          "border-solid",
          "h-full",
          "w-full",
          "bg-indigo-400",
          "hover:bg-rose-200/60",
          "font-symbols",
          "text-3xl"
        );

        if (rowIndex === 0) {
          cellButton.classList.add("border-t-0");
          if (columnIndex === 0) {
            cellButton.classList.add("rounded-tl-lg");
          }
        }
        if (rowIndex === 2) {
          cellButton.classList.add("border-b-0");
          if (columnIndex === 2) {
            cellButton.classList.add("rounded-br-lg");
          }
        }
        if (columnIndex === 0) {
          cellButton.classList.add("border-l-0");
          if (rowIndex === 2) {
            cellButton.classList.add("rounded-bl-lg");
          }
        }
        if (columnIndex === 2) {
          cellButton.classList.add("border-r-0");
          if (rowIndex === 0) {
            cellButton.classList.add("rounded-tr-lg");
          }
        }

        if (cellButton.textContent === 'x' || cellButton.textContent === 'o') {
          cellButton.classList.remove("hover:bg-rose-200/60");
        }

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

// PLAYER FORMS

const getPLayers = (function () {
  const form1 = document.querySelector("#player-one-form");
  const form2 = document.querySelector("#player-two-form");
  const waitingMessage = document.querySelector("#waiting-message");
  form2.style.display = "none";

  // Add player 1

  form1.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameInput = document.querySelector("#player-one-name");
    const symbolInput = document.querySelector(
      'input[name="player-one-symbol"]:checked'
    );
    const name = nameInput.value;
    const symbol = symbolInput.value;
    Player(name, symbol);
    welcomePlayer1();
    waitingMessage.remove();
    form2.style.display = "block";
  });

  // Welcome player 1 and remove form

  function welcomePlayer1() {
    form1.style.display = "none";
    const container = document.querySelector("#player1side");
    const welcome = document.createElement("h3");
    welcome.classList.add(
      "block",
      "text-lg",
      "font-medium",
      "leading-6",
      "text-rose-50",
      "items-center"
    );
    welcome.textContent = `Welcome to the game, ${playersArr[0].name}! Your symbol is ${playersArr[0].symbol}.`;
    container.appendChild(welcome);
  }

  // Add player 2

  form2.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameInput = document.querySelector("#player-two-name");
    const name = nameInput.value;
    let symbol;
    if (playersArr[0].symbol == "x") {
      symbol = "o";
    } else symbol = "x";
    Player(name, symbol);
    welcomePlayer2();
  });

  // Welcome player 2 and remove form

  function welcomePlayer2() {
    form2.style.display = "none";
    const container = document.querySelector("#player2side");
    const welcome = document.createElement("h3");
    welcome.classList.add(
      "block",
      "text-lg",
      "font-medium",
      "leading-6",
      "text-rose-50",
      "items-center"
    );
    welcome.textContent = `Welcome to the game, ${playersArr[1].name}! Your symbol is ${playersArr[1].symbol}.`;
    container.appendChild(welcome);
  }
})();
