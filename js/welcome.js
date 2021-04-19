$(document).ready(function(){
    showWelcomeScreen();
    $("#welcome_menu").click(function(){
        showWelcomeScreen();
    }); 
});


function showWelcomeScreen(){
    $("#welcome").show();
    $("#register").hide();
    $("#login").hide();
  
    $("#gameScreen").hide();
   }





   