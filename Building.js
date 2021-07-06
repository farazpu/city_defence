class Building {
  constructor(position, color, width, height) {
    this.position = position;
    this.color = color
    this.width = width
    this.height = height
  }

  draw() {
    if(gameInfo.gameStatus == "game_over") {
      if(this.height > 0) {
        this.height = this.height - .3
      }
    } 
    fill(this.color)
    
    rect(this.position, 400 - this.height, this.width, this.height);
  }  

  rect() {
    return {
      x: this.position, 
      y: 400 - this.height, 
      width: this.width,
      height: this.height
    }
  }

}