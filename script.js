const container = document.getElementById('container');
let squares = document.getElementsByClassName('square');
let arraySquares = Array.from(squares);
let clear = document.getElementById('clear');
let player1Turn = true;
let player2Turn = false;
let resultDisplay = document.getElementById('result');

const game = {
    gameboard: [
        [],[],[],
        [],[],[],
        [],[],[],
    ],
    player1: {
        signPlacement: [],
        name: 'Player 1',
    },
    player2: {
        signPlacement: [],
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
        element.addEventListener('click', function() {
            if (squares[element.dataset.id].textContent == '') {
                if (player1Turn) {
                game.gameboard[element.dataset.id].push('X');
                squares[element.dataset.id].textContent = game.gameboard[element.dataset.id];
                game.player1.signPlacement.push(element.dataset.id);
                player1Turn = false;
                player2Turn = true;
                    if (checkWin(game.player1.signPlacement.map(Number))) {
                        console.log(`${game.player1.name} is the winner!`)
                        return;
                    }
                } else if (player2Turn) {
                    game.gameboard[element.dataset.id].push('O');
                    squares[element.dataset.id].textContent = game.gameboard[element.dataset.id];
                    game.player2.signPlacement.push(element.dataset.id);
                    player1Turn = true;
                    player2Turn = false;
                        if (checkWin(game.player2.signPlacement.map(Number))) {
                            console.log(`${game.player2.name} is the winner!`);
                            return;
                        }
                }
            }
            if (game.player1.signPlacement.length === 5) {
                console.log("It's a tie :/");
            }
        });
    });
})();

clear.onclick = () => {
    arraySquares.forEach(element => {
       element.textContent = '';
       game.gameboard[element.dataset.id].pop();
       game.player1.signPlacement = [];
       game.player2.signPlacement = [];
       player1Turn = true;
       player2Turn = false;
    });
};