class ScoreBoard {
  constructor() {
    this.currentWaveIndex = 0
    this.rocketsBlocked = 0
    this.impact = 0
  }

  draw() {
    if(gameInfo.gameStatus == "last_stage") {
      fill("blue")
      text("Fire at enemy ships", 10, -20)
      text("Enemy ships: " + enemyShips.length, 120, -20)
    } else {
      this.readInfo()
      fill("blue")
      text("Wave: " + (this.currentWaveIndex + 1) + " of " + this.totalWaves, 10, -20)
      text("Blocked: " + this.rocketsBlocked + "/" + this.rocketsInWave, 120, -20)
      text("City Hits: " + this.impact, 250, -20)
  
      if(this.rocketsBlocked > this.rocketsInWave - 1) {
        gameInfo.gameStatus = "wave_complete"
        this.currentWaveIndex++
        this.rocketsBlocked = 0
      }
    }
  }

  readInfo() {
    if(this.currentWaveIndex >= waves.length) {
      gameInfo.gameStatus = "last_wave_complete"
    } else {
      this.rocketsInWave = this.currentWave().rtb
      this.totalWaves = waves.length
    }
  }

  currentWave() {
    return waves[this.currentWaveIndex]
  }
}