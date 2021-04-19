// $(document).ready(function(){
//    $("#registerForm").validate({
//        rules: {
//         Username: "required",
// 		Password: "required",
//         Fullname: "required",
//         Email: "required",
//         DateOfBirth: "required"
//        },
//        messages: {
//         Username: "Please enter usernamexxxxxxxxxxxxxxxxxxxxxx",
// 		Password: "invalid passwordxxxxxxxxxxxxxxxxxxxxxxxx",
//         Fullname: "Please enter your full namexxxxxxxxxxxxxxxxxxxxxxxxxx",
//         Email: "requiredxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//         DateOfBirth: "requiredxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  
//        }
//    }) 
// });


$().ready(function() {
    // validate signup form on keyup and submit
    $("#signupForm").validate({
        rules: {
            Username: "required",
            Password: "required",
            Fullname: {
                required: true,
                minlength: 6
            },
     
            Email: {
                required: true,
                email: true
            },
            DateOfBirth: "required"
        },
        messages: {
            Username: "Please enter your firstname",
            Password: "Please enter your lastname",
            Fullname: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters"
            },
            Email: "Please enter a valid email address",
            DateOfBirth: "Please accept our policy",
        }
    });
});
