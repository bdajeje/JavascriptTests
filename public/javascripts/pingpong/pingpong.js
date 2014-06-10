/****** MODELS ******/

function Game(x, y, width, height, background_color, border_color)
{
  this.x                = x;
  this.y                = y;
  this.width            = width;
  this.height           = height;
  this.background_color = background_color;
  this.border_color     = border_color;
  this.border_width     = 5;
  this.player_offset    = 20;       // Offset between player's bar and game border
  this.key_pause        = 32;
  this.is_paused        = false;

  this.pos_left_border  = this.border_width / 2;
  this.pos_right_border = this.width - this.border_width / 2;
}

function Player(key_left, key_right)
{
  this.score      = 0;
  this.x          = 0;
  this.y          = 0;
  this.width      = 100;
  this.color      = "white";
  this.bar_height = 20;
  this.key_left   = key_left;
  this.key_right  = key_right;
  this.speed      = 100/1000; // Number of pixels/millisec
  this.direction  = 0; // -1 means going to left, 0 not moving, 1 going to right

  this.Move = function(x, y)
  {
    this.x = x;
    this.y = y;
  };

  this.UpdatePosition = function(game, time_difference)
  {
    if( this.direction == 0 )
      return;

    // Calculate future x position
    var future_x = this.x + (this.direction * time_difference * this.speed);

    if(future_x + this.width >= game.pos_right_border)
    {
      this.x = game.pos_right_border - this.width;
      this.direction = 0;
    }
    else if(future_x <= game.pos_left_border)
    {
      this.x = game.pos_left_border;
      this.direction = 0;
    }
    else this.x = future_x;
  }
}

function Ball(radius, color)
{
  this.x             = 0;
  this.y             = 0;
  this.radius        = radius;
  this.color         = color;
  this.initial_speed = 150/1000; // Number of pixels/millisec
  this.speed         = this.initial_speed;
  this.direction_x   = 0; // Direction is a float number between -1 and 1 to know the direction and the speed on the axis (movement on axis = speed on the axix * direction on the axis)
  this.direction_y   = 0; // Direction is a float number between -1 and 1 to know the direction and the speed on the axis (movement on axis = speed on the axix * direction on the axis)

  // \todo Make this function common with Player model
  this.Move = function(x, y)
  {
    this.x = x;
    this.y = y;
  };

  this.UpdateDirection = function(x, y)
  {
    var limit = 0.2;

    if(x <= 0 && x > -limit)
      x = -limit;
    else if(x > 0 && x < limit)
      x = limit;

    if(y <= 0 && y > -limit)
      y = -limit;
    else if(y > 0 && y < limit)
      y = limit;

    this.direction_x = x;
    this.direction_y = y;
  };

  this.IsHit = function(player)
  {
    if( this.y + this.radius >= player.y                     &&
        this.y - this.radius <= player.y + player.bar_height &&
        this.x + this.radius >= player.x                     &&
        this.x - this.radius <= player.x + player.width )
      return true;

    return false;
  }

  this.FutureXPosition = function(time_difference)
  {
    return this.x + (time_difference * this.speed * this.direction_x);
  }

  this.FutureYPosition = function(time_difference)
  {
    return this.y + (time_difference * this.speed * this.direction_y);
  }

  this.RaiseSpeed = function()
  {
    if( Math.round(random(0, 2)) == 1 )
      this.speed = this.speed + this.speed * 0.1;
  }
}

/****** DRAW FUNTIONCS ******/

function drawGame(context, game)
{
  drawRectangle(context, game.x, game.y, game.width, game.height, game.background_color);
  drawSquare(context, game.x, game.y, game.width, game.height, game.border_width, game.border_color);
}

function drawPlayer(context, player)
{
  drawRectangle(context, player.x, player.y, player.width, player.bar_height, player.color);
}

function drawBall(context, ball)
{
  drawCircle(context, ball.x, ball.y, ball.radius, 0, 360, ball.color, true);
}

function drawScores(context, player1, player2, game)
{
  var x = 10;
  drawText(context, "Player 1: " + player1.score, x, 20, "15px Arial");
  drawText(context, "Player 2: " + player2.score, x, game.height - 15, "15px Arial");
}

function draw(context, game, player1, player2, ball)
{
  drawGame(context, game);
  drawPlayer(context, player1);
  drawPlayer(context, player2);
  drawBall(context, ball);
  drawScores(context, player1, player2, game);
}

function drawPause(context, game)
{
  drawText(context, "Paused", game.width / 2, game.height / 2, "30px Arial");
}

/****** OTHERS ******/

function restart(game, player1, player2, ball)
{
// Players positions
  var players_start_x = (game.width - player1.width) / 2;
  player1.Move(players_start_x, game.player_offset);
  player2.Move(players_start_x, game.height - game.player_offset - player2.bar_height);

  // Ball position and random direction
  ball.speed = ball.initial_speed;
  ball.Move(game.width / 2, game.height / 2);
  ball.UpdateDirection(random(-1, 2), random(-1, 2));
}

function gameIteration(time_difference, game, player1, player2, ball)
{
  // Update ball position
  var ball_future_x = ball.FutureXPosition(time_difference);
  var ball_future_y = ball.FutureYPosition(time_difference);

  // Take care of game left/right borders
  if(ball_future_x + ball.radius >= game.width ||
     ball_future_x - ball.radius <= 0 )
    ball.direction_x *= -1;

  // Take care of ball hitting player's bar
  if( ball.IsHit(player1) || ball.IsHit(player2) )
  {
    ball.direction_y = -ball.direction_y;
    ball_future_y    = ball.FutureYPosition(time_difference);
    ball.RaiseSpeed();
  }

  ball.Move( ball_future_x, ball_future_y );

  // If the ball goes out of minY or maxY it's a game!
  if(ball.y - ball.radius <= 0 )
  {
    player2.score += 1;
    restart(game, player1, player2, ball);
  }
  else if(ball.y + ball.radius >= game.height )
  {
    player1.score += 1;
    restart(game, player1, player2, ball);
  }

  // Update players positions
  player1.UpdatePosition(game, time_difference);
  player2.UpdatePosition(game, time_difference);
}

function togglePause(game)
{
  game.is_paused = !game.is_paused;
}

/* Main function to start rendering Ping Pong
 * \param context used to draw
 */
function pingpong(context, width, height)
{
  // Game properties
  var game_background_color = "black";
  var game_border_color     = "green";

  // Ball properties
  var ball_radius = 10;
  var ball_color  = "red";

  var game    = new Game(0, 0, width, height, game_background_color, game_border_color);
  var player1 = new Player(37, 39); // 37==LeftArrowKey | 39==RightArrowKey
  var player2 = new Player(65, 68); // 65==AKey | 68==DKey
  var ball    = new Ball(ball_radius, ball_color);

  // Initialize objets
  restart(game, player1, player2, ball);

  // Register keyboard events
  $("body").keydown(function(event) {
    if(event.which == player1.key_left)
      player1.direction = -1;
    else if(event.which == player1.key_right)
      player1.direction = 1;
    else if(event.which == player2.key_left)
      player2.direction = -1;
    else if(event.which == player2.key_right)
      player2.direction = 1;
    else if(event.which == game.key_pause)
      togglePause(game);
  });
  $("body").keyup(function(event) {
    if(event.which == player1.key_left ||
       event.which == player1.key_right )
      player1.direction = 0;
    else if(event.which == player2.key_left ||
            event.which == player2.key_right )
      player2.direction = 0;
  });

  // Start game loop
  var sleep_time = 1000 / 60; // 60 is the number of wanted fps
  var last_date  = new Date;
  window.setInterval(function()
  {
    // Get time spend between last iteration and this one
    var current_date    = new Date;
    var time_difference = current_date - last_date;
    last_date = current_date;

    // Is the game paused?
    if(game.is_paused)
    {
      drawPause(context, game);
      return;
    }

    // Update game depending on time
    gameIteration(time_difference, game, player1, player2, ball);

    // Draw everything
    draw(context, game, player1, player2, ball);

  }, sleep_time);
}

