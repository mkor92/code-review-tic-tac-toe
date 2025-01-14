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


 window.addEventListener('load', () => {
    initGlobalObject();
    console.log(checkWinner(oGameData.playerTwo) + " = testar checkWinner funktionen");
    console.log(checkForGameOver() + " = testar checkForGameOver funktionen");
    console.log(checkForDraw() + " = testar checkForDraw funktionen");
    if(checkForGameOver() === 1) {
        console.log("Spelare 1 vann");        
    } else if(checkForGameOver() === 2) {
        console.log("Spelare 2 vann");
    } else if(checkForGameOver() === 3) {
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
    oGameData.gameField = ['', '', '', '', '', '', '', '', ''];
    
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
}; 
}



// Säg till om ni vill få pseudokod för denna funktion
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej
function checkWinner(playerIn) {
    
    
    const winningCombinations = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ],
    
    ];

    
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        const field = oGameData.gameField;

        // Om alla tre positioner i kombinationen innehåller spelarens symbol returnera true
        if (field[a] === playerIn && field[b] === playerIn && field[c] === playerIn) {
            return true;
        }
    }

    // Om ingen vinstkombination hittas, returnera false
    return false;
}


//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
    return oGameData.gameField.every(cell => cell !== '');
}



// Nedanstående funktioner väntar vi med!

function prepGame() {

}

function validateForm() {
    
}

function initiateGame() {

}

function executeMove (event) {

}

function changePlayer() {

}

function timer() {

}

function gameOver(result) {

}
