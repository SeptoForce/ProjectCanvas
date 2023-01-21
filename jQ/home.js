$(function () {
    UpdateUserValues();
    function UpdateUserValues() {
        $.ajax({
            type: "POST",
            url: "../api/updateUserValues.php",
            data: { allUsers: true },
            success: function (response) {
                if (response.success === "true") {
                    console.log("User values updated");
                }
            },
        });
    }
});
