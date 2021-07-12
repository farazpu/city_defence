const GAME_OVER_IMPACTS = 2

var enemyShips;
var rockets;
var buildings;
var scoreBoard;
var bigBertha;
var sheild;
var waves;
// var currentWave;
// var currentWaveIndex;
var gameInfo;

let bigBerthaImage;
function preload() {
  bigBerthaImage = loadImage('cannon.png');
}

function resetGame() {
  waves = []
  // waves.push(new EnemyWave(2, 1, 1))
  // waves.push(new EnemyWave(2, 1, 2))
  // waves.push(new EnemyWave(3, 2, 2))
  // waves.push(new EnemyWave(3, 2, 3))

  enemyShips = []
  rockets = []
  buildings = []
  scoreBoard = new ScoreBoard()
  bigBertha = new BigBertha()
  sheild = new Sheild(30, 3)
  
  enemyShips.push(new EnemyShip(30))
  enemyShips.push(new EnemyShip(200, 25))
  
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  for(var i = 0; i < 20; i++) {
    buildings.push(new Building(i * 20, CSS_COLOR_NAMES[i], 30, getRandom(20, 70)))
  }
  
  
  // currentWave = waves[0]
  // currentWaveIndex = 0
  
  gameInfo = {
    gameStatus: "init" // playing, lost, won, paused
  }  
}

function setup() {
  createCanvas(400, 450);
  resetGame();
}

function draw() {
  if(gameInfo.gameStatus == "init") {
    startScreen()
  } else if (gameInfo.gameStatus == "paused") {
    pauseScreen()
  } else if (gameInfo.gameStatus == "wave_complete") {
    waveCompleteScreen()
  } else if (gameInfo.gameStatus == "last_wave_complete") {
    lastStageScreen()
  } else if (gameInfo.gameStatus == "last_stage") {
    lastStage()
  } else if (gameInfo.gameStatus == "game_won") {
    gameWonScreen()
  } else {
    game()
  }
}

function mouseClicked() {
  
  if(gameInfo.gameStatus == "init") {
    gameInfo.gameStatus = "playing"
  } else if(gameInfo.gameStatus == "playing") {
    gameInfo.gameStatus = "paused"
  } else if(gameInfo.gameStatus == "paused") {
    gameInfo.gameStatus = "playing"
  } else if(gameInfo.gameStatus == "wave_complete") {
    gameInfo.gameStatus = "playing"
  } else if(gameInfo.gameStatus == "last_wave_complete") {
    gameInfo.gameStatus = "last_stage"
  } else if(gameInfo.gameStatus == "last_stage") {
    bigBertha.fire()
  } else if(gameInfo.gameStatus == "game_over") {
    resetGame()
    gameInfo.gameStatus = "init"
  } else if (gameInfo.gameStatus == "game_won") {    
    resetGame()
    gameInfo.gameStatus = "init"
  }
}
function gameWonScreen() {
  background("lightblue");

  fill("lime")
  rect(0, 0, 400, 50)

  translate(0, 50);
  fill("black")
  rect(0, 0, 400, 270)
  
  for(var building of buildings) {
    building.draw()
  }
  
  bigBertha.draw()

  fill("green")
  rect(100, 200, 200, 100)
  textSize(18);
  fill("white")
  text("You defended the city.", 120, 240)
  text("You win!", 150, 280)
  textSize(12);  
}


function startScreen() {
  background("lightblue");

  fill("lime")
  rect(0, 0, 400, 50)

  translate(0, 50);
  fill("black")
  rect(0, 0, 400, 270)
  fill("white")
  text("Click to start game", 100, 100)
}


function pauseScreen() {
  background("lightblue");

  fill("lime")
  rect(0, 0, 400, 50)

  translate(0, 50);
  fill("black")
  rect(0, 0, 400, 270)
  fill("white")
  text("Game paused. Click to continue game", 100, 100)
}

function waveCompleteScreen() {
  rockets = []
  background("lightblue");

  fill("lime")
  rect(0, 0, 400, 50)

  translate(0, 50);
  fill("black")
  rect(0, 0, 400, 270)
  fill("white")
  if(scoreBoard.currentWaveIndex == waves.length) {
    text("All waves Completed. Click to continue.", 100, 100)
  } else {
    text("Wave Completed. Click to continue to next wave.", 100, 100)
  }
}

function lastStageScreen() {
  rockets = []
  background("lightblue");

  fill("lime")
  rect(0, 0, 400, 50)

  translate(0, 50);
  fill("black")
  rect(0, 0, 400, 270)
  fill("white")
  text("Final Stage. Click to enter.", 100, 100)
}

function gameOverScreen() {
  // background("lightblue");

  // fill("lime")
  // rect(0, 0, 400, 50)

  // translate(0, 50);
  fill("orange")
  rect(100, 200, 200, 100)
  textSize(18);
  fill("red")
  text("Game Over", 150, 260)
  textSize(12);

  if(rockets.length < 5) {
    rockets.push(new Rocket(random(400), 380))
  }
  console.log(rockets.length)
  
  moveRockets();
}


function game() {
  background("lightblue");

  fill("lime")
  rect(0, 0, 400, 50)

  translate(0, 50);
  fill("black")
  rect(0, 0, 400, 270)
  
  for(var ship of enemyShips) {
    ship.move()
    ship.draw()
  }

  for(var building of buildings) {
    building.draw()
  }
  
  moveRockets()
  sheild.draw()
  scoreBoard.draw()

  if(scoreBoard.impact > GAME_OVER_IMPACTS) {
    gameInfo.gameStatus = "game_over"
    fill("orange")
    rect(100, 200, 200, 100)
    textSize(18);
    fill("red")
    text("Game Over", 150, 260)
    textSize(12);  
  }

  if(gameInfo.gameStatus == "last_stage") {
    fill("green")
    rect(100, 200, 200, 100)
    textSize(18);
    fill("white")
    text("Last stage!", 150, 260)
    textSize(12);  
  }

}

function lastStage() {
  background("lightblue");

  fill("lime")
  rect(0, 0, 400, 50)

  translate(0, 50);
  fill("black")
  rect(0, 0, 400, 270)
  
  for(var ship of enemyShips) {
    ship.move()
    ship.draw()
  }

  for(var building of buildings) {
    building.draw()
  }
  
  //sheild.draw()
  scoreBoard.draw()
  bigBertha.draw()

  if(enemyShips.length == 0) {
    gameInfo.gameStatus = "game_won"
  }  

}

function moveRockets() {
  for (var rocket of rockets) {
    rocket.move()
    rocket.draw()
  }

  for (var rocket of rockets) {
    if (rocket.destroyed) {
      rocket.remove()
    }
  }
}

