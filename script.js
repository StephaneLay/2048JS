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

//MAUVCAISE GRILLEs
for (let i = 0; i < 4; i++) {
    for (let j = 3; j >-1; j--) {
        GRID[`${i},${j}`] = tiles[tileNumber];
        tileNumber++;
    }
    
}

console.log(GRID);

//Lancement de jeu
spawnTile();


//inputs
document.addEventListener('keydown', function (event) {
    event.preventDefault();
    switch (event.key) {
        case 'ArrowRight':
            processMovement(3, null, -1); // x : down , y : down
            break;
        case 'ArrowLeft':
            processMovement(0, null, +1); // EXEMPLE de GRID = sur x : up (boucle increment), sur y : down(boucle decrement)
            break;
        case 'ArrowUp':
            processMovement(null, 3, -1); // x : down , y: up  
            break;
        case 'ArrowDown':
            processMovement(null, 0, +1); // x : up , y : up
            break;
        default:
            return;
    }
})

//En priorité : ============> refaire bien la grille , on ne recupere pas les coordonnées dans le bon sens des axes qu'on aime

//EN FAIT ICI ON A LES BONNES CHOSES :

//ON DOIT INCREMENTER LES VALEURS DE SORTE A CE QU'ON REPERE LES BONNES DE DEPART , PUIS QU'ON PARCOUT LES LIGNES DANS LE BON SENS
// ICI ON RECUPRE BIEN ELS BONNES VALEURS DE DEPART , MAIS ON NE SAIT PAS DANS QUEL SENS ET SUR QUEL AXE LES INCREMENTER 
// A FIND OUT MAIS SUREMENT POSSIBLE DE FAIRE QUELQUE CHOSE DE BIEN MIEUX A PARTIR DES CALLBACKS PROCESSMOVEMENTS (BOUCLE SWITCH)

// On devrait , en s'inspirant de la boucle qui recupere les grid( qui sort d'ailleurs la bonne suite pour LEFT), reussir notre algo
// Nomenclature sur inputs !!!!!!!!!!!!!!!!!!!!!!!!!!!

function processMovement(x, y, value) {
    let previousKeys= []
    for (let i = value > 0 ? 0 : 3; value > 0 ? i < 4 : i > -1; value > 0 ? i++ : i--) {
        let key = `${x ?? i},${y ?? i}`;

        //Traitement des tiles => debut d'algo cf CAHIER !

        // if (previousKeys.length > 0) {
        //     for (const key of previousKeys) {
        //         if (GRID[key]) {
                    
        //         }
        //     }
        // }
        previousKeys.push(key);
        
    }
    console.log(previousKeys);
}

function spawnTile() {
    let emptyTiles = [];
    for (const tile of tiles) {
        if (tile.textContent === '') {
            emptyTiles.push(tile);
        }
    }

    let spawnValue = Math.random() < 0.90 ? '2' : '4';
    setTile(emptyTiles[Math.floor(Math.random() * emptyTiles.length)], spawnValue);
}

function setTile(tile, value) {
    tile.textContent = value;
    tile.style.backgroundColor = COLORS[value];
}