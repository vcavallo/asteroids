Function.prototype.inherits = function (SuperClass) {
  function Surrogate() { };
  Surrogate.prototype = SuperClass.prototype;
  this.prototype = new Surrogate();
};

(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (pos, vel, game_dims) {
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR, game_dims);
  };

  Asteroid.RADIUS = 5;
  Asteroid.COLOR = "white";
  Asteroid.MAX_VELOCITY = 15;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.placeAsteroid = function (dimX, dimY) {
    var posX = dimX * Math.random(),
    	posY = dimY * Math.random();

	var xCenterDiff = dimX / 2 - posX,
		yCenterDiff = dimY / 2 - posY;
	
	var xCorrection = dimX / 4,
	    yCorrection = dimY / 4;

	if(Math.abs(xCenterDiff) < xCorrection) {				
		xCorrection = (xCenterDiff > 0) ? xCorrection * -1 : xCorrection;
		posX += xCorrection;
	} else if (Math.abs(yCenterDiff) < yCorrection) {
		yCorrection = (yCenterDiff > 0) ? yCorrection * -1 : yCorrection;
		posY += yCorrection ; 
	}
	
	return [posX, posY];
  }

  Asteroid.randomAsteroid = function (dimX, dimY) {
    return new Asteroid(
      Asteroid.placeAsteroid(dimX, dimY),
      [Asteroid.MAX_VELOCITY * Math.random() - (Asteroid.MAX_VELOCITY / 2),
       Asteroid.MAX_VELOCITY * Math.random() - (Asteroid.MAX_VELOCITY / 2)],
      [dimX, dimY]
    );
  };

})(this);