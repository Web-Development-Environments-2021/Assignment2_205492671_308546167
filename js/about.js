$(document).ready(function ()
{

   $("#about_menu").click(function ()
   {
      $("#about_dialog").show();
   });

   $("#aboutBtnClose").click(function ()
   {
      $("#about_dialog").hide();
   });

   $(document).keydown(function (event) {
      if (event.keyCode == 27) {
   
          $("#about_dialog").hide();  
      }
   });

});

