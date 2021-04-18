$(document).ready(function(){
    $("#login").hide();
    $("#login_button").click(showMeOnly2);
});



function showMeOnly2(){
    $("#login").show();
    $("#welcome").hide();
    $("#register").hide();
}