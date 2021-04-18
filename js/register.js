$(document).ready(function(){
    $("#register").hide();
    $("#register_button").click(showMeOnly1);
});


function showMeOnly1(){
    $("#register").show();
    $("#welcome").hide();
    $("#login").hide();
}