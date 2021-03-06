var keyCode_set;

$(document).ready(function(){
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
    setDefaultValues();
	$("#settingScreen").show();
    $("#login").hide();
    $("#welcome").hide();
    $("#register").hide();
    $("#gameScreen").hide();
}



function keydownpressed(event, arrowType){
  
    $(arrowType).val(event.key);
    keyCode_set[arrowType] = event.keyCode;  
}

function randomSetting() {
    $("#upArrow").val("ArrowUp");
    $("#downArrow").val("ArrowDown");
    $("#leftArrow").val("ArrowLeft");
    $("#rightArrow").val("ArrowRight");
    $("#nApples").val(getRndInteger(50,90));
    $("#bigAppleColor").val(getRndColor);
    $("#midAppleColor").val(getRndColor);
    $("#smallAppleColor").val(getRndColor);
    $("#gameTime").val(getRndInteger(60,90));
    $("#nMonsters").val(getRndInteger(1,4));
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getRndColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
    
}

function setDefaultValues(){
    $("#upArrow").val("ArrowUp");
    $("#downArrow").val("ArrowDown");
    $("#leftArrow").val("ArrowLeft");
    $("#rightArrow").val("ArrowRight");
    $("#nApples").val(60);
    $("#bigAppleColor").val("#1ACFCE");
    $("#midAppleColor").val("#F1C216");
    $("#smallAppleColor").val("#46D852");
    $("#gameTime").val(60);
    $("#nMonsters").val(4);
}