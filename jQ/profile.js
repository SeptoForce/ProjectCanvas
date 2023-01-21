$(function () {
    $("#submitButton").click(function () {
        if ($("#newPassword").val() === "") {
            $("#passwordMessage").text("Please enter a password");
            $("#passwordMessage").removeClass("invisible");
        } else if ($("#confirmPassword").val() === "") {
            $("#passwordMessage").text("Please confirm your password");
            $("#passwordMessage").removeClass("invisible");
        } else if ($("#newPassword").val() === $("#confirmPassword").val()) {
            ChangePassword();
        } else {
            $("#passwordMessage").text("Passwords do not match");
            $("#passwordMessage").removeClass("invisible");
        }
    });

    $("#backButton").click(function () {
        window.history.back();
    });

    function ChangePassword() {
        $.ajax({
            url:
                "../api/changePassword.php?password=" + $("#newPassword").val(),
            type: "POST",
            success: function (response) {
                response = JSON.parse(response);
                if (response.success == "true") {
                    $("#passwordMessage").text("Password changed successfully");
                    $("#passwordMessage").removeClass("invisible");
                } else {
                    $("#passwordMessage").text("Password change failed");
                    $("#passwordMessage").removeClass("invisible");
                }
            },
        });
    }
});
