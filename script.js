const container = document.getElementById('container');
let squares = document.getElementsByClassName('square');
let arraySquares = Array.from(squares);
let clear = document.getElementById('clear');

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

arraySquares.forEach(element => {
    element.addEventListener('click', function() {
        if (squares[element.dataset.id].textContent == '') {
        game.gameboard[element.dataset.id].push(element.dataset.id);
        squares[element.dataset.id].textContent = game.gameboard[element.dataset.id];
        }
    });
});

clear.onclick = () => {
    arraySquares.forEach(element => {
       element.textContent = '';
       game.gameboard[element.dataset.id].pop();
    });
};