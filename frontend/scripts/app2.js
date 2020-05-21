window.onload = () => {
    var destination = localStorage.getItem("destName");
    document.title = destination;

    //tb3an hnb3at l title lli fo2 daf POST
    var xhr = new XMLHttpRequest;
    xhr.onload = () => {

        var textnode = document.createTextNode(xhr.response.city);
        var city = document.createElement("span");
        city.appendChild(textnode);
        var place = document.createTextNode(xhr.response.location);
        document.getElementById("h1").appendChild(city);
        document.getElementById("h1").appendChild(place);

        var textnode = document.createTextNode(xhr.response.first_paragraph);
        document.getElementById("p1").appendChild(textnode);

        var textnode = document.createTextNode(xhr.response.heading);
        document.getElementById("heading").appendChild(textnode);

        var textnode = document.createTextNode(xhr.response.second_paragraph);
        document.getElementById("p2").appendChild(textnode);

        document.getElementById("img").src = xhr.response.image_link;
        document.getElementById("img").alt = xhr.response.place;

        var container = document.getElementById("hero-bg");
        container.style.background = "#307D99 url('" + xhr.response.background_link + "')";
        container.style["background-position-x"] = "center";
        container.style["background-size"] = "cover";
        container.style.position = "relative";
        container.style.height = "100%";
        if (window.matchMedia("(min-width:900px)")) {
            container.style["background-position-y"] = "center";
        }
    }
    xhr.open("POST", "http://localhost:5000/destinations/search");
    xhr.responseType = "json";
    xhr.send({"title":"helwan"});
}