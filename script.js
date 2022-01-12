const container = document.getElementById('container');
const squares = document.getElementsByClassName('square');
const arraySquares = Array.from(squares);
const restart = document.getElementById('restart');
const humanBtn = document.getElementById('humanBtn');
const computerBtn = document.getElementById('computerBtn');
let player1Turn = true;
let player2Turn = false;
const resultDisplay = document.getElementById('resultDisplay');
let gameOver = false;
let human = false;
let computer = false;

humanBtn.addEventListener('click', () => {
    human = true;
    computer = false;
    humanBtn.style.border = "solid black 2px";
    humanBtn.style.borderRadius = "4px";
    computerBtn.style = '';
});

computerBtn.addEventListener('click', () => {
    computer = true;
    human = false;
    computerBtn.style.border = "solid black 2px";
    computerBtn.style.borderRadius = "4px";
    humanBtn.style = '';
});

const gameParameters = {
    gameboard: [
        [],[],[],
        [],[],[],
        [],[],[],
    ],
    player1: {
        moves: [],
        name: 'Player 1',
    },
    player2: {
        moves: [],
        name: 'Player 2',
    },
}

const checkWin = (player) => {
    let rows = [[0,1,2],[3,4,5],[6,7,8]];
    let columns = [[0,3,6],[1,4,7],[2,5,8]];
    let diagonals = [[0,4,8],[2,4,6]];
    
    //Checks for completed rows
    for (let i = 0; i < 3; i++) {
        let countRows = 0;
        for (let j = 0; j < 3; j++) {
            if (player.includes(rows[i][j])) {
                countRows++;
                if (countRows === 3) {
                    // console.log('Bidule wins! rows');
                    return true;
                }
            }
        }
    }
    //Checks for completed columns
    for (let i = 0; i < 3; i++) {
        let countColumns = 0;
        for (let j = 0; j < 3; j++) {
            if (player.includes(columns[i][j])) {
                countColumns++;
                if (countColumns === 3) {
                    // console.log('Bidule wins! colones');
                    return true;
                }
            }
        }
    }
    //Checks for completed diagonals
    for (let i = 0; i < 2; i++) {
        let countDiagonals = 0;
        for (let j = 0; j < 3; j++) {
            if (player.includes(diagonals[i][j])) {
                countDiagonals++;
                if (countDiagonals === 3) {
                    // console.log('Bidule wins! DIAGONAKLES');
                    return true;
                }
            }
        }
    }             
}


const playGame = (() => {
    arraySquares.forEach(element => {
        element.addEventListener('click', () => {
            if (gameOver) {
                return;
            }
            if (!human && !computer) {
                alert("You didn't select a player 2!");
                return;
            }
            if (squares[element.dataset.id].textContent == '') {
                if (player1Turn) {
                gameParameters.gameboard[element.dataset.id].push('X');
                squares[element.dataset.id].textContent = gameParameters.gameboard[element.dataset.id];
                gameParameters.player1.moves.push(element.dataset.id);
                player1Turn = false;
                player2Turn = true;
                    if (checkWin(gameParameters.player1.moves.map(Number))) {
                        let winnerDisplay = document.createElement('p');
                        winnerDisplay.id = 'winnerDisplay';
                        winnerDisplay.textContent = (`${gameParameters.player1.name} is the winner!`);
                        resultDisplay.appendChild(winnerDisplay);
                        gameOver = true;
                        return;
                    }
                } else if (player2Turn) {
                    gameParameters.gameboard[element.dataset.id].push('O');
                    squares[element.dataset.id].textContent = gameParameters.gameboard[element.dataset.id];
                    gameParameters.player2.moves.push(element.dataset.id);
                    player1Turn = true;
                    player2Turn = false;
                        if (checkWin(gameParameters.player2.moves.map(Number))) {
                            let winnerDisplay = document.createElement('p');
                            winnerDisplay.id = 'winnerDisplay';
                            winnerDisplay.textContent = (`${gameParameters.player2.name} is the winner!`);
                            resultDisplay.appendChild(winnerDisplay);
                            gameOver = true;
                            return;
                        }
                }
            }
            if (gameParameters.player1.moves.length === 5) {
                let tieDisplay = document.createElement('p');
                tieDisplay.id = 'winnerDisplay';
                tieDisplay.textContent = ("It's a tie :/");
                resultDisplay.appendChild(tieDisplay);
                gameOver = true;
                return;
            }
        });
    });
})();

restart.onclick = () => {
    arraySquares.forEach(element => {
       element.textContent = '';
       gameParameters.gameboard[element.dataset.id].pop();
       gameParameters.player1.moves = [];
       gameParameters.player2.moves = [];
       player1Turn = true;
       player2Turn = false;
       resultDisplay.innerHTML = '';
       gameOver = false;
       human = false;
       computer = false;
       humanBtn.style = '';
       computerBtn.style = '';
    });
};

function computerPlay() {

}