const backButton = document.getElementById("backButton");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const submitButton = document.getElementById("submitButton");
const passwordMessage = document.getElementById("passwordMessage");

submitButton.addEventListener("click", function () {
    if (newPassword.value === "") {
        passwordMessage.innerText = "Please enter a password";
        passwordMessage.classList.remove("invisible");
    } else if (confirmPassword.value === "") {
        passwordMessage.innerText = "Please confirm your password";
        passwordMessage.classList.remove("invisible");
    } else if (newPassword.value === confirmPassword.value) {
        ChangePassword();
    } else {
        passwordMessage.innerText = "Passwords do not match";
        passwordMessage.classList.remove("invisible");
    }
});

backButton.addEventListener("click", function () {
    window.history.back();
});

function ChangePassword() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        const response = JSON.parse(this.responseText);
        if (response.success == "true") {
            passwordMessage.innerText = "Password changed successfully";
            passwordMessage.classList.remove("invisible");
        } else {
            passwordMessage.innerText = "Password change failed";
            passwordMessage.classList.remove("invisible");
        }
    }
    xmlhttp.open("POST", "../api/changePassword.php?password=" + newPassword.value, true);
    xmlhttp.send();
}