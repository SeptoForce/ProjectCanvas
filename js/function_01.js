// Description: JavaScript for the drawing on the canvas

const canvas = document.querySelector('#canvas');
const canvasPixels = document.querySelectorAll('#canvas>div');
const colorPickerColors = document.querySelectorAll('#colorPicker>div');
let selectedColorPickerColor = null;
ChangeSelectedColor(0);

function ChangeSelectedColor(index) {
    selectedColorPickerColor = colorPickerColors[index];
    selectedColorPickerColor.style.border = '3px solid black';
}

colorPickerColors.forEach((color, index) => {
    color.addEventListener('click', () => {
        selectedColorPickerColor.style.border = 'none';
        ChangeSelectedColor(index);
    });
});

let isMouseDown = false;
document.body.onmousedown = function() {
    isMouseDown = true;
}
document.body.onmouseup = function() {
    isMouseDown = false;
}

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