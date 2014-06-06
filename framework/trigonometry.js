/* Transform an angle in degrees to radian
 * \param degrees value to transform in radian
 */
function toRadian(degrees)
{
  return degrees * Math.PI / 180;
}

/* Get the X position for a given angle inside a circle
 * \param radius of the circle
 * \param angle to get the position
 */
function xTrigonometricPosition(radius, angle)
{
  return radius * Math.cos(angle);
}

/* Get the Y position for a given angle inside a circle
 * \param radius of the circle
 * \param angle to get the position
 */
function yTrigonometricPosition(radius, angle)
{
  return radius * Math.sin(angle);
}