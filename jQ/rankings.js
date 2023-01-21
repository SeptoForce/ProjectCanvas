$(function() {
    $("#tooltip").css("display", "none");
    let users = [];

    UpdateUserValues();
    GetTop10Users();

    function GetTop10Users() {
        $.ajax({
            url: "../api/getAllUsers.php",
            type: "POST",
            success: function (data) {
                users = JSON.parse(data);
                $("#rankingsTable").html("");
                users.forEach((user, index) => {
                    let color = "";
                    if (index === 0) {
                        color = "bg-[#d4af37] font-semibold text-white";
                    } else if (index === 1) {
                        color = "bg-[#a0a0a0] font-semibold text-white";
                    } else if (index === 2) {
                        color = "bg-[#cd7f32] font-semibold text-white";
                    }
                    $("#rankingsTable").append(`<div id="td_${
                        user.username
                    }" class="group w-full h-10 flex justify-between items-center py-6 px-2 select-none cursor-pointer">
                        <p class="w-14 flex items-center justify-center ${color} px-9 p-1 rounded-xl ">#${
                        index + 1
                    }</p>
                        <p class="group-hover:scale-105 transition-all">${
                            user.username
                        }</p>
                        <p class="w-14 flex items-center justify-center text-white bg-neutral-900/75 px-9 p-1 rounded-xl">${parseInt(
                            user.value
                        ).toLocaleString()}</p>
                    </div>`);
                });
                users.forEach((user) => {
                    const userDiv = $(`#td_${user.username}`);
                    userDiv.click(() => {
                        window.location.href = `../pages/collections.php?username=${user.username}`;
                    });
                    userDiv.mousemove((e) => {
                        userDiv.css("background-color", "#00000007");
                        $("#tooltip").css("display", "flex");
                        $("#tooltip").css("top", `${e.clientY - 30}px`);
                        $("#tooltip").css("left", `${e.clientX + 20}px`);
                        $("#tooltipName").html(user.firstname + " " + user.lastname);
                    });
                    userDiv.mouseout(() => {
                        userDiv.css("background-color", "transparent");
                        $("#tooltip").css("display", "none");
                    });
                });
            }
        });
    }

    function UpdateUserValues() {
        $.ajax({
            url: "../api/updateUserValues.php",
            type: "POST",
            success: function (data) {
                const response = JSON.parse(data);
                if (response.success === "true") {
                    console.log("User values updated");
                } else {
                    console.log("User values not updated");
                }
            }
        });
    }
});