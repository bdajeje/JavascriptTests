/****** MODELS ******/

function Game(x, y, width, height, background_color, border_color)
{
  this.x                = x;
  this.y                = y;
  this.width            = width;
  this.height           = height;
  this.background_color = background_color;
  this.border_color     = border_color;
  this.player_offset    = 20;       // Offset between player's bar and game border
}

function Player()
{
  this.score      = 0;
  this.x          = 0;
  this.y          = 0;
  this.width      = 100;
  this.color      = "white";
  this.bar_height = 20;

  this.Move = function(x, y)
  {
    this.x = x;
    this.y = y;
  };
}

function Ball(radius, color)
{
  this.x      = 0;
  this.y      = 0;
  this.radius = radius;
  this.color  = color;
  this.speed  = 5; // Number of pixels/sec

  // \todo Make this function common with Player model
  this.Move = function(x, y)
  {
    this.x = x;
    this.y = y;
  };
}

/****** DRAW FUNTIONCS ******/

function drawGame(context, game)
{
  drawRectangle(context, game.x, game.y, game.width, game.height, game.background_color);
  drawSquare(context, game.x, game.y, game.width, game.height, 5, game.border_color);
}

function drawPlayer(context, player)
{
  drawRectangle(context, player.x, player.y, player.width, player.bar_height, player.color);
}

function drawBall(context, ball)
{
  drawCircle(context, ball.x, ball.y, ball.radius, 0, 360, ball.color, true);
}

function draw(context, game, player1, player2, ball)
{
  drawGame(context, game);
  drawPlayer(context, player1);
  drawPlayer(context, player2);
  drawBall(context, ball);
}

/****** OTHERS ******/

function gameIteration(time_difference, game, player1, player2, ball)
{
 // update ball position by time_difference * ball.speed
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
  var player1 = new Player();
  var player2 = new Player();
  var ball    = new Ball(ball_radius, ball_color);

  // Initialize objets
  var players_start_x = (width - player1.width) / 2;
  player1.Move(players_start_x, game.player_offset);
  player2.Move(players_start_x, game.height - game.player_offset - player2.bar_height);
  ball.Move(width / 2, height / 2);

  // Start game loop
  var sleep_time = 1000 / 60; // 60 is the number of wanted fps
  var last_date  = new Date;
  window.setInterval(function()
  {
    // Get time spend between last iteration and this one
    var current_date    = new Date;
    var time_difference = current_date - last_date;
    last_date = current_date;

    // Update game depending on time
    gameIteration(time_difference, game, player1, player2, ball);

    // Draw everything
    draw(context, game, player1, player2, ball);

  }, sleep_time);
}

