function currentSlide(num) {
    var container = document.getElementById("slideshow-container");
    container.style.opacity = "0";
    if (num == 1) {
        container.style.background = "url(/img/Aswan1.jpg)";
    }
    if (num == 2) {
        container.style.background = "url(/img/Aswan2.jpg)";
    }
    if (num == 3) {
        container.style.background = "url(/img/Aswan3.jpg)";
    }
    fadeIn(container);
    container.style["background-position-x"] = "center";
    container.style["background-size"] = "cover";
    container.style.position = "relative";
    container.style.height = "100%";
    if(window.matchMedia("(min-width:900px)")){
        container.style["background-position-y"] = "center";
    }
}

function fadeIn(el) {
    el.style.opacity = 0;
    var tick = function () {
        el.style.opacity = +el.style.opacity + 0.03;
        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
        }
    };
    tick();
}