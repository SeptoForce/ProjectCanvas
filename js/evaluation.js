const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const canvas1Cells = document.querySelectorAll("#canvas1>div");
const canvas2Cells = document.querySelectorAll("#canvas2>div");
const rewardAmount = document.getElementById("rewardAmount");
const backButton = document.getElementById("backButton");

let canvas1CanvasCode = "";
let canvas2CanvasCode = "";
let rewardAmountValue = 0;
let canvas1ID = 0;
let canvas2ID = 0;

const ColorDefinitions = {
    n: "neutral",
    r: "red",
    y: "yellow",
    g: "green",
    c: "cyan",
    b: "blue",
    f: "fuchsia",
};

let ready = true;
GetCanvasOptions = () => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = () => {
        const response = JSON.parse(xmlHttp.responseText);
        if (response.success) {
            canvas1ID = response.canvasID1;
            canvas2ID = response.canvasID2;
            canvas1CanvasCode = response.canvasCode1;
            canvas2CanvasCode = response.canvasCode2;

            //split canvas code by 2 characters and save in array
            let canvas1CodeArray = canvas1CanvasCode.match(/.{1,2}/g);
            let canvas2CodeArray = canvas2CanvasCode.match(/.{1,2}/g);

            canvas1Cells.forEach((cell, index) => {
                let color = ColorDefinitions[canvas1CodeArray[index][0]];
                let brightness = canvas1CodeArray[index][1];
                cell.classList.forEach((className) => {
                    if (className.startsWith("bg-")) {
                        cell.classList.remove(className);
                    }
                });
                cell.classList.add(`bg-${color}-${brightness}00`);
            });
            canvas2Cells.forEach((cell, index) => {
                let color = ColorDefinitions[canvas2CodeArray[index][0]];
                let brightness = canvas2CodeArray[index][1];
                cell.classList.forEach((className) => {
                    if (className.startsWith("bg-")) {
                        cell.classList.remove(className);
                    }
                });
                cell.classList.add(`bg-${color}-${brightness}00`);
            });
            ready = true;
        } else {
            alert(response.message);
        }
    };
    xmlHttp.open(
        "POST",
        "../api/getCanvasOptions.php?canvas1=" +
            canvas1ID +
            "&canvas2=" +
            canvas2ID,
        true
    );
    xmlHttp.send();
};

GetCanvasOptions();

let selectedCanvas = null;

canvas1.addEventListener("click", function () {
    if (ready) {
        ready = false;
        selectedCanvas = canvas1ID;
        ProcessSelection();
        GetCanvasOptions();
    }
});
canvas2.addEventListener("click", function () {
    if (ready) {
        ready = false;
        selectedCanvas = canvas2ID;
        ProcessSelection();
        GetCanvasOptions();
    }
});

ProcessSelection = () => {
    if (selectedCanvas === null) {
        return;
    }
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = () => {
        const response = JSON.parse(xmlHttp.responseText);
        if (response.success) {
            rewardAmountValue += 10;
            rewardAmount.innerHTML = "C " + rewardAmountValue;
        } else {
            alert(response.message);
        }
    };
    xmlHttp.open(
        "POST",
        "../api/processSelection.php?selectedCanvas=" + selectedCanvas,
        true
    );
    xmlHttp.send();
};

backButton.addEventListener("click", function () {
    window.location.href = "../pages/home.php";
});
