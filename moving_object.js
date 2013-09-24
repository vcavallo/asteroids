(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var MovingObject = Asteroids.MovingObject = function(pos, vel, rad, color, game_dims){
    this.pos = pos;
    this.vel = vel;
    this.rad = rad;
    this.color = color;
    this.game_dims = game_dims;
  }

  MovingObject.prototype.move = function() {
    //Assume timestep of 1 unit
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  MovingObject.prototype.wrapMove = function(){
    this.pos[0] = (this.pos[0] + this.vel[0]) % this.game_dims[0];
    this.pos[1] = (this.pos[1] + this.vel[1]) % this.game_dims[1];

    if(this.pos[0] < 0) { this.pos[0] = this.game_dims[0]; }
    if(this.pos[1] < 0) { this.pos[1] = this.game_dims[1]; }
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.rad,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

  MovingObject.prototype.isCollidedWith = function(otherObject) {

    var distance = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
                   Math.pow((this.pos[1] - otherObject.pos[1]), 2))

    return ((this.rad + otherObject.rad) >= distance)
  }

})(this);