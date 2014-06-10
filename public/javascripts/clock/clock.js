/* Clock model */
function Clock(x, y, radius)
{
  this.x                      = x;
  this.y                      = y;
  this.radius                 = radius;
  this.background_color       = "#EEE";
  this.middle_color           = "#111";
  this.internal_radius        = 20; // Radius for the internal circle

  this.needle_hours_width     = 3;
  this.needle_minutes_width   = 2;
  this.needle_seconds_width   = 1;
  this.needle_hours_color     = "#AAA";
  this.needle_minutes_color   = "#BBB";
  this.needle_seconds_color   = "#CCC";
  this.needle_hours_radius    = radius - radius*0.1;
  this.needle_minutes_radius  = radius - radius*0.2;
  this.needle_seconds_radius  = radius - radius*0.3;

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

function drawNeedles(context, clock, hours, minutes, seconds)
{
  // Hours to angle in radian
  var start = Math.PI/2;
  var hours_angle   = ((hours * 2 * Math.PI) / 12) - start;
  var minutes_angle = ((minutes * 2 * Math.PI) / 60) - start;
  var seconds_angle = ((seconds * 2 * Math.PI) / 60) - start;

  // Applying shadows
  context.save();
  context.shadowColor   = "#000";
  context.shadowBlur    = 1;
  context.shadowOffsetX = 1;
  context.shadowOffsetY = 1;

  // Draw hours needle
  drawLine(context, clock.x, clock.y,
           clock.x + xTrigonometricPosition(clock.needle_hours_radius, hours_angle),
           clock.y + yTrigonometricPosition(clock.needle_hours_radius, hours_angle),
           clock.needle_hours_width, clock.needle_hours_color);

  // Draw minutes needle
  drawLine(context, clock.x, clock.y,
           clock.x + xTrigonometricPosition(clock.needle_minutes_radius, minutes_angle),
           clock.y + yTrigonometricPosition(clock.needle_minutes_radius, minutes_angle),
           clock.needle_minutes_width, clock.needle_minutes_color);

  // Draw seconds needle
  drawLine(context, clock.x, clock.y,
           clock.x + xTrigonometricPosition(clock.needle_seconds_radius, seconds_angle),
           clock.y + yTrigonometricPosition(clock.needle_seconds_radius, seconds_angle),
           clock.needle_seconds_width, clock.needle_seconds_color);

  context.restore();
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

/* Specific get time function for this clock
 * The function returns hours between 0 and 12
 * \return array [hours, minutes, seconds]
 */
function getClockTime()
{
  var date = new Date;
  date.setTime( getTime() );

  // Always give hours between 0 and 12
  var hours = date.getHours();
  if(hours > 12)
    hours -= 12;

  return [hours, date.getMinutes(), date.getSeconds()];
}

/* Main function to start rendering the clock
 * \param context used to draw
 */
function clock(context)
{
  // Create the Clock object
  var clock = new Clock(100, 100, 100);

  // First draw before interval draw every seconds
  var current_time = getClockTime();
  drawClock(context, clock, current_time[0], current_time[1], current_time[2]);

  // Update clock every second
  window.setInterval(function()
  {
    var current_time = getClockTime();
    drawClock(context, clock, current_time[0], current_time[1], current_time[2]);
  }, 1000);
}

