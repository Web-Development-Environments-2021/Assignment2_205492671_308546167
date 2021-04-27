$().ready(function() {
    $("#settingForm").validate({
        rules: {
            nApples: {
                range:[50,90]
            },
            gameTime: { 
                range:[60,Infinity]
            },
            nMonsters: { 
                range:[1,4]
            },
        },
        messages: {
            nApples: 
            "Min=50 Max=90",            
            gameTime: 
                "Min=60",
            nMonsters:
                "Min=1 Max=4",
            bigAppleColor: "no black"
            
        },
        errorPlacement: function(label, element) {
            label.addClass('errorSettingMessage');
            label.insertAfter(element);
          },
          wrapper: 'span',

        submitHandler: function(event){
            settingSubmit();
        }
        

    });
});

