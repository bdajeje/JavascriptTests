/* Get a context from a canvas */
function getContext(canvas)
{
  return canvas.getContext("2d");
}

/* Transform an angle in degrees to radian
 * \param degrees value to transform in radian
 */
function toRadian(degrees)
{
  return degrees * Math.PI / 180;
}

/* Print some text in the console
 * \param text to print
 */
function print(text)
{
  console.log(text);
}