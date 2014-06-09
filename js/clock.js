/* Clock model */
function Clock(x, y, radius)
{
  this.x                      = x;
  this.y                      = y;
  this.radius                 = radius;
  this.background_color       = "#000";
  this.middle_color           = "#EEE";
  this.internal_radius        = 20; // Radius for the internal circle

  this.needle_hours_width     = 3;
  this.needle_minutes_width   = 2;
  this.needle_seconds_width   = 1;
  this.needle_hours_color     = "#EEE";
  this.needle_minutes_color   = "#FFF";
  this.needle_seconds_color   = "#DDD";

  this.numbers_pos            = [];
  this.number_font            = "Arial";
  this.number_size            = 20; // In pixels
  this.number_style           = this.number_size + "px " + this.number_font;
  this.number_offset          = 20; // Offset between number pos and clock border (radius)

  // Calculate clock numbers right now to prevent re-calculate then
  var angle         = -Math.PI/2;
  var step          = (2 * Math.PI) / 12;
  var number_radius = radius - this.number_offset;
  for(var i = 0; i < 12; ++i)
  {
    number_x = x - (this.number_size/2) + xTrigonometricPosition(number_radius, angle);
    number_y = y + (this.number_size/2) + yTrigonometricPosition(number_radius, angle);

    this.numbers_pos[i] = new Position(number_x, number_y);

    angle += step;
  }
}

function getClockCanvas()
{
  return document.getElementById("clock");
}

function drawNeedles(context, clock, hours, minutes, seconds)
{
  print(hours + "-" + minutes + "-" + seconds);

  // Hours to angle in radian
  var start = Math.PI/2;
  var hours_angle   = ((hours * 2 * Math.PI) / 12) - start;
  var minutes_angle = ((minutes * 2 * Math.PI) / 60) - start;
  var seconds_angle = ((seconds * 2 * Math.PI) / 60) - start;

  // Draw hours needle
  drawLine(context, clock.x, clock.y,
           clock.x + xTrigonometricPosition(clock.radius, hours_angle),
           clock.y + yTrigonometricPosition(clock.radius, hours_angle),
           clock.needle_hours_width, clock.needle_hours_color);

  // Draw minutes needle
  drawLine(context, clock.x, clock.y,
           clock.x + xTrigonometricPosition(clock.radius, minutes_angle),
           clock.y + yTrigonometricPosition(clock.radius, minutes_angle),
           clock.needle_minutes_width, clock.needle_minutes_color);

  // Draw seconds needle
  drawLine(context, clock.x, clock.y,
           clock.x + xTrigonometricPosition(clock.radius, seconds_angle),
           clock.y + yTrigonometricPosition(clock.radius, seconds_angle),
           clock.needle_seconds_width, clock.needle_seconds_color);
}

/* Draw the clock
 * \param context       used to draw
 */
function drawClock(context, clock, hours, minutes, seconds)
{
  // Draw clock background
  drawCircle(context, clock.x, clock.y, clock.radius, 0, 360, clock.background_color, true);

  // Draw clock middle
  drawCircle(context, clock.x, clock.y, clock.radius/clock.internal_radius, 0, 360, clock.middle_color, true);

  // Draw numbers
  for(var i = 0; i < 12; ++i)
    drawText(context, i.toString(), clock.numbers_pos[i].x, clock.numbers_pos[i].y, clock.number_style);

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

    // Always give hours between 0 and 12
    var hours = date.getHours();
    if(hours > 12)
      hours -= 12;

    drawClock(context, clock, hours, date.getMinutes(), date.getSeconds());
  }, 1000);
}

