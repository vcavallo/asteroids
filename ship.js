(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel, game_dims){
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR, game_dims);
  }

  Ship.RADIUS = 24;
  Ship.COLOR = "white";

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.fireBullet = function(bulletsArray) {
    if(this.vel[0] !== 0 || this.vel[1] !== 0) {
      var shipX = this.pos[0];
      var shipY = this.pos[1];
      bulletsArray.push(new Asteroids.Bullet([shipX, shipY], this.direction()));
    }
  }

  Ship.prototype.direction = function() {
    var speed = Math.sqrt((Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2)));
	
	//Makes bullet 10X faster then the ship
    speed /= 10 
    return [this.vel[0] / speed, this.vel[1] / speed];
  }

  Ship.prototype.angle = function () {
	//y must be flipped to get to Cartesian system
    var degrees = Math.atan2(this.vel[0],-this.vel[1]);
	
	return Math.round(degrees * 180/Math.PI)
  }

  Ship.prototype.draw = function(ctx, img) {    	 
	function drawRotatedImage(image, x, y, angle) { 
		var TO_RADIANS = Math.PI/180;
		ctx.save(); 
		ctx.translate(x, y);
		ctx.rotate(angle * TO_RADIANS);
		
		ctx.drawImage(image, -(image.width/2), -(image.height/2));
		ctx.restore(); 
	}
		
	drawRotatedImage(img, this.pos[0], this.pos[1], this.angle());
  }

})(this);