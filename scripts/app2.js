window.onload = () => {
    var destination = localStorage.getItem("destName");
    document.title = destination;
    
    //tb3an hnb3at l title lli fo2 daf POST
    var xhr = new XMLHttpRequest;
    xhr.onload = () => {
        
        var textnode = document.createTextNode(xhr.response.city);
        var city = document.createElement("span");
        city.appendChild(textnode);
        var textnode = document.createTextNode(xhr.response.place);
        document.getElementById("h1").appendChild(city);
        document.getElementById("h1").appendChild(textnode);

        var textnode = document.createTextNode(xhr.response.p1);
        document.getElementById("p1").appendChild(textnode);

        var textnode = document.createTextNode(xhr.response.heading);
        document.getElementById("heading").appendChild(textnode);
        
        var textnode = document.createTextNode(xhr.response.p2);
        document.getElementById("p2").appendChild(textnode);
    }
    xhr.open("GET","/test2.json");
    xhr.responseType = "json";
    xhr.send();
}