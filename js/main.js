$(document).ready(function()
{
  // Clock
  clock( getContext(document.getElementById("clock")) );

  // Ping Pong
  var pingping_canvas_id = "pingpong";
  var pingping_canvas = $("#" + pingping_canvas_id);
  var pingpong_width  = pingping_canvas.width();
  var pingpong_height = pingping_canvas.height();
  pingpong( getContext(document.getElementById(pingping_canvas_id)), pingpong_width, pingpong_height );
});
