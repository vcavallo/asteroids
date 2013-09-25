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
  Asteroid.MAX_VELOCITY = 8;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function (dimX, dimY) {
    return new Asteroid(
      [dimX * Math.random(),
       dimY * Math.random()],
      [Asteroid.MAX_VELOCITY * Math.random(),
       Asteroid.MAX_VELOCITY * Math.random()],
       [dimX, dimY]
    );
  };

})(this);