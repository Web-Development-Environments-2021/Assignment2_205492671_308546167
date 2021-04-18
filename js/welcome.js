$(document).ready(function(){
    showMeOnly();
    $("#welcome_menu").click(function(){
        showMeOnly();
    });  
});


function showMeOnly(){
    $("#welcome").show();
    $("#register").hide();
    $("#login").hide();
    $("#score").hide();
    $("#time").hide();
}

