const container = document.getElementById('container');
const squares = document.getElementsByClassName('square');
const arraySquares = Array.from(squares);
const restart = document.getElementById('restart');
const player1Human = document.getElementById('player1Human');
const player1Computer = document.getElementById('player1Computer');
const player2Human = document.getElementById('player2Human');
const player2Computer = document.getElementById('player2Computer');
const modal = document.getElementById('modalBox');
const score = document.getElementById('score');
const nextRoundBtn = document.getElementById('nextRoundBtn');
const player1Click = document.getElementById('player1Click');
const player2Click = document.getElementById('player2Click');
const player1Btns = document.getElementById('player1Btns');
const player2Btns = document.getElementById('player2Btns');
const startBtn = document.getElementById('start');
let player1Turn = true;
let player2Turn = false;
let player1 = '';
let player2 = '';
let start = false;
// let player1Selected = false;
// let player2Selected = false;
const resultDisplay = document.getElementById('resultDisplay');
let gameOver = false;
// let human = false;
// let computer = false;

const gameParameters = {
    gameboard: [
        [],[],[],
        [],[],[],
        [],[],[],
    ],
    player1: {
        moves: [],
        name: 'Player 1',
        score: 0,
        marker: 'X',
    },
    player2: {
        moves: [],
        name: 'Player 2',
        score: 0,
        marker: 'O',
    },
    // computer: {
    //     moves: [],
    //     name: 'Computer',
    //     score: 0,
    // }
}

player1Human.addEventListener('click', () => {
    if (gameParameters.player1.moves.length >= 1 && gameOver == false) {
        return;
    }
    player1 = 'human';
    // computer = false;
    player1Human.style.border = "solid black 2px";
    player1Human.style.borderRadius = "4px";
    player1Computer.style = '';
});

player1Computer.addEventListener('click', () => {
    if (gameParameters.player1.moves.length >= 1 && gameOver == false) {
        return;
    }
    // computer = true;
    player1 = 'computer';
    player1Computer.style.border = "solid black 2px";
    player1Computer.style.borderRadius = "4px";
    player1Human.style = '';
});

player2Human.addEventListener('click', () => {
    if (gameParameters.player1.moves.length >= 1 && gameOver == false) {
        return;
    }
    player2 = 'human';
    // computer = false;
    player2Human.style.border = "solid black 2px";
    player2Human.style.borderRadius = "4px";
    player2Computer.style = '';
});

player2Computer.addEventListener('click', () => {
    if (gameParameters.player1.moves.length >= 1 && gameOver == false) {
        return;
    }
    // computer = true;
    player2 = 'computer';
    player2Computer.style.border = "solid black 2px";
    player2Computer.style.borderRadius = "4px";
    player2Human.style = '';
});

restart.addEventListener('click', () => {
    arraySquares.forEach(element => {
        element.textContent = '';
        gameParameters.gameboard[element.dataset.id].pop();
        gameParameters.player1.moves = [];
        gameParameters.player2.moves = [];
        // gameParameters.computer.moves = [];
        gameParameters.player1.score = 0;
        gameParameters.player2.score = 0;
        // gameParameters.computer.score = 0;
        player1Turn = true;
        player2Turn = false;
        player1 = '';
        player2 = '';
        resultDisplay.innerHTML = '';
        startBtn.style = '';
        score.innerHTML = '';
        gameOver = false;
        start = false;
        // human = false;
        // computer = false;
        player1Human.style = '';
        player1Computer.style = '';
        player2Human.style = '';
        player2Computer.style = '';
        modal.style.display = "none";
        player1Click.style = '';
        player2Click.style = '';
    });
});

nextRoundBtn.addEventListener('click', () => {
    arraySquares.forEach(element => {
        if (gameOver) {
            element.textContent = '';
            gameParameters.gameboard[element.dataset.id].pop();
            gameParameters.player1.moves = [];
            gameParameters.player2.moves = [];
            // gameParameters.computer.moves = [];
            player1Turn = true;
            player2Turn = false;
            resultDisplay.innerHTML = '';
            modal.style.display = "none";
        }
    });
    gameOver = false;
});

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
                    return true;
                }
            }
        }
    } 
}

// const resultDisplayTest = (player) => {
//     if (checkWin(player.moves.map(Number))) {
//         score.innerHTML = '';
//         player.score += 1;
//         let winnerDisplay = document.createElement('p');
//         winnerDisplay.id = 'winnerDisplay';
//         winnerDisplay.textContent = (`${player.name} is the winner!`);
//         resultDisplay.appendChild(winnerDisplay);
//         let scoreDisplay = document.createElement('p');
//         scoreDisplay.textContent = `${gameParameters.player1.score} - ${gameParameters.player2.score}`;
//         score.appendChild(scoreDisplay);
//         gameOver = true;
//         modal.style.display = "block";
//         return;
//     }
// }

const playGame = (() => {
    startBtn.addEventListener('click', () => {
        if (player1 == '' || player2 == '') {
            alert('Please select both players');
            return;
        } else {
            start = true;
            startBtn.style.border = "solid black 2px";
            startBtn.style.borderRadius = "4px";
            for (let i = 0; i < 9; i++) {
               computerPlay(); 
            }
        }
    });
    arraySquares.forEach(element => {
        element.addEventListener('click', () => {
            if (gameOver || !start) {
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
                        score.innerHTML = '';
                        gameParameters.player1.score += 1;
                        let winnerDisplay = document.createElement('p');
                        winnerDisplay.id = 'winnerDisplay';
                        winnerDisplay.textContent = (`${gameParameters.player1.name} is the winner!`);
                        resultDisplay.appendChild(winnerDisplay);
                        let scoreDisplay = document.createElement('p');
                        scoreDisplay.textContent = `${gameParameters.player1.score} - ${gameParameters.player2.score}`;
                        score.appendChild(scoreDisplay);
                        gameOver = true;
                        modal.style.display = "block";
                        return;
                    }
                    computerPlay();
                } else if (player2Turn) {
                    if (player2 == 'human') {
                        gameParameters.gameboard[element.dataset.id].push('O');
                        squares[element.dataset.id].textContent = gameParameters.gameboard[element.dataset.id];
                        gameParameters.player2.moves.push(element.dataset.id);
                    }
                        player1Turn = true;
                        player2Turn = false;
                            if (checkWin(gameParameters.player2.moves.map(Number))) {
                                score.innerHTML = '';
                                gameParameters.player2.score += 1;
                                let winnerDisplay = document.createElement('p');
                                winnerDisplay.id = 'winnerDisplay';
                                winnerDisplay.textContent = (`${gameParameters.player2.name} is the winner!`);
                                resultDisplay.appendChild(winnerDisplay);
                                let scoreDisplay = document.createElement('p');
                                scoreDisplay.textContent = `${gameParameters.player1.score} - ${gameParameters.player2.score}`;
                                score.appendChild(scoreDisplay);
                                gameOver = true;
                                modal.style.display = "block";
                                return;
                            }
                        computerPlay();  
                    }
            }
            // In case of a tie game
            if (gameParameters.player1.moves.length === 5) {
                score.innerHTML = '';
                let tieDisplay = document.createElement('p');
                tieDisplay.id = 'winnerDisplay';
                tieDisplay.textContent = ("It's a tie :/");
                resultDisplay.appendChild(tieDisplay);
                let scoreDisplay = document.createElement('p');
                scoreDisplay.textContent = `${gameParameters.player1.score} - ${gameParameters.player2.score}`;
                score.appendChild(scoreDisplay);
                gameOver = true;
                modal.style.display = "block";
                return;
            }
        });
    });
})();

const computerPlay = () => {

    const _computerPlayRandom = () => {
        let emptySquares = [];
        for (let i = 0; i < gameParameters.gameboard.length; i++) {
            if(gameParameters.gameboard[i] == 0) {
                emptySquares.push(i);
            }
        }
        let computerRandomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        return computerRandomMove;
    };

    if (gameParameters.player1.moves.length < 5 && start && !gameOver) {
        if (player1Turn === true && player1 == 'computer') {
            let computerMove = _computerPlayRandom();
            gameParameters.gameboard[computerMove].push('X');
            squares[computerMove].textContent = gameParameters.gameboard[computerMove];
            gameParameters.player1.moves.push(computerMove);
            player2Turn = true;
            player1Turn = false;
            if (checkWin(gameParameters.player1.moves.map(Number))) {
                score.innerHTML = '';
                gameParameters.player1.score += 1;
                let winnerDisplay = document.createElement('p');
                winnerDisplay.id = 'winnerDisplay';
                winnerDisplay.textContent = (`${gameParameters.player1.name} is the winner!`);
                resultDisplay.appendChild(winnerDisplay);
                let scoreDisplay = document.createElement('p');
                scoreDisplay.textContent = `${gameParameters.player1.score} - ${gameParameters.player2.score}`;
                score.appendChild(scoreDisplay);
                gameOver = true;
                modal.style.display = "block";
                return;
            }   
        } else if (player2Turn === true && player2 == 'computer') {
            let computerMove = computerPlayRandom();
            gameParameters.gameboard[computerMove].push('O');
            squares[computerMove].textContent = gameParameters.gameboard[computerMove];
            gameParameters.player2.moves.push(computerMove);
            player1Turn = true;
            player2Turn = false;
            if (checkWin(gameParameters.player2.moves.map(Number))) {
                score.innerHTML = '';
                gameParameters.player2.score += 1;
                let winnerDisplay = document.createElement('p');
                winnerDisplay.id = 'winnerDisplay';
                winnerDisplay.textContent = (`${gameParameters.player2.name} is the winner!`);
                resultDisplay.appendChild(winnerDisplay);
                let scoreDisplay = document.createElement('p');
                scoreDisplay.textContent = `${gameParameters.player1.score} - ${gameParameters.player2.score}`;
                score.appendChild(scoreDisplay);
                gameOver = true;
                modal.style.display = "block";
                return;
            }   
        } 
        if (gameParameters.player1.moves.length === 5) {
            score.innerHTML = '';
            let tieDisplay = document.createElement('p');
            tieDisplay.id = 'winnerDisplay';
            tieDisplay.textContent = ("It's a tie :/");
            resultDisplay.appendChild(tieDisplay);
            let scoreDisplay = document.createElement('p');
            scoreDisplay.textContent = `${gameParameters.player1.score} - ${gameParameters.player2.score}`;
            score.appendChild(scoreDisplay);
            gameOver = true;
            modal.style.display = "block";
            return;
        } 
    }
}