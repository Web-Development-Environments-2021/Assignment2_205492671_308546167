var keyCode_set;

$(document).ready(function(){
    // $("#play_btn_area").click(settingSubmit);
    $("#upArrow").click(function(){
        $("#upArrow").val("");
    });
    $("#downArrow").click(function(){
        $("#downArrow").val("");
    });
    $("#leftArrow").click(function(){
        $("#leftArrow").val("");
    });
    $("#rightArrow").click(function(){
        $("#rightArrow").val("");
    });




    $("#random_btn_area").click(randomSetting); 
    $("#upArrow").keydown(function(event) {
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
    keyCode_set = {"#upArrow": 38,"#downArrow": 40,"#leftArrow": 37,"#rightArrow": 39};
});

function settingSubmit(){
    var $inputs = $('#settingForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    reciveSettings(
        keyCode_set["#upArrow"], keyCode_set["#downArrow"], keyCode_set["#leftArrow"], keyCode_set["#rightArrow"],
        values["nApples"], values["smallAppleColor"], values["midAppleColor"],
        values["bigAppleColor"], values["nMonsters"], values["gameTime"]
        );

    showGameScreen();
}

function showSettingScreen(){
    $("#settingForm")[0].reset();
	$("#settingScreen").show();
    $("#login").hide();
    $("#welcome").hide();
    $("#register").hide();
    $("#gameScreen").hide();
}



function keydownpressed(event, arrowType){
    if((event.keyCode < 48 || event.keyCode >105) && event.keyCode != 8){
        $(arrowType).val(event.key);
    }
    keyCode_set[arrowType] = event.keyCode;  
}

function randomSetting() {
    $("#upArrow").val("ArrowUp");
    $("#downArrow").val("ArrowDown");
    $("#leftArrow").val("ArrowLeft");
    $("#rightArrow").val("ArrowRight");
    $("#nApples").val(getRndInteger(50,90));
    $("#bigAppleColor").val("#1ACFCE");
    $("#midAppleColor").val("#F1C216");
    $("#smallAppleColor").val("#46D852");
    $("#gameTime").val(getRndInteger(60,90));
    $("#nMonsters").val(getRndInteger(1,4));
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

