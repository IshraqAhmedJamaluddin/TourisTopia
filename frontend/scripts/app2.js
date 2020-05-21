window.onload = () => {
    var destination = localStorage.getItem("destName");
    document.title = destination;

    //tb3an hnb3at l title lli fo2 daf POST toz feky
    var xhr = new XMLHttpRequest;
    xhr.onload = () => {

        var textnode = document.createTextNode(xhr.response.city);
        var city = document.createElement("span");
        city.appendChild(textnode);
        var place = document.createTextNode(xhr.response.place);
        document.getElementById("h1").appendChild(city);
        document.getElementById("h1").appendChild(place);

        var textnode = document.createTextNode(xhr.response.p1);
        document.getElementById("p1").appendChild(textnode);

        var textnode = document.createTextNode(xhr.response.heading);
        document.getElementById("heading").appendChild(textnode);

        var textnode = document.createTextNode(xhr.response.p2);
        document.getElementById("p2").appendChild(textnode);

        document.getElementById("img").src = xhr.response.img;
        document.getElementById("img").alt = xhr.response.place;

        var container = document.getElementById("hero-bg");
        container.style.background = "#307D99 url('" + xhr.response.bg + "')";
        container.style["background-position-x"] = "center";
        container.style["background-size"] = "cover";
        container.style.position = "relative";
        container.style.height = "100%";
        if (window.matchMedia("(min-width:900px)")) {
            container.style["background-position-y"] = "center";
        }
    }
    xhr.open("GET", "test2.json");
    xhr.responseType = "json";
    xhr.send();
}