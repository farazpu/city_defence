class BigBertha {
  constructor(height) {
    this.y = 400
    this.firing = false
    this.fireY = 350
  }

  draw() {

    if(this.y > 235) {
      this.y--
    }
    image(bigBerthaImage, 120, this.y);

    if(this.firing) {
      this.fireY -= 2
      fill('red')
      circle(195, this.fireY, Math.min(40, (350 - this.fireY)/2));

      if(this.fireY < 50) {
        this.firing = false
        this.fireY = 350
      }
    }
   
  }

  fire() {
    if(!this.firing) {
      this.firing = true
    }
    
  }
}