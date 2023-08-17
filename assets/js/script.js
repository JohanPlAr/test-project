const openGameBtn = document.getElementById("open-game");
const readRulesBtn = document.getElementById("read-rules");
const theGame = document.querySelector(".the-game");
const mainMenu = document.querySelector(".main-menu");
const rulesModal = document.getElementById("rules-modal");
const afterWinModal = document.getElementById("after-win-modal");

openGameBtn.addEventListener("click", () => {
  theGame.style.display = "block";
  mainMenu.style.display = "none";
});
readRulesBtn.addEventListener("click", () => {
  rulesModal.style.display = "flex";
  theGame.style.display = "none";
});
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
rulesModal.style.display = "none";
}

function runGame() {

  let gameArrays = [[], [], [], [], [], [], []];
  let turn = 0;
  let gameColumns = document.getElementsByClassName("game-column");
  let p1Score = 0;
  let p2Score = 0;
  
  function resetGame(){
    p1Score = 0;
    p2Score = 0;
    document.getElementById("p1-turn").style.backgroundColor = "red";
    document.getElementById("p1-turn-text").innerText = "Next Play";
    document.getElementById("p2-turn").style.backgroundColor = "";
    document.getElementById("p2-turn-text").innerText = "";
    let boxes = document.querySelectorAll('.game-box');
    boxes.forEach(function(box) {
       box.classList.remove('active');
       box.style.backgroundColor = "white";
    });
    
  }
    resetGame()






function markColumn() {
  let markedColumns = document.querySelectorAll(".game-column");
  markedColumns.forEach(function (column) {
    column.addEventListener("mouseover", function () {
      column.style.backgroundColor = "";
      let boxes = Array.from(column.querySelectorAll(".game-box"));
      boxes = boxes.filter((x) => !x.classList.contains("active"));
      console.log(boxes);
      if (turn % 2 === 0){
      boxes.at(-1).style.backgroundColor = "red";}
      else {
        boxes.at(-1).style.backgroundColor = "yellow";}
    });
    column.addEventListener("mouseout", function () {
      let boxes = Array.from(column.querySelectorAll(".game-box"));
      boxes = boxes.filter((x) => !x.classList.contains("active"));
      column.style.backgroundColor = "initial";
      boxes.at(-1).style.removeProperty("background-color");
    });
  });
}



function choseColumn() {
  let playerColumn = 0;
  for (let i = 0; i < gameColumns.length; i++)
    gameColumns[i].addEventListener("click", function () {
      playerColumn = i;
      console.log(playerColumn);
      console.log(turn);
      if (turn % 2 === 0) {
        addCoin(playerColumn, "red");
        document.getElementById("p1-turn").style.backgroundColor = "white";
        document.getElementById("p2-turn").style.backgroundColor = "yellow";
        document.getElementById("p2-turn-text").innerText = "Next Play";
        document.getElementById("p1-turn-text").innerText = "";
      } else {
        addCoin(playerColumn, "yellow");
        document.getElementById("p2-turn").style.backgroundColor = "white";
        document.getElementById("p1-turn").style.backgroundColor = "red";
        document.getElementById("p1-turn-text").innerText = "Next Play";
        document.getElementById("p2-turn-text").innerText = "";
      }
            
    });
  }

function checkWinner(color) {
if (turn > 41) {
  turn = 0
  let draw = true
  afterWinMenu(color, draw)
}  
 
    for (let i = 0; i < gameArrays.length; i++) {
        for (let j = 0; j < gameArrays[i].length; j++){
            
            if (i<4 && gameArrays[i][j]== color &&
                 gameArrays[i+1][j]== color &&
                  gameArrays[i+2][j]== color &&
                   gameArrays[i+3][j]== color){
                console.log(`${color} wins`);
                gameScore(color);
                afterWinMenu(color);
                                               
            }
            if (gameArrays[i][j]== color &&
                 gameArrays[i][j+1]== color &&
                  gameArrays[i][j+2]== color &&
                   gameArrays[i][j+3]== color){
                console.log(`${color} wins`);
                gameScore(color);
                afterWinMenu(color);
         
            }
            if (i<4 && gameArrays[i][j]== color &&
                 gameArrays[i+1][j+1]== color &&
                  gameArrays[i+2][j+2]== color &&
                   gameArrays[i+3][j+3]== color){
                console.log(`${color} wins`);
                gameScore(color);
                afterWinMenu(color);
               
            }
            if (i>2 && gameArrays[i][j]== color &&
                 gameArrays[i-1][j-1]== color &&
                  gameArrays[i-2][j-2]== color &&
                   gameArrays[i-3][j-3]== color){
                console.log(`${color} wins`);
                gameScore(color);
                afterWinMenu(color);
               
            }
            if (i>2 && gameArrays[i][j]== color && 
                gameArrays[i-1][j+1]== color && 
                gameArrays[i-2][j+2]== color && 
                gameArrays[i-3][j+3]== color){
                console.log(`${color} wins`);
                gameScore(color);
                afterWinMenu(color)               
            }
           
}

}
    }

function displayCoins(color) {
  for (let i = 0; i < gameArrays.length; i++) {
    for (let j = 0; j < gameArrays[i].length; j++) {
      if (gameArrays[i][j] == color) {
        document.getElementById(`x${j + 1}, y${i + 1}`).style.backgroundColor =
          color;
        document.getElementById(`x${j + 1}, y${i + 1}`).classList.add("active");
      }
      
    }
  }
}

function gameScore(color) {
if (color == "red"){
    p1Score += 1;
    document.getElementById("p1-score").innerText = `Score ${p1Score}`;    }
if (color == "yellow"){p2Score += 1
    document.getElementById("p2-score").innerText = `Score ${p2Score}`;   }
console.log(p1Score, p2Score)
}

function addCoin(playerColumn, color) {
  turn += 1;
  if (gameArrays[playerColumn].length < 6) {
    gameArrays[playerColumn].push(color);
  }
  console.log(gameArrays[playerColumn]);
  displayCoins(color);
  checkWinner(color);
}

function resetBoard(){ 
  let boxes = document.querySelectorAll('.game-box');
  boxes.forEach(function(box) {
     box.classList.remove('active');
     box.style.backgroundColor = "white";
    });
gameArrays = [[], [], [], [], [], [], []];
}

function resetScore(){
    let p1Score = 0;
    let p2Score = 0;
    document.getElementById("p1-score").innerText = `Score ${p1Score}`;
    document.getElementById("p2-score").innerText = `Score ${p2Score}`;
}

function afterWinMenu(color, draw){ 
resetBoard()
if (turn > 41) {
  turn = 0}
afterWinModal.style.display = "flex";
let span = document.getElementsByClassName("close")[1];
span.onclick = function() {
afterWinModal.style.display = "none";
}

if (draw == true){
  document.getElementById("winner-text").innerText = `It's a draw`;
}
else {
  document.getElementById("winner-text").innerText = `${color} Wins!`;
  }
newRound();
}

markColumn();
choseColumn();
let resetBoardButton = document.getElementById("reset-board-button");
resetBoardButton.addEventListener("click", resetBoard);
let resetScoreButton = document.getElementById("reset-score-button");
resetScoreButton.addEventListener("click", resetScore)


function newRound(){
  let newRoundButton = document.getElementById("new-round-button");
  newRoundButton.onclick = function() {
    afterWinModal.style.display = "none";
  }
}
function quitGame(){window.location.reload()} 

let quitGameButton = document.getElementById("quit-game-button");
quitGameButton.addEventListener("click", quitGame);
}

let clickCount = 0;
let startButton = document.getElementById("start-button");
function handleClick() {
  clickCount++;
  if (clickCount > 1) {
    clickCount = 0;
    alert("Warning! Clicking the 'Play Game'-button again will reset the score, erase board and the game will start from the beginning")   
    }
   
  else {runGame()}
}
startButton.addEventListener("click", handleClick);

