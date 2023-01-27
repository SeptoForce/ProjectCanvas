const canvas = document.querySelector('#canvas_canvas');
const canvasPixels = document.querySelectorAll('#canvas_canvas>div');
const colorPickerColors = document.querySelectorAll('#canvas_colorPicker>div');

const canvasName = document.querySelector('#canvas_canvasName');
const canvasNameField = document.querySelector('#canvas_canvasNameField');
const creationDate = document.querySelector('#canvas_creationDate');
const canvasOriginalCreator = document.querySelector('#canvas_originalCreator');
const canvasOriginalCreatorUsername = document.querySelector('#canvas_originalCreatorUsername');
const canvasCurrentOwner = document.querySelector('#canvas_currentOwner');
const canvasCurrentOwnerUsername = document.querySelector('#canvas_currentOwnerUsername');
const canvasValue = document.querySelector('#canvas_value');
const canvasRank = document.querySelector('#canvas_rank');
const canvasPrice = document.querySelector('#canvas_price');
const canvasPurchaseButton = document.querySelector('#canvas_purchaseButton');

const userWallet = document.querySelector('#user_wallet');

//check if there is ?canvas= in the url
let urlParams = new URLSearchParams(window.location.search);
let canvasCode = urlParams.get('canvas');
if(canvasCode === null){
    canvasCode = GenerateCanvasCode();
    window.history.replaceState(null, null, "?canvas=" + canvasCode);
}else{
    SetBegginingCanvas(canvasCode);
}

let currentCanvasPrice = 0;
let currentUserWallet = 0;
let currentPurchaseButtonState = 'disabled';

let selectedColorPickerColor = null;

let lastCanvasCode = "";

let userOwnsCanvas = false;

ChangeSelectedColor(0);
RefreshInfo();
setInterval(RefreshInfo, 200);

let isMouseDown = false;
document.body.onmousedown = function() {
    isMouseDown = true;
}
document.body.onmouseup = function() {
    isMouseDown = false;
}

colorPickerColors.forEach((color, index) => {
    color.addEventListener('click', () => {
        selectedColorPickerColor.style.border = 'none';
        ChangeSelectedColor(index);
    });
});

canvasPixels.forEach(pixel => {
    pixel.addEventListener('mousemove', () => {
        if (!isMouseDown) {
            return;
        }
        PaintPixel(pixel);
    });
    pixel.addEventListener('click', () => {
        PaintPixel(pixel);
    });
});

let PaintPixel = (pixel) => {
    let selectedColorClass;
    selectedColorPickerColor.classList.forEach(className => {
        if (className.startsWith('bg-')) {
            selectedColorClass = className;
        }
    });
    pixel.classList.forEach(className => {
        if (className.startsWith('bg-')) {
            if (className === selectedColorClass) {
                return;
            }
            pixel.classList.remove(className);
        }
    });
    pixel.classList.add(selectedColorClass);
}

function ChangeSelectedColor(index) {
    selectedColorPickerColor = colorPickerColors[index];
    selectedColorPickerColor.style.border = '3px solid black';
}

function RefreshInfo() {
    let canvasCode = GenerateCanvasCode();
    window.history.replaceState(null, null, "?canvas=" + canvasCode);
    if(canvasCode === lastCanvasCode){
        return;
    }
    lastCanvasCode = canvasCode;
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = () => {
        const response = JSON.parse(xmlHttp.responseText);
        if(response.exists === "true"){
            canvasNameField.style.display = "none";
            canvasName.style.display = "block";
            canvasName.innerHTML = "" + response.name;
            creationDate.innerHTML = response.creationDate;
            canvasOriginalCreator.innerHTML = response.originalCreator;
            canvasOriginalCreatorUsername.innerHTML = "@"+response.originalCreatorUsername;
            canvasCurrentOwner.innerHTML = response.currentOwner;
            canvasCurrentOwnerUsername.innerHTML = "@"+response.currentOwnerUsername;
            canvasValue.innerHTML = "V " + response.canvasValue;
            canvasRank.style.display = "flex";
            canvasRank.innerHTML = "# " + response.rank;
            currentCanvasPrice = Math.ceil(response.price*1.1);
            canvasPrice.innerHTML = "C " + currentCanvasPrice.toLocaleString(undefined);
            if(response.userOwnsCanvas === "true"){
                userOwnsCanvas = true;
                currentPurchaseButtonState = "disabled";
            }else{
                userOwnsCanvas = false;
                currentPurchaseButtonState = "enabled";
            }
            
        }else{
            canvasNameField.style.display = "block";
            canvasName.innerHTML = "";
            canvasName.style.display = "none";
            //current date d.m.y.
            creationDate.innerHTML = new Date().toLocaleDateString("hr-HR");
            canvasOriginalCreator.innerHTML = "-";
            canvasOriginalCreatorUsername.innerHTML = "-";
            canvasCurrentOwner.innerHTML = "-";
            canvasCurrentOwnerUsername.innerHTML = "-";
            canvasValue.innerHTML = "V " + GenerateCanvasValue();
            canvasRank.style.display = "none";
            canvasRank.innerHTML = "";
            currentCanvasPrice = GenerateCanvasValue();
            canvasPrice.innerHTML = "C " + currentCanvasPrice.toLocaleString(undefined);
            userOwnsCanvas = false;
            currentPurchaseButtonState = "enabled";
        }
        currentUserWallet = response.userWallet;
        userWallet.innerHTML = "C " + currentUserWallet.toLocaleString(undefined);
        CheckIfUserCanAffordCanvas();
    }
    xmlHttp.open("POST", "../api/refreshCanvasInfo.php?canvasCode=" + canvasCode, true);
    xmlHttp.send();
}

function GenerateCanvasCode() {
    let canvasCode = "";
    canvasPixels.forEach(pixel => {
        let colorClass = "";
        pixel.classList.forEach(className => {
            if (className.startsWith('bg-')) {
                colorClass = className;
            }
        });
        let colorCode = colorClass.substring(3,4) + colorClass.substring(colorClass.length-3,colorClass.length-2);
        canvasCode += colorCode;
    });
    return canvasCode;
}

function GenerateCanvasValue() {
    let colorsUsed = [];
    canvasPixels.forEach(pixel => {
        let colorClass = "";
        pixel.classList.forEach(className => {
            if (className.startsWith('bg-')) {
                colorClass = className;
            }
        });
        if(!colorsUsed.includes(colorClass)){
            colorsUsed.push(colorClass);
        }
    });
    return Math.ceil(500/colorsUsed.length);    
}

function CheckIfUserCanAffordCanvas() {
    if(userOwnsCanvas){
        canvasPurchaseButton.classList.add('bg-neutral-300', 'cursor-not-allowed');
        canvasPurchaseButton.classList.remove('bg-lime-600', 'cursor-pointer');
        currentPurchaseButtonState = 'disabled';
        return;
    }
    if(currentUserWallet < currentCanvasPrice){
        canvasPurchaseButton.classList.add('bg-neutral-300', 'cursor-not-allowed');
        canvasPurchaseButton.classList.remove('bg-lime-600', 'cursor-pointer');
        currentPurchaseButtonState = 'disabled';
    }else{
        canvasPurchaseButton.classList.add('bg-lime-600', 'cursor-pointer');
        canvasPurchaseButton.classList.remove('bg-neutral-300', 'cursor-not-allowed');
        currentPurchaseButtonState = 'enabled';
    }
}

canvasPurchaseButton.addEventListener('click', () => {
    if(currentPurchaseButtonState === 'disabled'){
        return;
    }
    if(currentUserWallet < currentCanvasPrice){
        return;
    }
    TryToPurchaseCanvas();
});

TryToPurchaseCanvas = () => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = () => {
        const response = JSON.parse(xmlHttp.responseText);
        if(response.success === "true"){
            lastCanvasCode = "";
            UpdateUserValues();
            RefreshInfo();
        }else if(response.failWallet === "true"){
            currentPurchaseButtonState = 'disabled';
        }
    }
    xmlHttp.open("POST", "../api/purchaseCanvas.php?canvasCode=" + GenerateCanvasCode() + "&canvasName=" + canvasNameField.value, true);
    xmlHttp.send();
}

function UpdateUserValues() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = () => {
        const response = JSON.parse(xmlHttp.responseText);
        if(response.success === "true"){
            console.log("User values updated");
        }
    }
    xmlHttp.open("POST", "../api/updateUserValues.php", true);
    xmlHttp.send();
}

function SetBegginingCanvas() {
    const urlParams = new URLSearchParams(window.location.search);
    const canvasCode = urlParams.get('canvas');
    if(canvasCode === null || canvasCode === ""){
        return;
    }
    const ColorDefinitions = {
        'n' : 'neutral',
        'r' : 'red',
        'y' : 'yellow',
        'g' : 'green',
        'c' : 'cyan',
        'b' : 'blue',
        'f' : 'fuchsia',
    }
    let canvasCodeArray = canvasCode.match(/.{1,2}/g);

    canvasPixels.forEach((pixel, index) => {
        let color = ColorDefinitions[canvasCodeArray[index].substring(0,1)];
        let shade = canvasCodeArray[index].substring(1,2);
        //from pixel remove all bg- classes
        pixel.classList.forEach(className => {
            if (className.startsWith('bg-')) {
                pixel.classList.remove(className);
            }
        });
        pixel.classList.add('bg-' + color + '-' + shade + '00');
    });
}

canvasOriginalCreatorUsername.addEventListener('click', () => {
    let username = canvasOriginalCreatorUsername.innerHTML.substring(1, canvasOriginalCreatorUsername.innerHTML.length);
    window.location.href = `../pages/collections.php?username=${username}`;
});

canvasCurrentOwnerUsername.addEventListener('click', () => {
    let username = canvasCurrentOwnerUsername.innerHTML.substring(1, canvasCurrentOwnerUsername.innerHTML.length);
    window.location.href = `../pages/collections.php?username=${username}`;
});