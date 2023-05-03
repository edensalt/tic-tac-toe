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

const Player = (playerName, playerSymbol, playerType) => {
  const getName = () => playerName;
  const getSymbol = () => playerSymbol;
  const getType = () => playerType;
  const player = { name: playerName, symbol: playerSymbol, type: playerType };
  playersArr.push(player);

  return { getName, getSymbol, getType };
};

// GAME CONTROLLER: Select a square, determine current player, determine winner

const gameController = (function () {
  const board = gameBoard.getBoard();

  let currentPlayerIndex;
  let round = 1;

  // HUMAN PLAYS A ROUND

  const playRound = (cellRow, cellColumn) => {
    if (
      (round === 1 && playersArr[0].symbol === "x") ||
      (playersArr[0].symbol === "x" && round % 2 !== 0)
    ) {
      currentPlayerIndex = 0;
    } else if (playersArr[0].symbol === "o" && round % 2 === 0) {
      currentPlayerIndex = 0;
    } else currentPlayerIndex = 1;

    // function getCurrentPlayerName() {
    //   const currentPlayer = playersArr[currentPlayerIndex];
    //   return currentPlayer.name;
    // }

    function getCurrentPlayerSymbol() {
      const currentPlayer = playersArr[currentPlayerIndex];
      return currentPlayer.symbol;
    }

    if (
      board[cellRow][cellColumn] === "x" ||
      board[cellRow][cellColumn] === "o" ||
      typeof playersArr[1] === "undefined"
    )
      return false;

    // when the player is a human
    board[cellRow][cellColumn] = getCurrentPlayerSymbol();

    //
    round++;
    console.log(round);
  };

  // COMPUTER PLAYS ROUND

  const playRoundAsComputer = () => {
    if (
      (round === 1 && playersArr[0].symbol === "x") ||
      (playersArr[0].symbol === "x" && round % 2 !== 0)
    ) {
      currentPlayerIndex = 0;
    } else if (playersArr[0].symbol === "o" && round % 2 === 0) {
      currentPlayerIndex = 0;
    } else currentPlayerIndex = 1;

    // function getCurrentPlayerName() {
    //   const currentPlayer = playersArr[currentPlayerIndex];
    //   return currentPlayer.name;
    // }

    function getCurrentPlayerSymbol() {
      const currentPlayer = playersArr[currentPlayerIndex];
      return currentPlayer.symbol;
    }

    function pickSquare() {
      function pickRow() {
        return Math.floor(Math.random() * 3);
      }

      function pickCol() {
        return Math.floor(Math.random() * 3);
      }

      let row = pickRow();
      let col = pickCol();

      while (board[row][col] === "x" || board[row][col] === "o") {
        row = pickRow();
        col = pickCol();
      }

      return [row, col];
    }

    console.log(board[pickSquare().row][pickSquare().col]);
    // when the player is a human
    board[pickSquare().row][pickSquare().col] = getCurrentPlayerSymbol();

    //
    round++;
    console.log(round);
  };

  // SEE IF THERE IS A WINNER

  const decideWinner = () => {
    const boardRows = board.length;

    function getCurrentPlayerName() {
      const currentPlayer = playersArr[currentPlayerIndex];
      return currentPlayer.name;
    }

    // Remove board and declare winner

    function displayWinner() {
      const container = document.querySelector("#players-board");
      const title = document.querySelector("#title");
      const h1 = document.createElement("h1");
      h1.innerHTML = `Congratulations! <br />${getCurrentPlayerName()} won!`;
      h1.classList.add("pt-6", "sm:text-7xl", "text-4xl");
      const btn = document.createElement("button");
      btn.textContent = "Play again?";
      btn.classList.add(
        "rounded-md",
        "bg-indigo-500",
        "px-3",
        "py-2",
        "text-sm",
        "font-semibold",
        "text-white",
        "shadow-sm",
        "hover:bg-indigo-400",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-indigo-500"
      );
      btn.addEventListener("click", function () {
        location.reload();
      });
      container.style.display = "none";
      title.appendChild(h1);
      title.appendChild(btn);
    }

    // Remove board and declare tie

    function displayTie() {
      const container = document.querySelector("#players-board");
      const title = document.querySelector("#title");
      const h1 = document.createElement("h1");
      h1.innerHTML = `A well fought match, indeed. You tied!`;
      h1.classList.add("pt-6", "text-7xl");
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
      board[1][1] === board[0][2] &&
      board[1][1] !== ""
    ) {
      displayWinner();
      return getCurrentPlayerName();
    }

    // Tie conditions

    if (round === 10) {
      displayTie();
      return getCurrentPlayerName();
    }

    return false;
  };

  return { playRound, playRoundAsComputer, decideWinner };
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
          "text-3xl",
          "text-slate-800"
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

        if (
          cellButton.textContent === "x" ||
          cellButton.textContent === "o" ||
          typeof playersArr[1] === "undefined"
        ) {
          cellButton.classList.remove("hover:bg-rose-200/60");
        }

        cellButton.addEventListener("click", handleClick);
        boardDiv.appendChild(cellButton);
      });
    });
  }

  // Computer turn

  function computerTurn() {
    const board = gameBoard.getBoard();
    compRow = Math.floor(Math.random() * 3);
    compCol = Math.floor(Math.random() * 3);
    while (board[compRow][compCol] === "x" || board[compRow][compCol] === "o") {
      compRow = Math.floor(Math.random() * 3);
      compCol = Math.floor(Math.random() * 3);
    }
    gameController.playRound(compRow, compCol);
    setTimeout(() => {
    updateBoard();
    }, 250);
    setTimeout(() => {gameController.decideWinner();
    }, 750);
  }

  // Add event listener for selecting square

  function handleClick(e) {
    e.preventDefault;
    const cellRow = parseInt(e.target.getAttribute("data-row"));
    const cellColumn = parseInt(e.target.getAttribute("data-column"));
    gameController.playRound(cellRow, cellColumn);
    updateBoard();
    if (gameController.decideWinner() === false) {
      if (playersArr[1].type === "computer") {
        computerTurn();
      }
    }
    console.table(gameBoard.getBoard());
  }

  updateBoard();

  // PLAYER FORMS

  const getPLayers = (function () {
    const form1 = document.querySelector("#player-one-form");
    const form2 = document.querySelector("#player-two-form");
    const player2Selection = document.querySelector("#player-two-selection");
    const waitingMessage = document.querySelector("#waiting-message");
    form2.style.display = "none";
    player2Selection.style.display = "none";

    // Add player 1

    form1.addEventListener("submit", function (e) {
      e.preventDefault();
      const nameInput = document.querySelector("#player-one-name");
      const symbolInput = document.querySelector(
        'input[name="player-one-symbol"]:checked'
      );
      const name = nameInput.value;
      const symbol = symbolInput.value;
      const type = "human";
      Player(name, symbol, type);
      welcomePlayer1();
      waitingMessage.remove();
      player2Selection.style.display = "flex";
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
      welcome.innerHTML = `Welcome to the game, <span class="text-3xl text-rose-200">${playersArr[0].name}!</span> <br />Your symbol is <span class="font-symbols text-3xl text-rose-200">${playersArr[0].symbol}.`;
      container.appendChild(welcome);
    }

    const playFriend = document.querySelector("#human");
    const playComputer = document.querySelector("#computer");

    // Populate player 2 form

    playFriend.addEventListener("click", function (e) {
      e.preventDefault;
      player2Selection.style.display = "none";
      form2.style.display = "block";
      const playerTwoSymbol = document.querySelector("#player-two-symbol");
      para = document.createElement("p");
      para.classList.add("text-sm", "font-medium", "leading-6", "text-rose-50");
      if (playersArr[0].symbol === "o") {
        para.innerHTML = `Your symbol is x.`;
      } else {
        para.innerHTML = `Your symbol is o.`;
      }
      playerTwoSymbol.appendChild(para);
    });

    playComputer.addEventListener("click", function (e) {
      player2Selection.style.display = "none";
      const name = "Computer";
      let symbol;
      if (playersArr[0].symbol == "x") {
        symbol = "o";
      } else symbol = "x";
      const type = "computer";
      Player(name, symbol, type);
      welcomePlayer2();
      if (playersArr[0].symbol == "o") {
        computerTurn();
      } else return;
    });

    // Add player 2

    form2.addEventListener("submit", function (e) {
      e.preventDefault();
      const nameInput = document.querySelector("#player-two-name");
      const name = nameInput.value;
      let symbol;
      if (playersArr[0].symbol == "x") {
        symbol = "o";
      } else symbol = "x";
      const type = "human"; // ⚠️ CHANGE TO HUMAN!!!!!!!
      Player(name, symbol, type);
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
      welcome.innerHTML = `Welcome to the game, <span class="text-3xl text-rose-200">${playersArr[1].name}!</span> <br />Your symbol is <span class="font-symbols text-3xl text-rose-200">${playersArr[1].symbol}.`;
      container.appendChild(welcome);
      updateBoard();
    }
  })();
})();