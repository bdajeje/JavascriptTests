function Clock(x, y, radius)
{
  this.x                      = x;
  this.y                      = y;
  this.radius                 = radius;
  this.background_color       = "#000";
  this.middle_color           = "#EEE";
  this.needle_hours_width     = 3;
  this.needle_minutes_width   = 2;
  this.needle_seconds_width   = 1;
  this.needle_hours_color     = "#EEE";
  this.needle_minutes_color   = "#FFF";
  this.needle_seconds_color   = "#DDD";
}

function getClockCanvas()
{
  return document.getElementById("clock");
}

function drawNeedles(context, clock, hours, minutes, seconds)
{
  print(hours + "-" + minutes + "-" + seconds);

  // Draw hours needle
  drawLine(context, clock.x, clock.y, clock.x + clock.radius, clock.y, clock.needle_hours_width, clock.needle_hours_color);

  // Draw minutes needle
  drawLine(context, clock.x, clock.y, clock.x + clock.radius, clock.y + 50, clock.needle_minutes_width, clock.needle_minutes_color);

  // Draw seconds needle
  drawLine(context, clock.x, clock.y, clock.x + clock.radius, clock.y - 100, clock.needle_seconds_width, clock.needle_seconds_color);
}

/* Draw the clock
 * \param context       used to draw
 */
function drawClock(context, clock, hours, minutes, seconds)
{
  // Draw clock background
  drawCircle(context, clock.x, clock.y, clock.radius, 0, 360, clock.background_color, true);

  // Draw clock middle
  drawCircle(context, clock.x, clock.y, clock.radius/20, 0, 360, clock.middle_color, true);

  // Draw numbers
  // var angle = 0;
  // var step  = (2 * Math.PI) / 12;
  // for(var i = 0; i < 12; ++i)
  // {
  //   x = clock.radius / Math.sin(angle);
  //   y = x * Math.cos(angle);
  //   drawText(context, i.toString(), x, y, "20px Arial");
  //   angle += step;
  // }

  drawNeedles(context, clock, hours, minutes, seconds);
}

/* Main function to start rendering the clock
 * \param context used to draw
 */
function clock(context)
{
  // Create the Clock object
  var clock = new Clock(150, 150, 100);

// First draw before interval draw every seconds
  drawClock(context, clock, 0, 0, 0);

  // Update clock every second
  window.setInterval(function()
  {
    // Get current time
    var date = new Date;
    date.setTime( getTime() );

    drawClock(context, clock, date.getHours(), date.getMinutes(), date.getSeconds());
  }, 1000);
}
