const body = document.querySelector('body');
const dotColor = "#ccc";
body.style.backgroundImage = `radial-gradient(${dotColor} 2px, transparent 2px)`;
body.style.backgroundSize = '40px 40px';
let scroll = 0;
setInterval(() => {
    body.style.backgroundPosition = `${scroll}px -${scroll}px`;
    scroll += 0.5;
    if(scroll > 40) scroll = 0;
}, 17);