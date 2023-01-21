$(document).ready(function () {
    const canvas1 = $("#canvas1");
    const canvas2 = $("#canvas2");
    const canvas1Cells = $("#canvas1 > div");
    const canvas2Cells = $("#canvas2 > div");
    const rewardAmount = $("#rewardAmount");
    const backButton = $("#backButton");

    let canvas1CanvasCode = "";
    let canvas2CanvasCode = "";
    let rewardAmountValue = 0;
    let canvas1ID = 0;
    let canvas2ID = 0;

    const colorDefinitions = {
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
        $.ajax({
            type: "POST",
            url: "../api/getCanvasOptions.php",
            data: { canvas1: canvas1ID, canvas2: canvas2ID },
            success: function (response) {
                console.log(response);
                response = JSON.parse(response);
                if (response.success) {
                    canvas1ID = response.canvasID1;
                    canvas2ID = response.canvasID2;
                    canvas1CanvasCode = response.canvasCode1;
                    canvas2CanvasCode = response.canvasCode2;
                    //split canvas code by 2 characters and save in array
                    let canvas1CodeArray = canvas1CanvasCode.match(/.{1,2}/g);
                    let canvas2CodeArray = canvas2CanvasCode.match(/.{1,2}/g);

                    canvas1Cells.each((index, cell) => {
                        let color =
                            colorDefinitions[canvas1CodeArray[index][0]];
                        let brightness = canvas1CodeArray[index][1];
                        $(cell)
                            .removeClass(function (index, className) {
                                return (
                                    className.match(/(^|\s)bg-\S+/g) || []
                                ).join(" ");
                            })
                            .addClass(`bg-${color}-${brightness}00`);
                    });

                    canvas2Cells.each((index, cell) => {
                        let color =
                            colorDefinitions[canvas2CodeArray[index][0]];
                        let brightness = canvas2CodeArray[index][1];
                        $(cell)
                            .removeClass(function (index, className) {
                                return (
                                    className.match(/(^|\s)bg-\S+/g) || []
                                ).join(" ");
                            })
                            .addClass(`bg-${color}-${brightness}00`);
                    });
                    ready = true;
                } else {
                    alert(response.message);
                }
            },
        });
    };

    GetCanvasOptions();

    let selectedCanvas = null;

    canvas1.on("click", function () {
        if (ready) {
            ready = false;
            selectedCanvas = canvas1ID;
            ProcessSelection();
            GetCanvasOptions();
        }
    });

    canvas2.on("click", function () {
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
        $.ajax({
            type: "POST",
            url: "../api/processSelection.php",
            data: { selectedCanvas: selectedCanvas },
            success: function (response) {
                response = JSON.parse(response);
                if (response.success) {
                    rewardAmountValue += 10;
                    rewardAmount.html("C " + rewardAmountValue);
                } else {
                    alert(response.message);
                }
            },
        });
    };

    backButton.on("click", function () {
        window.history.back();
    });
});
