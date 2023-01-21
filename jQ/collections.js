$(function () {
    let username = window.location.href.split("=")[1];

    $("#backButton").click(function () {
        window.history.back();
    });

    GetUserCanvases();
    function GetUserCanvases() {
        $.ajax({
            url: "../api/getUserCanvases.php?username=" + username,
            type: "POST",
            success: function (response) {
                response = JSON.parse(response);
                console.log(response);
                let canvases = [];
                $("#canvasShowcase").html("");
                if (response.success === "true") {
                    canvases = response.canvases;
                    canvases.forEach((canvas) => {
                        let id = canvas["id"];
                        $("#canvasShowcase").append(
                            `<div id="${
                                "canvas_" + id
                            }" class="hover:scale-105 cursor-pointer select-none transition-all w-56 h-min bg-neutral-50 rounded-xl drop-shadow-[0px_2px_10px_rgb(0,0,0,0.1)] flex flex-col justify-between items-center text-center overflow-hidden">
                            <div class="w-56 h-[19rem] bg-neutral-900 rounded-lg grid grid-cols-6 place-items-center p-1">
                            ${WriteCells(canvas["designcode"])}
                            </div>
                            <p class="text-sm rounded-b-md pb-0.5 px-5 text-white bg-neutral-900">V ${canvas[
                                "value"
                            ].toLocaleString()}</p>
                            <p class="m-1 font-semibold">${canvas["name"]}</p>
                        </div>`
                        );
                    });
                    canvases.forEach((canvas) => {
                        $("#canvas_" + canvas["id"]).click(function () {
                            window.location.href =
                                "creation.php?canvas=" + canvas["designcode"];
                        });
                    });
                } else {
                    $("#canvasShowcase").html(
                        "<div><p class='text-black text-3xl mt-8'>No canvases found.</p></div"
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
        for (let i = 0; i < code.length; i += 2) {
            let color = ColorDefinitions[code[i]];
            let shade = code[i + 1];
            console.log(color, shade);
            returnString += `<div class='w-[2.1rem] h-[2.1rem] bg-${color}-${shade}00 rounded-[0.3rem]'></div>`;
        }
        return returnString;
    }
});
