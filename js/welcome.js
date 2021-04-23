$(document).ready(function(){
    showWelcomeScreen();
    $("#welcome_menu").click(function(){
        showWelcomeScreen();
    }); 
});


function showWelcomeScreen(){
    $("#welcome").show();
    $("#logOut_menu").hide();
    $("#register").hide();
    $("#login").hide();
    $("#settingScreen").hide();
    $("#gameScreen").hide();
    $("#onlineUserText").hide();
    onlineUser = null;
    $("#onlineUserText").text("Online User: ");
   }





   