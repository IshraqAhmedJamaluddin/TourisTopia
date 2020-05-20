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
}

window.onload = () => {
    var places = document.getElementById("places");
    var xhr = new XMLHttpRequest;
    xhr.onload = () => {
        var destinations = xhr.response.destinations;
        for (i = 0; i < destinations.length; i++) { 
            var place = document.createElement("option");
            var textnode = document.createTextNode(destinations[i]);
            place.appendChild(textnode);  
            places.appendChild(place);
        } 
    }
    xhr.open("GET","/test.json");
    xhr.responseType = "json";
    xhr.send();
}

// Find all inputs on the DOM which are bound to a datalist via their list attribute.
var inputs = document.querySelectorAll('input[list]');
for (var i = 0; i < inputs.length; i++) {
  // When the value of the input changes...
  inputs[i].addEventListener('change', function() {
    var optionFound = false,
      datalist = this.list;
    // Determine whether an option exists with the current value of the input.
    for (var j = 0; j < datalist.options.length; j++) {
        if (this.value == datalist.options[j].value) {
            optionFound = true;
            break;
        }
    }
    // use the setCustomValidity function of the Validation API
    // to provide an user feedback if the value does not exist in the datalist
    if (optionFound) {
      this.setCustomValidity('');
    } else {
      this.setCustomValidity('Please choose from the available destinations ^_^');
      this.value="";
    }
  });
}
