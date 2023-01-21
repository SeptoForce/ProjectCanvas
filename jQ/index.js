$(function () {
    const loginButton = $("#loginButton");
    const registerButton = $("#registerButton");
    const loginForm = $("#loginForm");
    const registerForm = $("#registerForm");

    const remember = $("#remember");

    let currentState = "none";
    currentState = loginForm.hasClass("flex") ? "login" : "none";

    if (localStorage.getItem("remember") == "true") {
        remember.prop("checked", true);
        let loginEmail = $("#login_email");
        loginEmail.val(localStorage.getItem("email"));
    }
    
    loginButton.on("click", function () {
        if (currentState != "login") {
            loginForm.removeClass("hidden");
            registerForm.addClass("hidden");
            loginForm.addClass("flex");
            registerForm.removeClass("flex");
            currentState = "login";
        } else {
            let check = true;
            let loginFields = $("#loginForm input");

            loginFields.each(function () {
                if ($(this).val() == "") {
                    $(this).addClass("border-orange-600");
                    check = false;
                }
            });

            if (check == false) {
                return;
            }

            if (remember.is(":checked")) {
                localStorage.setItem("remember", "true");
                localStorage.setItem("email", loginFields.eq(0).val());
            } else {
                localStorage.setItem("remember", "false");
            }
            loginForm.submit();
        }
    });

    $("#register_email").on("input", function () {
        let email = $(this).val();
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            $("#emailErrorMessage").html("Email is not valid!");
        } else {
            $("#emailErrorMessage").html("");
        }
    });

    $("#repeat_password").on("input", function () {
        if ($(this).val() == $("#register_password").val()) {
            $("#passwordErrorMessage").html("");
        } else {
            $("#passwordErrorMessage").html("Passwords do not match!");
        }
    });

    registerButton.on("click", function () {
        if (currentState != "register") {
            loginForm.removeClass("flex");
            registerForm.addClass("flex");
            loginForm.addClass("hidden");
            registerForm.removeClass("hidden");
            currentState = "register";
        } else {
            let check = true;
            const emailErrorMessage = $("#emailErrorMessage");
            const passwordErrorMessage = $("#passwordErrorMessage");
            emailErrorMessage.html("");
            passwordErrorMessage.html("");
            let registrationFields = $("#registerForm input");

            registrationFields.each(function () {
                if ($(this).val() == "") {
                    $(this).addClass("border-orange-600");
                    check = false;
                }
            });

            if (check == false) {
                return;
            }

            //check if email is valid using regex
            let email = $("#register_email").val();
            let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(email)) {
                emailErrorMessage.html("Email is not valid!");
                check = false;
            } else {
                emailErrorMessage.html("");
            }

            if (check == false) {
                return;
            }
            if ($("#register_password").val() == $("#repeat_password").val()) {
                registerForm.submit();
            } else {
                passwordErrorMessage.html("Passwords do not match!");
            }
        }
    });

    //when eneter is pressed submit the login form
    $(document).on("keydown", function (event) {
        if (event.key == "Enter") {
            if (currentState == "login") {
                loginButton.click();
            } else if (currentState == "register") {
                registerButton.click();
            }
        }
    });
});
