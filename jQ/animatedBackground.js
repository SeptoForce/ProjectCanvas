$(function () {
    $("body").css("background-image", "radial-gradient(#ccc 2px, transparent 2px)");
    $("body").css("background-size", "40px 40px");
    let scroll = 0;
    setInterval(() => {
        $("body").css("background-position", `${scroll}px -${scroll}px`);
        scroll += 0.5;
        if (scroll > 40) scroll = 0;
    }, 17);
});