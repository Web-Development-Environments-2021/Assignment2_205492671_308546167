$(document).ready(function(){
    $("#login").hide();
    $("#login_button").click(showLoginScreen);
    $("#login_menu").click(showLoginScreen);
    $("#subLogin").click(loginSubmit);
});



function showLoginScreen(){
    $("#loginForm")[0].reset();
    $("#login").show();
    $("#welcome").hide();
    $("#register").hide();
    $("#settingScreen").hide();

}


function loginSubmit(){
    var $inputs = $('#loginForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    if(verifyUser(values["Username"],values["Password"])){
        showSettingScreen();
    }
    else {
        alert("The username or password is incorrect");
    }
}

