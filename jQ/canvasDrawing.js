$(function () {
    const canvasPixels = $("#canvas_canvas > div");
    const colorPickerColors = $("#canvas_colorPicker > div");

    let urlParams = new URLSearchParams(window.location.search);
    let canvasCode = urlParams.get("canvas");
    if (canvasCode === null) {
        canvasCode = GenerateCanvasCode();
        window.history.replaceState(null, null, "?canvas=" + canvasCode);
        SetBegginingCanvas(canvasCode);
    } else {
        SetBegginingCanvas(canvasCode);
    }

    let currentCanvasPrice = 0;
    let currentUserWallet = 0;
    let currentPurchaseButtonState = "disabled";

    let selectedColorPickerColor = null;

    let lastCanvasCode = "";

    let userOwnsCanvas = false;

    ChangeSelectedColor(0);
    RefreshInfo();
    setInterval(RefreshInfo, 200);

    let isMouseDown = false;
    $(document).mousedown(function () {
        isMouseDown = true;
    });
    $(document).mouseup(function () {
        isMouseDown = false;
    });

    colorPickerColors.each(function (index) {
        $(this).click(function () {
            selectedColorPickerColor.style.border = "none";
            ChangeSelectedColor(index);
        });
    });

    $("#canvas_canvas > div").on({
        mousemove: function () {
            if (!isMouseDown) {
                return;
            }
            let pixel = $(this);
            PaintPixel(pixel);
        },
        click: function () {
            let pixel = $(this);
            PaintPixel(pixel);
        },
    });

    let PaintPixel = (pixel) => {
        console.log("Painting pixel");
        let selectedColorClass;
        $(selectedColorPickerColor)
            .attr("class")
            .split(/\s+/)
            .forEach((className) => {
                if (className.startsWith("bg-")) {
                    selectedColorClass = className;
                }
            });
        $(pixel)
            .attr("class")
            .split(/\s+/)
            .forEach((className) => {
                if (className.startsWith("bg-")) {
                    if (className === selectedColorClass) {
                        return;
                    }
                    $(pixel).removeClass(className);
                }
            });
        $(pixel).addClass(selectedColorClass);
    };

    function ChangeSelectedColor(index) {
        selectedColorPickerColor = $("#canvas_colorPicker > div")[index];
        $(selectedColorPickerColor).css("border", "3px solid black");
    }

    function RefreshInfo() {
        let canvasCode = GenerateCanvasCode();
        window.history.replaceState(null, null, "?canvas=" + canvasCode);
        if (canvasCode === lastCanvasCode) {
            return;
        }
        lastCanvasCode = canvasCode;

        $.ajax({
            type: "POST",
            url: "../api/refreshCanvasInfo.php",
            data: { canvasCode: canvasCode },
            success: function (response) {
                response = JSON.parse(response);
                if (response.exists === "true") {
                    $("#canvas_canvasNameField").hide();
                    $("#canvas_canvasName").show();
                    $("#canvas_canvasName").html(response.name);
                    $("#canvas_creationDate").html(response.creationDate);
                    $("#canvas_originalCreator").html(response.originalCreator);
                    $("#canvas_originalCreatorUsername").html(
                        "@" + response.originalCreatorUsername
                    );
                    $("#canvas_currentOwner").html(response.currentOwner);
                    $("#canvas_currentOwnerUsername").html(
                        "@" + response.currentOwnerUsername
                    );
                    $("#canvas_value").html("V " + response.canvasValue);
                    $("#canvas_rank").show();
                    $("#canvas_rank").html("# " + response.rank);
                    currentCanvasPrice = Math.ceil(response.price * 1.1);
                    $("#canvas_price").html(
                        "C " + currentCanvasPrice.toLocaleString(undefined)
                    );
                    if (response.userOwnsCanvas === "true") {
                        userOwnsCanvas = true;
                        currentPurchaseButtonState = "disabled";
                    } else {
                        userOwnsCanvas = false;
                        currentPurchaseButtonState = "enabled";
                    }
                } else {
                    $("#canvas_canvasNameField").show();
                    $("#canvas_canvasName").html("");
                    $("#canvas_canvasName").hide();
                    //current date d.m.y.
                    $("#canvas_creationDate").html(
                        new Date().toLocaleDateString("hr-HR")
                    );
                    $("#canvas_originalCreator").html("-");
                    $("#canvas_originalCreatorUsername").html("-");
                    $("#canvas_currentOwner").html("-");
                    $("#canvas_currentOwnerUsername").html("-");
                    let canvasValue = GenerateCanvasValue();
                    $("#canvas_value").html("V " + canvasValue);
                    $("#canvas_rank").hide();
                    $("#canvas_rank").html("");
                    currentCanvasPrice = canvasValue;
                    $("#canvas_price").html(
                        "C " + currentCanvasPrice.toLocaleString(undefined)
                    );
                    userOwnsCanvas = false;
                    currentPurchaseButtonState = "enabled";
                }
                currentUserWallet = response.userWallet;
                $("#user_wallet").html(
                    "C " + currentUserWallet.toLocaleString(undefined)
                );
                CheckIfUserCanAffordCanvas();
            },
        });
    }

    function GenerateCanvasCode() {
        let canvasCode = "";
        $("#canvas_canvas > div").each(function () {
            let allClasses = $(this).attr("class").split(/\s+/);
            let colorClass = allClasses.filter((className) =>
                className.startsWith("bg-")
            )[0];
            let colorCode =
                colorClass.substring(3, 4) +
                colorClass.substring(
                    colorClass.length - 3,
                    colorClass.length - 2
                );
            canvasCode += colorCode;
        });
        return canvasCode;
    }

    function GenerateCanvasValue() {
        console.log("Generating canvas value...");
        let colorsUsed = [];
        $("#canvas_canvas > div").each(function () {
            let colorClass = $(this)
                .attr("class")
                .match(/bg-.{1,20}/g)[0];
            if (!colorsUsed.includes(colorClass)) {
                colorsUsed.push(colorClass);
            }
        });
        return Math.ceil(500 / colorsUsed.length);
    }

    function CheckIfUserCanAffordCanvas() {
        console.log("Checking if user can afford canvas...");
        if (userOwnsCanvas) {
            $("#canvas_purchaseButton")
                .addClass("bg-neutral-300 cursor-not-allowed")
                .removeClass("bg-lime-600 cursor-pointer");
            currentPurchaseButtonState = "disabled";
            return;
        }
        if (currentUserWallet < currentCanvasPrice) {
            $("#canvas_purchaseButton")
                .addClass("bg-neutral-300 cursor-not-allowed")
                .removeClass("bg-lime-600 cursor-pointer");
            currentPurchaseButtonState = "disabled";
        } else {
            $("#canvas_purchaseButton")
                .addClass("bg-lime-600 cursor-pointer")
                .removeClass("bg-neutral-300 cursor-not-allowed");
            currentPurchaseButtonState = "enabled";
        }
    }

    $("#canvas_purchaseButton").on("click", function () {
        console.log("Purchase button clicked...");
        if (currentPurchaseButtonState === "disabled") {
            return;
        }
        if (currentUserWallet < currentCanvasPrice) {
            return;
        }
        TryToPurchaseCanvas();
    });

    TryToPurchaseCanvas = () => {
        console.log("Trying to purchase canvas...");
        $.ajax({
            url: "../api/purchaseCanvas.php",
            method: "POST",
            data: {
                canvasCode: GenerateCanvasCode(),
                canvasName: $("#canvas_canvasNameField").val(),
            },
            success: (response) => {
                const json = JSON.parse(response);
                console.log(response);
                if (json.success === "true") {
                    lastCanvasCode = "";
                    UpdateUserValues();
                    RefreshInfo();
                } else if (json.failWallet === "true") {
                    currentPurchaseButtonState = "disabled";
                }
            },
        });
    };

    function UpdateUserValues() {
        console.log("Updating user values...");
        $.ajax({
            url: "../api/updateUserValues.php",
            method: "POST",
            success: (response) => {
                response = JSON.parse(response);
                console.log(response);
                if (response.success === "true") {
                    console.log("User values updated");
                }
            },
        });
    }

    function SetBegginingCanvas() {
        console.log("Setting beggining canvas...");
        const urlParams = new URLSearchParams(window.location.search);
        const canvasCode = urlParams.get("canvas");
        if (!canvasCode) {
            return;
        }
        let colorDefinitions = {
            n: "neutral",
            r: "red",
            y: "yellow",
            g: "green",
            c: "cyan",
            b: "blue",
            f: "fuchsia",
        };
        let canvasCodeArray = canvasCode.match(/.{1,2}/g);
        $.each(canvasPixels, function (index, pixel) {
            let color =
                colorDefinitions[canvasCodeArray[index].substring(0, 1)];
            let shade = canvasCodeArray[index].substring(1, 2);
            pixel.classList.forEach((className) => {
                if (className.startsWith("bg-")) {
                    pixel.classList.remove(className);
                }
            });
            pixel.classList.add("bg-" + color + "-" + shade + "00");
        });
    }

    $("#canvas_originalCreatorUsername").on("click", function () {
        let username = $("#canvas_originalCreatorUsername").text().substring(1);
        window.location.href = `../pages/collections.php?username=${username}`;
    });

    $("#canvas_currentOwnerUsername").on("click", function () {
        let username = $("#canvas_currentOwnerUsername").text().substring(1);
        window.location.href = `../pages/collections.php?username=${username}`;
    });
});
