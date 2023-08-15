const openGameBtn = document.getElementById("open-game");
const theGame = document.querySelector(".the-game");
const mainMenu = document.querySelector(".main-menu");
openGameBtn.addEventListener("click", () => {
  theGame.style.display = "block";
  mainMenu.style.display = "none";
})
function runGame() {

let turn = 0;
let gameArrays = [[], [], [], [], [], [], []];
let gameColumns = document.getElementsByClassName("game-column");
let p1Score = 0;
let p2Score = 0;


function markColumn() {
  let markedColumns = document.querySelectorAll(".game-column");
  markedColumns.forEach(function (column) {
    column.addEventListener("mouseover", function () {
      column.style.backgroundColor = "green";
      let boxes = Array.from(column.querySelectorAll(".game-box"));
      boxes = boxes.filter((x) => !x.classList.contains("active"));
      console.log(boxes);
      boxes.at(-1).style.backgroundColor = "grey";
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
        document.getElementById("p2-turn-text").innerText = "Next play";
        document.getElementById("p1-turn-text").innerText = "";
      } else {
        addCoin(playerColumn, "yellow");
        document.getElementById("p2-turn").style.backgroundColor = "white";
        document.getElementById("p1-turn").style.backgroundColor = "red";
        document.getElementById("p1-turn-text").innerText = "Next play";
        document.getElementById("p2-turn-text").innerText = "";
      }
      turn += 1;
    });
  }

function checkWinner(color) {
    for (let i = 0; i < gameArrays.length; i++) {
        for (let j = 0; j < gameArrays[i].length; j++){
            
            if (i<4 && gameArrays[i][j]== color &&
                 gameArrays[i+1][j]== color &&
                  gameArrays[i+2][j]== color &&
                   gameArrays[i+3][j]== color){
                console.log("You win");
                document.getElementById("winner-text").innerText = `${color} Wins!`;
                gameScore(color);
                afterWinMenu()
             
              
                     
            }
            if (gameArrays[i][j]== color &&
                 gameArrays[i][j+1]== color &&
                  gameArrays[i][j+2]== color &&
                   gameArrays[i][j+3]== color){
                console.log("You win");
                document.getElementById("winner-text").innerText = `${color} Wins!`;
                gameScore(color);
         
            }
            if (i<4 && gameArrays[i][j]== color &&
                 gameArrays[i+1][j+1]== color &&
                  gameArrays[i+2][j+2]== color &&
                   gameArrays[i+3][j+3]== color){
                console.log("You win");
                document.getElementById("winner-text").innerText = `${color} Wins!`;
                gameScore(color);
               
            }
            if (i>2 && gameArrays[i][j]== color &&
                 gameArrays[i-1][j-1]== color &&
                  gameArrays[i-2][j-2]== color &&
                   gameArrays[i-3][j-3]== color){
                console.log("You win");
                document.getElementById("winner-text").innerText = `${color} Wins!`;
                gameScore(color);
               
            }
            if (i>2 && gameArrays[i][j]== color && 
                gameArrays[i-1][j+1]== color && 
                gameArrays[i-2][j+2]== color && 
                gameArrays[i-3][j+3]== color){
                console.log("You win");
                document.getElementById("winner-text").innerText = `${color} Wins!`;
                gameScore(color);
               
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
      });
    for (let i = 0; i < gameArrays.length; i++) {
        for (let j = 0; j < gameArrays[i].length; j++) {
            document.getElementById(`x${j + 1}, y${i + 1}`).style.backgroundColor = "white";
          
          
}
}
gameArrays = [[], [], [], [], [], [], []];
document.getElementById("winner-text").innerText = "";

}
function resetScore(){
    let p1Score = 0;
    let p2Score = 0;
    document.getElementById("p1-score").innerText = `Score ${p1Score}`;
    document.getElementById("p2-score").innerText = `Score ${p2Score}`;
}

function afterWinMenu(){   
resetBoard()  
let modal = document.getElementById("modal");
modal.style.display = "flex";
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
modal.style.display = "none";

}
}

markColumn();
choseColumn();
let resetBoardButton = document.getElementById("reset-board-button");
resetBoardButton.addEventListener("click", resetBoard);
let resetScoreButton = document.getElementById("reset-score-button");
resetScoreButton.addEventListener("click", resetScore)
}

let startButton = document.getElementById("start-button");
startButton.addEventListener("click", runGame);