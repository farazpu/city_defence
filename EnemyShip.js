class EnemyShip {
  constructor(position, lastFired = 0) {
    this.position = position;
    this.direction = 1
    this.lastFired = lastFired
  }

  move() {
    if (this.position > 400 - 55) {
      this.direction = -1
    }
    if (this.position < 0) {
      this.direction = 1
    }
    
    this.position += this.direction * 2
    this.lastFired++;
    
    if(this.lastFired > 50) {
      if(gameInfo.gameStatus != "game_over" && gameInfo.gameStatus != "last_stage") {
        rockets.push(new Rocket(this.position, 20))
        this.lastFired = 0
      }
    }
  }
  
  draw() {
    if(gameInfo.gameStatus == "game_over") {
      fill("brown")
    } else if(gameInfo.gameStatus == "last_stage") {
      fill("orange")
      const hit = collideRectRect(this.position, 20, 55, 55, 195, bigBertha.fireY, 30, 30);
      if(hit) {
        const index = enemyShips.indexOf(this);
        if (index > -1) {
          enemyShips.splice(index, 1);
        }    
      }

    } else {
      fill("red")
    }

    rect(this.position, 20, 55, 55);
    // text(this.lastFired, this.position + 5, 15);
  }
}