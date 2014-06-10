function drawText(context, text, x, y, font)
{
  context.font = font;
  context.fillText(text, x, y);
}

/* Draw a line
 * \param context where to draw
 * \param x       where to start
 * \param y       where to start
 * \param dx      where to end
 * \param dy      where to end
 * \param width   of the line
 * \param color   of the line
 */
function drawLine(context, x, y, dx, dy, width, color)
{
  context.beginPath();
  context.lineWidth = width;
  context.moveTo( x, y );
  context.lineTo( dx, dy );
  context.strokeStyle = color;
  context.stroke();
}

/* Draw a circle
 * \param context     where to draw
 * \param x           where to start
 * \param y           where to start
 * \param radius      of the circle
 * \param start_angle of the circle (in degrees)
 * \param end_angle   of the circle (in degrees)
 * \param fill_color  of the line
 * \param clock_wise  (bool) for the angle
 */
function drawCircle(context, x, y, radius, start_angle, end_angle, fill_color, clock_wise)
{
  start_angle_radian = toRadian(start_angle);
  end_angle_radian   = toRadian(end_angle);

  context.beginPath();
  context.fillStyle = fill_color;
  context.arc(x, y, radius, start_angle_radian, end_angle_radian, clock_wise);
  context.fill();
}

function drawRectangle(context, x, y, width, height, color)
{
  context.beginPath();
  context.fillStyle = color;
  context.fillRect( x, y, width, height );
  context.fill();
}

function drawSquare(context, x, y, width, height, line_width, color)
{
  var right_x    = x + width;
  var bottom_y   = y + height;

  drawLine(context, x, y, right_x, y, line_width, color);
  drawLine(context, right_x, y, right_x, bottom_y, line_width, color);
  drawLine(context, right_x, bottom_y, x, bottom_y, line_width, color);
  drawLine(context, x, bottom_y, x, y, line_width, color);
}