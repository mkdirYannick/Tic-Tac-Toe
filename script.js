const container = document.getElementById('container');
let squares = document.getElementsByClassName('square');
let arraySquares = Array.from(squares);
let clear = document.getElementById('clear');
let player1Turn = true;
let player2Turn = false;

const game = {
    gameboard: [
        [],[],[],
        [],[],[],
        [],[],[],
    ],
    player1: {},
    player2: {},
    updateGameBoard: function() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = game.gameboard[i];
        }
    },
}

function playGame() {
    arraySquares.forEach(element => {
        element.addEventListener('click', function() {
            if (squares[element.dataset.id].textContent == '')
                if (player1Turn) {
                game.gameboard[element.dataset.id].push('O');
                squares[element.dataset.id].textContent = game.gameboard[element.dataset.id];
                player1Turn = false;
                player2Turn = true;
                } else if (player2Turn) {
                    game.gameboard[element.dataset.id].push('X');
                    squares[element.dataset.id].textContent = game.gameboard[element.dataset.id];
                    player1Turn = true;
                    player2Turn = false; 
                }
            });
    });
}

playGame();

clear.onclick = () => {
    arraySquares.forEach(element => {
       element.textContent = '';
       game.gameboard[element.dataset.id].pop();
    });
};