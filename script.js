var input = document.getElementById('textBox');
input.addEventListener("keyup", function (event) {

    if (event.keyCode == 13) {
        document.querySelector(".btn").click();
    }

});

function getData() {
    document.querySelector(".spinner").style.display="block";
    var xml = new XMLHttpRequest();
    var username = document.getElementById('textBox').value;
    var url = "https://api.github.com/users/" + username;

    xml.open("get", url, true);
    xml.send();
    xml.onreadystatechange = function () {
        document.querySelector(".spinner").style.display="none";

        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            dataParseHoJaye(data);
        } else {
            document.getElementsByClassName('info')[0].style.display = "none";
            document.getElementsByClassName("error")[0].style.display = "block";
            document.getElementsByClassName('error')[0].getElementsByTagName('h1')[0].innerHTML = "sorry user not found";

        }
    }

    function dataParseHoJaye(data) {
        document.getElementsByClassName("error")[0].style.display = "none";
        document.getElementsByClassName('info')[0].style.display = "block";
        document.querySelector("#bio").setAttribute("class", "fadeout");
        document.querySelector("#About").setAttribute("class", "fadeout");
        document.querySelector("#repos").setAttribute("class", "fadeout");
        document.querySelector("#repos").setAttribute("class", "fadeout");
        document.querySelector(".profile").setAttribute("class", "profile fadeout");
        var gitId = document.getElementById("gitId");
        var h1 = document.createElement("H2");

        document.getElementById("name").getElementsByTagName("h1")[0].innerHTML = data.name;



        var a = document.querySelector("#bio");
        var b = document.querySelector("#About");
        var c = document.querySelector("#repos");
        var d = document.querySelector(".profile");
        setTimeout(function () {
            if (d.querySelector(".fadein") == null) {
                document.querySelector(".profile").setAttribute("class", "profile fadein");
                gitId.appendChild(h1);
                gitId.getElementsByTagName("H2")[0].innerHTML = "GitId : " + data.id;
                var b1 = document.querySelector(".profile");
                b1.getElementsByTagName("img")[0].setAttribute("src", data.avatar_url);
                document.querySelector(".profilepic").style.visibility = "visible";
                document.getElementsByClassName("follower")[0].getElementsByTagName("p")[0].innerHTML = data.followers;
                document.getElementsByClassName("following")[0].getElementsByTagName("p")[0].innerHTML = data.following;
                document.getElementById("name").getElementsByTagName("a")[0].setAttribute("href", data.html_url);
                document.querySelector(".profile").getElementsByTagName("a")[0].setAttribute("href", data.html_url);
                document.querySelector(".follower").getElementsByTagName("a")[0].setAttribute("href", data.html_url + "?tab=followers");
                document.querySelector(".following").getElementsByTagName("a")[0].setAttribute("href", data.html_url + "?tab=following");
            }
            if (a.querySelector(".fadein") == null) {
                a.setAttribute("class", "fadein");
                if (data.bio == null) {
                    document.getElementById("bio").getElementsByTagName("p")[0].innerHTML = "This is the random text as this person does not have any bio"
                } else {
                    document.getElementById("bio").getElementsByTagName("p")[0].innerHTML = data.bio;
                }
            }
            if (b.querySelector(".fadein") == null) {
                b.setAttribute("class", "fadein");
                var e=document.getElementById("About");
                if (data.name == null) {
                    
                    e.getElementsByClassName("Aname")[0].style.display = "none";

                } else {
                    e.getElementsByClassName("Aname")[0].style.display = "block";
                    e.getElementsByTagName("p")[0].innerHTML = data.name;
                }
                if (data.location == null) {
                    e.getElementsByClassName("Alocation")[0].style.display = "none";

                } else {
                    e.getElementsByClassName("Alocation")[0].style.display = "block";
                    e.getElementsByTagName("p")[1].innerHTML = data.location;
                }
                if (data.email == null) {
                    e.getElementsByClassName("Aemail")[0].style.display = "none";
                } else {
                    e.getElementsByClassName("Aemail")[0].style.display = "block";
                    e.getElementsByTagName("p")[2].innerHTML = data.email;
                }
                if (data.blog == "") {
                    e.getElementsByClassName("Ablog")[0].style.display = "none";

                } else {
                    e.getElementsByClassName("Ablog")[0].style.display = "block";
                    e.getElementsByTagName("p")[3].getElementsByTagName("a")[0].setAttribute("href", data.blog);
                }
                if (data.company == null) {
                    e.getElementsByClassName("Acompany")[0].style.display = "none";
                } else {
                    e.getElementsByClassName("Acompany")[0].style.display = "block";
                    e.getElementsByTagName("p")[4].getElementsByTagName("a")[0].setAttribute("href", data.company);

                }
            }
            if (c.querySelector(".fadein") == null) {
                c.setAttribute("class", "fadein");
                c.getElementsByTagName("p")[0].getElementsByTagName("a")[0].innerHTML = data.public_repos;
                c.getElementsByTagName("p")[0].getElementsByTagName("a")[0].setAttribute("href", data.html_url + "?tab=repositories");
                c.getElementsByTagName("p")[1].innerHTML=data.updated_at.slice(0,10);
            }
        }, 2000);

    }

}