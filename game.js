(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
	this.asteroids = [];
    this.bullets = [];
	this.clock;
	this.ship = new Asteroids.Ship([Game.DIM_X / 2, Game.DIM_Y / 2],
                                   [0,0],
                                   [Game.DIM_X, Game.DIM_Y]);
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 20;
  Game.FPS = 1000 / 30;

  Game.prototype.addAsteroids = function (numAsteroids) {
    for(var i=0; i<numAsteroids; i++){
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }

	this.asteroids.forEach(function (asteroid) {
		console.log(asteroid.pos);
	})
  };

  Game.prototype.removeBullet = function(bullet) {
    this.bullets.splice(this.bullets.indexOf(bullet), 1);
  };

  Game.prototype.removeAsteroid = function(asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  };


  Game.prototype.draw = function (background_img) {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	this.ctx.drawImage(background_img, 0, 0);

    this.asteroids.forEach(function(asteroid){
      asteroid.draw(this.ctx);
    });
    this.bullets.forEach(function(bullet){
      bullet.draw(this.ctx, true);
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

  Game.prototype.step = function (background_img) {
    this.draw(background_img);
	this.move();
    this.checkLose();
    this.checkWin();
  };

  Game.prototype.isOutOfBounds = function (movingObject) {
    return (movingObject.pos[0] > Game.DIM_X || movingObject.pos[0] < 0
    || movingObject.pos[1] > Game.DIM_Y || movingObject.pos[1] < 0)
  }

  Game.prototype.bindKeyHandlers = function() {
    var game = this;
	
	key('up', function(){ game.ship.power([0,-1]) });
    key('down', function(){ game.ship.power([0,1]) });
    key('left', function(){ game.ship.power([-1,0]) });
    key('right', function(){ game.ship.power([1,0]) });
    key('space', function(){ game.ship.fireBullet(game.bullets) });
  }

  Game.prototype.checkLose = function () {
    var game = this;
    this.asteroids.forEach( function(asteroid){
      if(asteroid.isCollidedWith(game.ship)) {
        alert("Game Over!");
        game.stop();
      };
    });
  };

  Game.prototype.checkWin = function () {
    if( this.asteroids.length === 0) {
      alert("Congrats, you won!");
      this.stop();
    }
  }

  Game.prototype.stop = function () {
    clearInterval(this.clock);
  };

  Game.prototype.start = function () {
    var game = this;
	var img = new Image();
	img.src = "assets/background.png";
    
	game.bindKeyHandlers();
    game.addAsteroids(Game.NUM_ASTEROIDS);

	img.onload = function() {
		var background_img = this;
			
		game.clock = setInterval(function () {
			game.step(background_img);
	    }, Game.FPS);
	};  
  };

})(this);