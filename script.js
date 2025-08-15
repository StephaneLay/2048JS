const COLORS = {
    '': 'gray',
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
//RECUP ELEMENTS
const message = document.querySelector("#message");
let tiles = document.querySelectorAll('.tile');


//MAPPING SUR GRID
const GRID = {};

let tileNumber = 0

for (let i = 3; i > -1; i--) {
    for (let j = 0; j < 4; j++) {
        GRID[`${j},${i}`] = tiles[tileNumber];
        tileNumber++;
    }
}

//Lancement de jeu
spawnTile();

//inputs
document.addEventListener('keydown', function (event) {
    event.preventDefault();
    switch (event.key) {
        case 'ArrowRight':
            processMovement('desc', 'desc', false);
            break;
        case 'ArrowLeft':
            processMovement('desc', 'asc', false);
            break;
        case 'ArrowUp':
            processMovement('asc', 'desc', true);
            break;
        case 'ArrowDown':
            processMovement('asc', 'asc', true);
            break;
        default:
            return;
    }
})



// La plus complexe : le behavior des tiles selon les deplacements inputs par l'user
// D'abord on doit recuperer un système de lignes dans la bonne direction , pour ca on doit avoir deux boucles for qui s'incremente/decremente dans le bon sens
// Le but , c'est qu'elles fournissent , dans l'ordre exact , les coordonnées des tuiles sur lesquelles on va iterer
// Une fois ces clés faites, on ignore la premiere de chaque ligne mais on la garde en mémoire
// Ensuite, on cherche à recuperer la tuile la plus proche de celle sur laquelle on itere actuellement.
// Si elle n'existe pas : on la déplace direct sur la premiere case de la ligne.
// Si elle existe , on verifie si elles doivent fusionner ( meme valeur)
// Si oui, on les fusionne , si non , on déplace notre tuile juste "derriere"(dans le sens adéquat).
function processMovement(loop1, loop2, regularOrder) {
    for (let i = loop1 == 'asc' ? 0 : 3; loop1 == 'asc' ? i < 4 : i > -1; loop1 == 'asc' ? i++ : i--) {
        let currentLineKeys = []
        for (let j = loop2 == 'asc' ? 0 : 3; loop2 == 'asc' ? j < 4 : j > -1; loop2 == 'asc' ? j++ : j--) {
            let key = regularOrder ? `${i},${j}` : `${j},${i}`;
            if (currentLineKeys.length > 0 && GRID[key].textContent !== '') {
                let keysByClosest = [];
                for (const currentKey of currentLineKeys) {
                    keysByClosest.unshift(currentKey);
                }
                let closestTile;
                let closestTileKey;
                for (const tileKey of keysByClosest) {
                    if (GRID[tileKey].textContent !== '') {
                        closestTile = GRID[tileKey];
                        closestTileKey = tileKey;
                        break;
                    }
                }
                if (closestTile === undefined) {
                    console.log('move', key, currentLineKeys[0])
                    moveTile(GRID[key], GRID[currentLineKeys[0]]);
                } else {
                    if (closestTile.textContent === GRID[key].textContent) {
                        console.log('merge', key, closestTile)
                        mergeTiles(GRID[key], closestTile);

                    } else {
                        closestNeighbourKey = currentLineKeys[currentLineKeys.indexOf(closestTileKey) + 1];
                        if (closestNeighbourKey) {
                            console.log('moveclosestNeighbourKey', key, closestNeighbourKey)
                            moveTile(GRID[key], GRID[closestNeighbourKey])
                        }


                    }
                }

            }
            currentLineKeys.push(key);
        }
    }
    spawnTile();

}

function spawnTile() {
    let emptyTiles = [];
    for (const tile of tiles) {
        if (tile.textContent === '') {
            emptyTiles.push(tile);
        }
    }

    if (emptyTiles.length <1) {
        endGame();
    }

    let spawnValue = Math.random() < 0.90 ? '2' : '4';
    setTile(emptyTiles[Math.floor(Math.random() * emptyTiles.length)], spawnValue);
}

function setTile(tile, value) {
    tile.textContent = value;
    tile.style.backgroundColor = COLORS[value];
}

function moveTile(originTile, destinationTile) {
    setTile(destinationTile, originTile.textContent);
    setTile(originTile, "");
}

function mergeTiles(originTile, destinationTile) {
    let value = parseInt(destinationTile.textContent);
    let newValue = (value * 2).toString();
    setTile(destinationTile, newValue);
    setTile(originTile, "");
}


//ON DOIT RANGER UN PEU POUR ANNULER L'EVENT DE KEYDOWN , MAIS POUR CA ON DOIT NOMMER LA FONCTION DE DOCUMENT EVENT LISTENER
function endGame(){
    for (const tile of tiles) {
        tiles.textContent = "*";
        // document.removeEventListener('keydown',function);
    }
    message.textContent = "You lose";
}