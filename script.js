const COLORS = {
    "2": '#e1eded',
    "4": '#a2dadb ',
    "8": '#cfa255',
    "16": '#d97d32',
    "32": '#912d06',
    "64": '#bf1a08',
    "128": '#fad20a',
    "256": '#dbba16',
    "512": '#967e06',
    "1024": '#695807',
    "2048": '#0f0d00'
};

const message = document.querySelector("#message");
let tiles = document.querySelectorAll('.tile');

const GRID = {};

let tileNumber = 0
for (let i = 3; i > -1 ; i--) {
    for (let j = 0; j < 4; j++) {
        GRID[`${j},${i}`] = tiles[tileNumber];
        tileNumber ++;
    }
}

document.addEventListener('keydown',function(event){
    event.preventDefault();
    if (condition) {
        message.textContent = event.key;
    }
})

function ProcessMovement(direction){

}