(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel, game_dims){
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR, game_dims);
  }

  Ship.RADIUS = 10;
  Ship.COLOR = "Gray";

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.fireBullet = function(bulletsArray) {
    if(this.vel[0] !== 0 || this.vel[1] !== 0) {
      var shipX = this.pos[0];
      var shipY = this.pos[1];
      bulletsArray.push(new Asteroids.Bullet([shipX,shipY], this.direction()));
    }
  }

  Ship.prototype.direction = function() {
    var speed = Math.sqrt((Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2)));
    speed = speed / 10 //make the bullet 10X faster then the ship
    return [this.vel[0] / speed, this.vel[1] / speed];
  }

})(this);