const canvasShowcase = document.getElementById("canvasShowcase");
let username = window.location.href.split("=")[1];
const backButton = document.getElementById("backButton");

const filters = document.querySelectorAll("#filters > div");
const minValue = document.getElementById("minValue");
const maxValue = document.getElementById("maxValue");

let minValueURL = "";
let maxValueURL = "";

let sortValue = "dsc";
let sortDate = "dsc";
let activeSort = "value";
let sortType = "mostValuable";

//↓↑

const sortValueButton = filters[0];
const sortDateButton = filters[1];

const filterButtons = [];
for (let i = 2; i < filters.length; i++) {
    filterButtons.push(filters[i]);
}

sortValueButton.addEventListener("click", () => {
    if (activeSort === "value") {
        if (sortValue === "dsc") {
            sortValue = "asc";
            sortType = "leastValuable";
            sortValueButton.innerHTML = "Sort By Value ↑";
        } else {
            sortValue = "dsc";
            sortType = "mostValuable";
            sortValueButton.innerHTML = "Sort By Value ↓";
        }
    } else {
        activeSort = "value";
        sortValue = "dsc";
        sortType = "mostValuable";
        sortValueButton.innerHTML = "Sort By Value ↓";
        sortValueButton.classList.add("bg-orange-600");
        sortDateButton.classList.remove("bg-orange-600");
        sortValueButton.classList.remove("text-orange-600");
        sortDateButton.classList.add("text-orange-600");
        sortValueButton.classList.add("text-white");
        sortDateButton.classList.remove("text-white");
    }
    GetUserCanvases();
});

sortDateButton.addEventListener("click", () => {
    if (activeSort === "date") {
        if (sortDate === "dsc") {
            sortDate = "asc";
            sortType = "oldest";
            sortDateButton.innerHTML = "Sort By Date ↑";
        } else {
            sortDate = "dsc";
            sortType = "newest";
            sortDateButton.innerHTML = "Sort By Date ↓";
        }
    } else {
        activeSort = "date";
        sortDate = "dsc";
        sortType = "newest";
        sortDateButton.innerHTML = "Sort By Date ↓";
        sortDateButton.classList.add("bg-orange-600");
        sortValueButton.classList.remove("bg-orange-600");
        sortDateButton.classList.remove("text-orange-600");
        sortValueButton.classList.add("text-orange-600");
        sortDateButton.classList.add("text-white");
        sortValueButton.classList.remove("text-white");
    }
    GetUserCanvases();
});

let filterType = "all";
let filterSelected = null;

filterButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (filterSelected === index) {
            filterSelected = null;
            filterType = "all";
            button.classList.remove("bg-neutral-900");
        } else {
            filterSelected = index;
            filterType = button.id.split("_")[1][0];
            button.classList.add("bg-neutral-900");
            filterButtons.forEach((button, index) => {
                if (filterSelected !== index) {
                    button.classList.remove("bg-neutral-900");
                }
            });
        }
        GetUserCanvases();
    });
});

minValue.addEventListener("input", () => {
    if (minValue.value === "") {
        minValueURL = "";
    } else {
        minValueURL = "&minValue=" + minValue.value;
    }
    GetUserCanvases();
});

maxValue.addEventListener("input", () => {
    if (maxValue.value === "") {
        maxValueURL = "";
    } else {
        maxValueURL = "&maxValue=" + maxValue.value;
    }
    GetUserCanvases();
});

backButton.addEventListener("click", () => {
    window.history.back();
});

GetUserCanvases();
function GetUserCanvases() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        console.log(this.responseText);
        const response = JSON.parse(this.responseText);
        let canvases = [];
        canvasShowcase.innerHTML = "";
        if (response.success === "true") {
            canvases = response.canvases;
            canvases.forEach((canvas) => {
                let id = canvas["id"];
                canvasShowcase.innerHTML += `<div id="${
                    "canvas_" + id
                }" class="hover:scale-105 cursor-pointer select-none transition-all w-56 h-min bg-neutral-100 rounded-xl drop-shadow-[0px_2px_10px_rgb(0,0,0,0.1)] flex flex-col justify-between items-center text-center overflow-hidden">
                <div class="w-56 h-[19rem] bg-neutral-900 rounded-lg grid grid-cols-6 place-items-center p-1">
                ${WriteCells(canvas["designcode"])}
                </div>
                <p class="text-sm rounded-b-md pb-0.5 px-5 text-white bg-neutral-900">V ${canvas[
                    "value"
                ].toLocaleString()}</p>
                <p class="m-1 font-semibold">${canvas["name"]}</p>
            </div>`;
            });
            canvases.forEach((canvas) => {
                const canvasElement = document.getElementById(
                    "canvas_" + canvas["id"]
                );
                canvasElement.addEventListener("click", () => {
                    window.location.href =
                        "creation.php?canvas=" + canvas["designcode"];
                });
            });
        } else {
            canvasShowcase.innerHTML =
                "<div><p class='text-neutral-800 text-3xl mt-8'>No canvases found.</p></div";
        }
    };
    xmlhttp.open(
        "POST",
        "../api/finder.php?sort=" +
            sortType +
            "&filter=" +
            filterType +
            minValueURL +
            maxValueURL,
        true
    );
    xmlhttp.send();
}

function WriteCells(code) {
    let returnString = ``;
    const ColorDefinitions = {
        n: "neutral",
        r: "red",
        y: "yellow",
        g: "green",
        c: "cyan",
        b: "blue",
        f: "fuchsia",
    };
    //split code into array by 2 characters
    let codeArray = code.match(/.{1,2}/g);
    codeArray.forEach((code, index) => {
        let color = ColorDefinitions[code[0]];
        let shade = code[1];
        returnString += `<div class='w-8 h-8 bg-${color}-${shade}00 rounded-[0.2rem]'></div>`;
    });
    return returnString;
}
