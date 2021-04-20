
$(document).ready(function(){
    $( "#upArrow" ).keydown(function(event) {
        if(event.which<"48" && event.which>"105"){
            $("#upArrow").val(event.key);
        }
        
    });
    $( "#downArrow" ).keydown(function(event) {
        $("#downArrow").val(event.key);
    });
    $( "#leftArrow" ).keydown(function(event) {
        $("#leftArrow").val(event.key);
    });
    $( "#rightArrow" ).keydown(function(event) {
        $("#rightArrow").val(event.key);
    });

});