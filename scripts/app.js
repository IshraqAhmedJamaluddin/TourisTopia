function currentSlide(num) {
    var container = document.getElementById("slideshow-container");
    var caption = document.getElementById("cap-loc");
    container.style.opacity = "0";
    if (num == 1) {
        container.style.background = "url(/img/Aswan1.jpg)";
        caption.innerText = "Aswan, Egypt."
    }
    if (num == 2) {
        container.style.background = "url(/img/Alex1.jpg)";
        caption.innerText = "Alex, Egypt."
    }
    if (num == 3) {
        container.style.background = "url(/img/Dahab1.jpg)";
        caption.innerText = "Dahab, Egypt."
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

function goToCity() {
    var dest = document.getElementById("dest").value;
    if(!dest){
        window.location.href = "#";
        return;
    }
    window.location.href = "city.html";
    var xhr = new XMLHttpRequest;
    xhr.onload = () => {
        document.title=name;
    }
    xhr.open("POST","/server.js");
    xhr.responseType = JSON;
    xhr.send(dest);
};