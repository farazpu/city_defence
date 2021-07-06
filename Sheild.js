class Sheild {
  constructor(position, size) {
    this.position = position;
    this.size = size
  }
  
  draw() {
    if(gameInfo.gameStatus == "game_over") {
      fill("white")
    } else {
      fill("green")
    }
    
    const size = this.getSize()
    this.position = mouseX - (size / 2);
    rect(this.position, 300, size, 10);
  }

  getSize() {
    return 20 * this.size
  }

  rect() {
    if(gameInfo.gameStatus == "game_over") {
      return {
        x: -300, 
        y: 300, 
        width: this.getSize(),
        height: 10
      }
    } else {
      return {
        x: this.position, 
        y: 300, 
        width: this.getSize(),
        height: 10
      }
    }
  }
}