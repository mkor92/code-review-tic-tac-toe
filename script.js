"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {
  gameField: [],
  playerOne: "X",
  playerTwo: "O",
  currentPlayer: "",
  nickNamePlayerOne: "",
  nickNamePlayerTwo: "",
  colorPlayerOne: "",
  colorPlayerTwo: "",
};

window.addEventListener("load", () => {
  initGlobalObject();
  if (checkForGameOver() === 1) {
    console.log("Spelare 1 vann");
  } else if (checkForGameOver() === 2) {
    console.log("Spelare 2 vann");
  } else if (checkForGameOver() === 3) {
    console.log("Oavgjort");
  } else {
    console.log("Spelet fortsätter");
  }
});

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {
  //Datastruktur för vilka platser som är lediga respektive har brickor
  //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner
  oGameData.gameField = ["", "", "", "", "", "", "", "", ""];

  /* Testdata för att testa rättningslösning */
  //oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
  //oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', ''];
  //oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
  //oGameData.gameField = ['', '', 'X', '', 'X', '', 'X', '', ''];
  //oGameData.gameField = ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O'];

  //Indikerar tecknet som skall användas för spelare ett.
  oGameData.playerOne = "X";

  //Indikerar tecknet som skall användas för spelare två.
  oGameData.playerTwo = "O";

  //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
  oGameData.currentPlayer = "";

  //Nickname för spelare ett som tilldelas från ett formulärelement,
  oGameData.nickNamePlayerOne = "";

  //Nickname för spelare två som tilldelas från ett formulärelement.
  oGameData.nickNamePlayerTwo = "";

  //Färg för spelare ett som tilldelas från ett formulärelement.
  oGameData.colorPlayerOne = "";

  //Färg för spelare två som tilldelas från ett formulärelement.
  oGameData.colorPlayerTwo = "";

  //Antalet sekunder för timerfunktionen
  oGameData.seconds = 5;

  //Timerns ID
  oGameData.timerId = null;

  //Från start är timern inaktiverad
  oGameData.timerEnabled = false;

  //Referens till element för felmeddelanden
  oGameData.timeRef = document.querySelector("#errorMsg");
}

/**
 * Kontrollerar för tre i rad genom att anropa funktionen checkWinner() och checkForDraw().
 * Returnerar 0 om spelet skall fortsätta,
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
function checkForGameOver() {
  if (checkWinner(oGameData.playerOne) === true) {
    return 1;
  } else if (checkWinner(oGameData.playerTwo) === true) {
    return 2;
  } else if (checkForDraw() === true) {
    return 3;
  } else {
    return 0;
  }
}

// Säg till om ni vill få pseudokod för denna funktion
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej
function checkWinner(playerIn) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    const field = oGameData.gameField;

    // Om alla tre positioner i kombinationen innehåller spelarens symbol returnera true
    if (
      field[a] === playerIn &&
      field[b] === playerIn &&
      field[c] === playerIn
    ) {
      return true;
    }
  }

  // Om ingen vinstkombination hittas, returnera false
  return false;
}

//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
  return oGameData.gameField.every((cell) => cell !== "");
}

// Nedanstående funktioner väntar vi med!

function prepGame() {
  let gameArea = document.getElementById("gameArea");
  gameArea.classList.add("d-none");
}
let newGame = document.getElementById("newGame");
newGame.addEventListener("click", (event) => {
  initiateGame();
});

function validateForm() {}

function settingAddClick(event) {
  executeMove(event);
}

function initiateGame() {
  let initiateGame = document.getElementById("newGame");
  let theForm = document.getElementById("theForm");
  let gameArea = document.getElementById("gameArea");
  let errorMsg = oGameData.timeRef;

  initiateGame.classList.add("d-none");
  gameArea.classList.remove("d-none");
  theForm.classList.add("d-none");
  errorMsg.textContent = "";

  setPlayerData();
  clearGamingBoard();
  setCurrentPlayer();

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", settingAddClick);
  });
}

function clearGamingBoard() {
  let clearGame = document.querySelectorAll(".cell");
  clearGame.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "#FFFFFF";
  });
}

function setPlayerData() {
  let theForm = document.getElementById("theForm");
  let formData = new FormData(theForm);

  oGameData.nickNamePlayerOne = formData.get("nick1");
  oGameData.nickNamePlayerTwo = formData.get("nick2");
  oGameData.colorPlayerOne = formData.get("color1");
  oGameData.colorPlayerTwo = formData.get("color2");
}

function setCurrentPlayer() {
  let playerChar = oGameData.playerOne;
  let playerName = oGameData.nickNamePlayerOne;

  if (Math.random() < 0.5) oGameData.currentPlayer = oGameData.playerOne;
  else oGameData.currentPlayer = oGameData.playerTwo;

  let jumboTron = document.querySelector(".jumbotron>h1");
  jumboTron.textContent = `Det är ${playerName} (${playerChar}) som börjar!`;
}

function executeMove(event) {
  let jumboTron = document.querySelector(".jumbotron>h1");
  let cell = event.target.getAttribute("data-id");
  let cellContent = oGameData.gameField[cell];
  if (cellContent !== "") return;
  if (oGameData.currentPlayer === "X") {
    jumboTron.textContent = `Det är ${oGameData.nickNamePlayerOne} (${oGameData.playerOne}) tur!`;
    event.target.textContent = "X";
    event.target.style.backgroundColor = oGameData.colorPlayerOne;
    oGameData.gameField[cell] = "X";
    oGameData.currentPlayer = "O";
  } else {
    jumboTron.textContent = `Det är ${oGameData.nickNamePlayerTwo} (${oGameData.playerTwo}) tur!`;
    event.target.textContent = "O";
    event.target.style.backgroundColor = oGameData.colorPlayerTwo;
    oGameData.gameField[cell] = "O";
    oGameData.currentPlayer = "X";
  }

  let gameState = checkForGameOver();
  console.log(gameState);
  if (gameState !== 0) {
    gameOver(gameState);
  }
}

function changePlayer() {}

function timer() {}

function gameOver(result) {
  let jumbotron = document.querySelector(".jumbotron>h1");
  let form = document.getElementById("theForm");
  let gameArea = document.getElementById("gameArea");
  let startAgainButton = document.getElementById("newGame");

  if (result === 1) {
    jumbotron.textContent = `${oGameData.nickNamePlayerOne} har vunnit! Vill du spela igen?`;
  } else if (result === 2) {
    jumbotron.textContent = `${oGameData.nickNamePlayerTwo} har vunnit! Vill du spela igen?`;
  } else if (result === 3) {
    jumbotron.textContent = `Det är oavgjort! Vill du spela igen?`;
  }
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.removeEventListener("click", settingAddClick);
  });

  form.classList.remove("d-none");
  gameArea.classList.remove("d-none");
  startAgainButton.classList.remove("d-none");
  startAgainButton.textContent = "Spela igen!";

  initGlobalObject();
}