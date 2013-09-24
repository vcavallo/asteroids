(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.ship = new Asteroids.Ship([Game.DIM_X / 2, Game.DIM_Y / 2],
                                   [0,0],
                                   [Game.DIM_X, Game.DIM_Y]);
    this.clock;
    this.bullets = [];
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.FPS = 1000 / 30;

  Game.prototype.addAsteroids = function (numAsteroids) {
    for(var i=0; i<numAsteroids; i++){
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  };

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.asteroids.forEach(function(asteroid){
      asteroid.draw(this.ctx);
    });
    this.bullets.forEach(function(bullet){
      bullet.draw(this.ctx);
    });

    this.ship.draw(this.ctx);
  };

  Game.prototype.move = function () {
    var game = this;

    game.asteroids.forEach(function (asteroid) {
      asteroid.wrapMove();
    });

    game.bullets.forEach(function(bullet){
      bullet.move();
      if (game.isOutOfBounds(bullet)) {
        game.removeBullet(bullet);
      } else {
        bullet.hitAsteroids(game)
      }
    });

    game.ship.wrapMove();
  };

  Game.prototype.removeBullet = function(bullet) {
    var bulletIndex = this.bullets.indexOf(bullet);
    this.bullets.splice(bulletIndex, 1);
  };

  Game.prototype.removeAsteroid = function(asteroid) {
    var asteroidIndex = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(asteroidIndex, 1);
  };

  Game.prototype.step = function () {
    this.move();
    this.draw();
    this.checkCollisions();
    this.checkWin();
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    this.asteroids.forEach( function(asteroid){
      if(asteroid.isCollidedWith(game.ship)) {
        alert("Game Over");
        game.stop();
      };
    });
  };

  Game.prototype.isOutOfBounds = function (movingObject) {
    return (movingObject.pos[0] > Game.DIM_X || movingObject.pos[0] < 0
    || movingObject.pos[1] > Game.DIM_Y || movingObject.pos[1] < 0)
  }

  Game.prototype.bindKeyHandlers = function() {
    var game = this;

    key('down', function(){ game.ship.power([0,1]) });
    key('up', function(){ game.ship.power([0,-1]) });
    key('right', function(){ game.ship.power([1,0]) });
    key('left', function(){ game.ship.power([-1,0]) });
    key('space', function(){ game.ship.fireBullet(game.bullets) });
  }

  Game.prototype.checkWin = function () {
    if( this.asteroids.length === 0) {
      alert("Game Won");
      this.stop();
    }
  }

  Game.prototype.stop = function () {
    clearInterval(this.clock);
  };

  Game.prototype.start = function () {
    var game = this;
    game.bindKeyHandlers();
    game.addAsteroids(10);

    this.clock = setInterval(function () {
      game.step()
    }, Game.FPS);
  };

})(this);