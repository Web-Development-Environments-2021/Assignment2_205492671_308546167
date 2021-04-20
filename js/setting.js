
$(document).ready(function(){

    $("#submitSetting").click(settingSubmit);
    
    $( "#upArrow" ).keydown(function(event) {
        if((event.keyCode < 48 || event.keyCode >105) && event.keyCode != 8){
            $("#upArrow").val(event.key);
        }  
    });
    $( "#downArrow" ).keydown(function(event) {
        if(event.keyCode < 48 || event.keyCode >105){
            $("#downArrow").val(event.key);
        }
    });
    $( "#leftArrow" ).keydown(function(event) {
        if(event.keyCode < 48 || event.keyCode >105){
            $("#leftArrow").val(event.key);
        }
    });
    $( "#rightArrow" ).keydown(function(event) {
        if(event.keyCode < 48 || event.keyCode >105){
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
    console.log("delete");
}