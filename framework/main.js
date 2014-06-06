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

/******** MODELS **********/

function Position(x, y)
{
  this.x = x;
  this.y = y;
}