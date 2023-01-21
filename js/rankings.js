const rankingsTable = document.getElementById("rankingsTable");
const tooltip = document.getElementById("tooltip");
const tooltipName = document.getElementById("tooltipName");
tooltip.style.display = "none";
let users = [];

UpdateUserValues();
GetTop10Users();

function GetTop10Users() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        users = JSON.parse(xmlhttp.responseText);
        rankingsTable.innerHTML = "";
        users.forEach((user, index) => {
            let color = "";
            if (index === 0) {
                color = "bg-[#d4af37] font-semibold text-white";
            } else if (index === 1) {
                color = "bg-[#a0a0a0] font-semibold text-white";
            } else if (index === 2) {
                color = "bg-[#cd7f32] font-semibold text-white";
            }
            rankingsTable.innerHTML += `<div id="td_${
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
            </div>`;
        });
        users.forEach((user) => {
            const userDiv = document.getElementById(`td_${user.username}`);
            userDiv.addEventListener("click", () => {
                window.location.href = `../pages/collections.php?username=${user.username}`;
            });
            userDiv.addEventListener("mousemove", (e) => {
                userDiv.style.backgroundColor = "#00000007";
                tooltip.style.display = "flex";
                tooltip.style.top = `${e.clientY - 30}px`;
                tooltip.style.left = `${e.clientX + 20}px`;
                tooltipName.innerHTML = user.firstname + " " + user.lastname;
            });
            userDiv.addEventListener("mouseout", () => {
                userDiv.style.backgroundColor = "transparent";
                tooltip.style.display = "none";
            });
        });
    };
    xmlhttp.open("POST", "../api/getAllUsers.php", true);
    xmlhttp.send();
}

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
