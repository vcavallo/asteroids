(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
  };

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.RADIUS = 2;
  Bullet.COLOR = "white";

  Bullet.prototype.hitAsteroids = function (game) {
    var bullet = this;

    game.asteroids.forEach(function (asteroid) {
      if(bullet.isCollidedWith(asteroid)) {
        game.removeAsteroid(asteroid);
        game.removeBullet(bullet);
      }
    });
  }

})(this);