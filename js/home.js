UpdateUserValues();
function UpdateUserValues() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        const response = JSON.parse(this.responseText);
        if (response.success === "true") {
            console.log("User values updated");
        }
    };
    xmlhttp.open("POST", "../api/updateUserValues.php?allUsers=true", true);
    xmlhttp.send();
}
