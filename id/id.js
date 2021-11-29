const firebaseConfig = {
    apiKey: "AIzaSyAKRP4LAKzaglHkHJUNtdC91TaPCL4lCxM",
    authDomain: "notes-35d02.firebaseapp.com",
    projectId: "notes-35d02",
    storageBucket: "notes-35d02.appspot.com",
    messagingSenderId: "394958681149",
    appId: "1:394958681149:web:4c88898d12580cd7ada654"
};

var url_string = window.location.href
var url = new URL(url_string);
var subject = url.searchParams.get("sub");
var chapter = url.searchParams.get("chap");
var req = url.searchParams.get("req")
var upload = url.searchParams.get("upload")

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


var userID = localStorage.getItem("userID")
if (userID != null) {
    if (req == "true") {

    } else if (upload == "true") {

    } else {
        var location = `https://classnotes.netlify.app/index.html`
        window.location.replace(`${location}`);
    }

}

document.addEventListener("DOMContentLoaded", function () {


    document.getElementById("confirm").addEventListener("click", function () {
        document.getElementById("verify").innerText = "Verifying..."
        document.getElementById("confirm").style.display = "none"
        document.getElementById("IDinput").style.display = "none"
        var id = Number(document.getElementById("IDinput").value)
        console.log(id)
        db.collection("Users").get().then((querySnapshot) => {
            var i = 0
            querySnapshot.forEach(documentSnapshot => {
                var data = documentSnapshot.data()
                localStorage.setItem(`${documentSnapshot.id}`, `${data.userName}`)
                if (i == querySnapshot.size - 1) {

                    var name = localStorage.getItem(`${id}`)
                    if (name == null) {
                        document.getElementById("verify").innerText = "Sorry You entered an invalid ID , try again"
                        setTimeout(function () {
                            document.getElementById("verify").innerText = "Please Enter Your ID"
                            document.getElementById("confirm").style.display = "block"
                            document.getElementById("IDinput").style.display = "block"
                        }, 1500)
                    } else {
                        localStorage.setItem("userName", name)
                        localStorage.setItem("userID", id)
                        if (req == "true") {
                            var location = `https://classnotes.netlify.app/Requests/req.html?chap=${chapter}&sub=${subject}`
                            window.location.replace(`${location}`);
                        }
                        else if (upload == "true") {
                            var location = `https://classnotes.netlify.app/upload/notes.html?chap=${chapter}&sub=${subject}`
                            window.location.replace(`${location}`);
                        } else {
                            var location = `https://classnotes.netlify.app/index.html`
                            window.location.replace(`${location}`);
                        }

                    }
                }
                i++
            });
        })
    })

})