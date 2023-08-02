function runGame() {

let turn = 0;
let gameArrays = [[], [], [], [], [], [], []];

function markColumn() {
  let gameColumns = document.querySelectorAll(".game-column");
  gameColumns.forEach(function (div) {
    div.addEventListener("mouseover", function () {
      div.style.backgroundColor = "green";
    });
    div.addEventListener("mouseout", function () {
      div.style.backgroundColor = "initial";
    });
  });
}

function choseColumn() {
  let gameColumns = document.getElementsByClassName("game-column");
  let playerColumn = 0;
  for (let i = 0; i < gameColumns.length; i++)
    gameColumns[i].addEventListener("click", function () {
      playerColumn = i;
      console.log(playerColumn);
      console.log(turn);
      if (turn % 2 === 0) {
        addCoin(playerColumn, "red");
      } else {
        addCoin(playerColumn, "yellow");
      }
      turn += 1;
    });
  }

function checkWinner(color) {
    for (let i = 0; i < gameArrays.length; i++) {
        for (let j = 0; j < gameArrays[i].length; j++){ 
            if (i<5 && gameArrays[i][j]== color && gameArrays[i+1][j]== color && gameArrays[i+2][j]== color && gameArrays[i+3][j]== color){
                console.log("You win");
                document.getElementById("winner-text").innerText = `${color} Wins!`;
                
            }
            if (gameArrays[i][j]== color && gameArrays[i][j+1]== color && gameArrays[i][j+2]== color && gameArrays[i][j+3]== color){
                console.log("You win");
                document.getElementById("winner-text").innerText = `${color} Wins!`;
                
            }
            if (i<6 && gameArrays[i][j]== color && gameArrays[i+1][j+1]== color && gameArrays[i+2][j+2]== color && gameArrays[i+3][j+3]== color){
                console.log("You win");
                document.getElementById("winner-text").innerText = `${color} Wins!`;
                
            }
            if (i>2 && gameArrays[i][j]== color && gameArrays[i-1][j-1]== color && gameArrays[i-2][j-2]== color && gameArrays[i-3][j-3]== color){
                console.log("You win");
                document.getElementById("winner-text").innerText = `${color} Wins!`;
                
            }
            if (i>2 && gameArrays[i][j]== color && gameArrays[i-1][j+1]== color && gameArrays[i-2][j+2]== color && gameArrays[i-3][j+3]== color){
                console.log("You win");
                document.getElementById("winner-text").innerText = `${color} Wins!`;
                
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
      }
      
    }
  }
}

function gameScore() {}

function addCoin(playerColumn, color) {
  if (gameArrays[playerColumn].length < 6) {
    gameArrays[playerColumn].push(color);
  }
  console.log(gameArrays[playerColumn]);
  displayCoins(color);
  checkWinner(color);
}

markColumn();
choseColumn();
}

runGame()