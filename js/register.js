$(document).ready(function(){
    $("#register").hide();
    $("#register_button").click(showRegisterScreen);
    $("#register_menu").click(showRegisterScreen);


});


function showRegisterScreen(){
    $("#registerForm")[0].reset();
    $("#register").show();
    $("#liveTheGameGifhy").hide();
    $("#welcome").hide();
    $("#login").hide();
    $("#settingScreen").hide();
}

function registerSubmit(){
    var $inputs = $('#registerForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });

    addToDB(values["Username"],values["Password"],values["Fullname"],values["Email"],values["DateOfBirth"]);
    showLoginScreen();
}

