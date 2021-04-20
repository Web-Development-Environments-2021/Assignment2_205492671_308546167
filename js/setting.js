
$(document).ready(function(){
    $("#submitSetting").click(settingSubmit);
    $( "#upArrow" ).keydown(function(event) {
        if((event.keyCode < 48 || event.keyCode >105) && event.keyCode != 8){
            $("#upArrow").val(event.key);
        }  
    });
    $( "#downArrow" ).keydown(function(event) {
        if((event.keyCode < 48 || event.keyCode >105) && event.keyCode != 8){
            $("#downArrow").val(event.key);
        }
    });
    $( "#leftArrow" ).keydown(function(event) {
        if((event.keyCode < 48 || event.keyCode >105) && event.keyCode != 8){
            $("#leftArrow").val(event.key);
        }
    });
    $( "#rightArrow" ).keydown(function(event) {
        if((event.keyCode < 48 || event.keyCode >105) && event.keyCode != 8){
            $("#rightArrow").val(event.key);

        }
    });



});

function settingSubmit(){
    var $inputs = $('#settingForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    showGameScreen();
}

function showSettingScreen(){
	$("#settingScreen").show();
    $("#login").hide();
    $("#welcome").hide();
    $("#register").hide();
}



function keydownpressed(event, arrowType){
    if((event.keyCode < 48 || event.keyCode >105) && event.keyCode != 8){
        $(arrowType).val(event.key);
    }  
}

    // $("#upArrow").keydown(
    //     {
    //     keydownpressed(event, l)
    //     }
    //     );





    // $("#downArrow").keydown(keydownpressed(event, "#downArrow"));
    // $("#leftArrow").keydown(keydownpressed(event, "#leftArrow"));
    // $("#rightArrow").keydown(keydownpressed(event, "#rightArrow"));

