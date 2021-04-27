$(document).ready(function(){
    showWelcomeScreen();
    $("#welcome_menu").click(function(){
        showWelcomeScreen();
    }); 
    $("#logOut_menu").click(showWelcomeScreen);
});


function showWelcomeScreen(){
    $("#welcome").show();
    $("#liveTheGameGifhy").show();
    $("#logOut_menu").hide();
    $("#register").hide();
    $("#login").hide();
    $("#settingScreen").hide();
    $("#gameScreen").hide();
    $("#onlineUserText").hide();
    onlineUser = null;
    $("#onlineUserText").text("Online User: ");
    if(pause_game == false){
        pauseGame();
    }
   }





   