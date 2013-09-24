Function.prototype.inherits = function (SuperClass) {
  function Surrogate() { };
  Surrogate.prototype = SuperClass.prototype;
  this.prototype = new Surrogate();
};

(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (pos, vel, dim) {
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR, dim);
  };

  Asteroid.RADIUS = 5;
  Asteroid.COLOR = "LightCoral";
  Asteroid.MAX_VELOCITY = 100;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.prototype.test = function () { }

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