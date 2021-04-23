
$(document).ready(function(){
    $("#play_btn_area").click(settingSubmit);
    $("#random_btn_area").click(randomSetting);
    
    $( "#upArrow").keydown(function(event) {
        keydownpressed(event,"#upArrow");
        }  
    );
    $( "#downArrow").keydown(function(event) {
        keydownpressed(event,"#downArrow");
        }  
    );
    $( "#leftArrow").keydown(function(event) {
        keydownpressed(event,"#leftArrow");
        }  
    );
    $( "#rightArrow").keydown(function(event) {
        keydownpressed(event,"#rightArrow");
        }  
    );

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
    $("#settingForm")[0].reset();
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

function randomSetting() {
    $("#upArrow").val("ArrowUp");
    $("#downArrow").val("ArrowDown");
    $("#leftArrow").val("ArrowLeft");
    $("#rightArrow").val("ArrowRight");
    $("#nApples").val(getRndInteger(50,90));
    $("#bigAppleColor").val("#1ACFCE");
    $("#medAppleColor").val("#F1C216");
    $("#smallAppleColor").val("#46D852");
    $("#gameTime").val(getRndInteger(30,120));
    $("#nMonsters").val(getRndInteger(1,5));
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


