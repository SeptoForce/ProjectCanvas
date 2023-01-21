$(function () {
    const canvasShowcase = $("#canvasShowcase");
    let username = window.location.href.split("=")[1];
    const backButton = $("#backButton");

    const filters = $("#filters > div");
    const minValue = $("#minValue");
    const maxValue = $("#maxValue");

    let minValueURL = "";
    let maxValueURL = "";

    let sortValue = "dsc";
    let sortDate = "dsc";
    let activeSort = "value";
    let sortType = "mostValuable";

    //↓↑

    const sortValueButton = filters.eq(0);
    const sortDateButton = filters.eq(1);

    const filterButtons = filters.slice(2);

    sortValueButton.on("click", () => {
        if (activeSort === "value") {
            if (sortValue === "dsc") {
                sortValue = "asc";
                sortType = "leastValuable";
                sortValueButton.html("Sort By Value ↑");
            } else {
                sortValue = "dsc";
                sortType = "mostValuable";
                sortValueButton.html("Sort By Value ↓");
            }
        } else {
            activeSort = "value";
            sortValue = "dsc";
            sortType = "mostValuable";
            sortValueButton.html("Sort By Value ↓");
            sortValueButton.addClass("bg-orange-600");
            sortDateButton.removeClass("bg-orange-600");
            sortValueButton.removeClass("text-orange-600");
            sortDateButton.addClass("text-orange-600");
            sortValueButton.addClass("text-white");
            sortDateButton.removeClass("text-white");
        }
        GetUserCanvases();
    });

    sortDateButton.on("click", () => {
        if (activeSort === "date") {
            if (sortDate === "dsc") {
                sortDate = "asc";
                sortType = "oldest";
                sortDateButton.html("Sort By Date ↑");
            } else {
                sortDate = "dsc";
                sortType = "newest";
                sortDateButton.html("Sort By Date ↓");
            }
        } else {
            activeSort = "date";
            sortDate = "dsc";
            sortType = "newest";
            sortDateButton.html("Sort By Date ↓");
            sortDateButton.addClass("bg-orange-600");
            sortValueButton.removeClass("bg-orange-600");
            sortDateButton.removeClass("text-orange-600");
            sortValueButton.addClass("text-orange-600");
            sortDateButton.addClass("text-white");
            sortValueButton.removeClass("text-white");
        }
        GetUserCanvases();
    });

    let filterType = "all";
    let filterSelected = null;

    $(filterButtons).each(function (index) {
        $(this).on("click", function () {
            if (filterSelected === index) {
                filterSelected = null;
                filterType = "all";
                $(this).removeClass("bg-neutral-900");
            } else {
                filterSelected = index;
                filterType = $(this).attr("id").split("_")[1][0];
                $(this).addClass("bg-neutral-900");
                $(filterButtons).each(function (index) {
                    if (filterSelected !== index) {
                        $(this).removeClass("bg-neutral-900");
                    }
                });
            }
            GetUserCanvases();
        });
    });

    minValue.on("input", () => {
        if (minValue.val() === "") {
            minValueURL = "";
        } else {
            minValueURL = "&minValue=" + minValue.val();
        }
        GetUserCanvases();
    });


    maxValue.on("input", () => {
        if (maxValue.val() === "") {
            maxValueURL = "";
        } else {
            maxValueURL = "&maxValue=" + maxValue.val();
        }
        GetUserCanvases();
    });

    backButton.on("click", () => {
        window.history.back();
    });

    GetUserCanvases();
    function GetUserCanvases() {
        $.ajax({
            type: "POST",
            url:
                "../api/finder.php?sort=" +
                sortType +
                "&filter=" +
                filterType +
                minValueURL +
                maxValueURL,
            success: function (response) {
                response = JSON.parse(response);
                console.log(response);
                let canvases = [];
                $("#canvasShowcase").html("");
                if (response.success === "true") {
                    canvases = response.canvases;
                    $.each(canvases, function (index, canvas) {
                        let id = canvas["id"];
                        $(
                            "#canvasShowcase"
                        ).append(`<div id="${"canvas_" + id}" class="hover:scale-105 cursor-pointer select-none transition-all w-56 h-min bg-neutral-100 rounded-xl drop-shadow-[0px_2px_10px_rgb(0,0,0,0.1)] flex flex-col justify-between items-center text-center overflow-hidden">
                        <div class="w-56 h-[19rem] bg-neutral-900 rounded-lg grid grid-cols-6 place-items-center p-1">
                        ${WriteCells(canvas["designcode"])}
                        </div>
                        <p class="text-sm rounded-b-md pb-0.5 px-5 text-white bg-neutral-900">V ${canvas[
                            "value"
                        ].toLocaleString()}</p>
                        <p class="m-1 font-semibold">${canvas["name"]}</p>
                    </div>`);
                    });
                    $.each(canvases, function (index, canvas) {
                        const canvasElement = $("#canvas_" + canvas["id"]);
                        canvasElement.click(() => {
                            window.location.href =
                                "creation.php?canvas=" + canvas["designcode"];
                        });
                    });
                } else {
                    $("#canvasShowcase").html(
                        "<div><p class='text-neutral-800 text-3xl mt-8'>No canvases found.</p></div"
                    );
                }
            },
        });
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

        let codeArray = code.match(/.{1,2}/g);
        $.each(codeArray, function (index, code) {
            let color = ColorDefinitions[code[0]];
            let shade = code[1];
            returnString += `<div class='w-8 h-8 bg-${color}-${shade}00 rounded-[0.2rem]'></div>`;
        });
        return returnString;
    }
});
