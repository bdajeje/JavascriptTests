$(document).ready(function()
{
  $(".js-slide").click(function() {
    var target = $(this).attr("jg-slide-target");
    $("#"+target).slideToggle();
  });
});
