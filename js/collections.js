const canvasShowcase = document.getElementById("canvasShowcase");
let username = window.location.href.split("=")[1];
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", () => {
    window.history.back();
});



GetUserCanvases();
function GetUserCanvases() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const response = JSON.parse(this.responseText);
        let canvases = [];
        canvasShowcase.innerHTML = "";
        if (response.success === "true") {
            canvases = response.canvases;
            canvases.forEach(canvas => {
                let id = canvas["id"];
                canvasShowcase.innerHTML += 
                `<div id="${"canvas_"+id}" class="hover:scale-105 cursor-pointer select-none transition-all w-56 h-min bg-neutral-50 rounded-xl drop-shadow-[0px_2px_10px_rgb(0,0,0,0.1)] flex flex-col justify-between items-center text-center overflow-hidden">
                <div class="w-56 h-[19rem] bg-neutral-900 rounded-lg grid grid-cols-6 place-items-center p-1">
                ${WriteCells(canvas["designcode"])}
                </div>
                <p class="text-sm rounded-b-md pb-0.5 px-5 text-white bg-neutral-900">V ${canvas["value"].toLocaleString()}</p>
                <p class="m-1 font-semibold">${canvas["name"]}</p>
            </div>`;
            });
            canvases.forEach(canvas => {
                const canvasElement = document.getElementById("canvas_"+canvas["id"]);
                canvasElement.addEventListener("click", () => {
                    window.location.href = "creation.php?canvas="+canvas["designcode"];
                });
            });
        } else {
            canvasShowcase.innerHTML = "<div><p class='text-black text-3xl mt-8'>No canvases found.</p></div";
        }
    }
    xmlhttp.open("POST", "../api/getUserCanvases.php?username="+username, true);
    xmlhttp.send();
}

function WriteCells(code) {
    let returnString = ``;
    const ColorDefinitions = {
        'n' : 'neutral',
        'r' : 'red',
        'y' : 'yellow',
        'g' : 'green',
        'c' : 'cyan',
        'b' : 'blue',
        'f' : 'fuchsia',
    }
    //split code into array by 2 characters
    let codeArray = code.match(/.{1,2}/g);
    codeArray.forEach((code, index) => {
        let color = ColorDefinitions[code[0]];
        let shade = code[1];
        returnString += (`<div class='w-8 h-8 bg-${color}-${shade}00 rounded-[0.2rem]'></div>`);
    });
    return returnString;
}