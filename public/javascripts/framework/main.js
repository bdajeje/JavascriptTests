/* Get a context from a canvas */
function getContext(canvas)
{
  return canvas.getContext("2d");
}

/* Print some text in the console
 * \param text to print
 */
function print(text)
{
  console.log(text);
}

/* Get a random number
 * \param min value
 * \param max value
 * \return a random value between min (included) and max (excluded)
 */
function random(min, max)
{
  return (Math.random() * max) + min;
}

/******** MODELS **********/

function Position(x, y)
{
  this.x = x;
  this.y = y;
}