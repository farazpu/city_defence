class Rocket {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = "orange"
    this.exploded = false
    this.explodeTime = 30
    this.destroyed = false
  }
  
  move() {
    if(this.exploded) {
      this.explodeTime--
      if(this.explodeTime < 0) {
        this.destroyed = true
      }
    } else if(this.colided()) {
      this.explode()
    } else {
      this.y += 1
    }
  }

  colided() {
    if(this.colidedWithShield() || this.collidedWithCity()) {
      this.explode()
    }
  }

  colidedWithShield() {
    const sr = sheild.rect()
    const rr = this.rect()
    const hit = collideRectRect(sr.x, sr.y, sr.width, sr.height, rr.x, rr.y, rr.width, rr.height);
    if(hit == true) {
      scoreBoard.rocketsBlocked++
    }
    
    return hit
  }

  collidedWithCity() {
    let hit = false
    for(var building of buildings) {
      const br = building.rect()
      br.y += 15
      const rr = this.rect()
      hit = collideRectRect(br.x, br.y, br.width, br.height, rr.x, rr.y, rr.width, rr.height);
      if(hit == true) {
        scoreBoard.impact++
        return true
      }
    }
    return false
  }

  rect() {
    return {
      x: this.x, 
      y: this.y, 
      width: 5,
      height: 15
    }
  }
  
  draw() {
    fill(this.color)
    if(this.exploded) {
      circle(this.x, this.y, 30);
    } else {
      rect(this.x, this.y, 5, 15);
    }
  }
  
  explode() {
    this.color = "red"
    this.exploded = true
  }

  remove() {
    const index = rockets.indexOf(this);
    if (index > -1) {
      rockets.splice(index, 1);
    }    
  }
}