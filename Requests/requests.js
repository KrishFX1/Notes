const firebaseConfig = {
    apiKey: "AIzaSyAKRP4LAKzaglHkHJUNtdC91TaPCL4lCxM",
    authDomain: "notes-35d02.firebaseapp.com",
    projectId: "notes-35d02",
    storageBucket: "notes-35d02.appspot.com",
    messagingSenderId: "394958681149",
    appId: "1:394958681149:web:4c88898d12580cd7ada654"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var array = []

var index = localStorage.getItem("index")
if (index == null) {
    localStorage.setItem("index", 1)
    db.collection("Users").get().then((querySnapshot) => {
        var i = 0
        querySnapshot.forEach(documentSnapshot => {
            var data = documentSnapshot.data()
            localStorage.setItem(`${data.userName}`, `${documentSnapshot.id}`)
            i++
        });

    })
} else if (index == 8) {
    localStorage.setItem("index", 1)
    db.collection("Users").get().then((querySnapshot) => {
        var i = 0
        querySnapshot.forEach(documentSnapshot => {
            var data = documentSnapshot.data()
            localStorage.setItem(`${documentSnapshot.id}`, `${data.userName}`)
            i++
        });

    })
} else {
    localStorage.setItem("index", Number(Number(index) + 1))
}


document.addEventListener("DOMContentLoaded", function () {
    db.collection("requests").get().then((querySnapshot) => {

        var popup = document.getElementsByClassName("popup")[0]

        if (querySnapshot.size == 0) {
            popup.innerHTML = ``
            var div = document.createElement("div")
            div.innerHTML = `<div id="imageDiv" style="width: 100%;">
            <div style="text-align: center;" id="div0">
                <div class="imageSelect" id="0" style="margin: 0px 8px 8px 8px; border-radius: 3px;
        padding: 9.5px; font-size: larger;
        background-color: #EFEFEF; max-width: 85%; width: 200px; float: left;">No requests yet
                </div>
                <i id="addButton" style="color: #6990f2; margin: auto; font-size: x-large; margin-top: 15px;"
                    class="fas fa-cloud-upload-alt"></i>
            </div>
        </div>`
            popup.appendChild(div)
        }
        else {
            var i = 0

            querySnapshot.forEach((doc) => {
                if (i == 0) {
                    popup.innerHTML = ``
                }
                // doc.data() is never undefined for query doc snapshots
                var data = doc.data();
                var userName;
                var userID = data.userID
                var userName = localStorage.getItem(`${userID}`)
                var subject = data.subject
                var chapter = data.chapter
                var div = document.createElement("div")
                div.innerHTML = `<div id="imageDiv" style="width: 100%;">
                    <div style="text-align: center;">
                        <div class="imageSelect" id="0" style="margin: 0px 8px 8px 8px; border-radius: 3px;
                padding: 9.5px; 
                background-color: #EFEFEF; max-width: 85%; width: 200px; float: left;">${userName} requested notes of ${subject} ch${chapter}
                        </div>
                        <i id="addButton" style="color: #6990f2; margin: auto; font-size: x-large; margin-top: 17px;"
                            class="icon${i} fas fa-cloud-upload-alt"></i>
                    </div>
                </div>`
                var br = document.createElement("br")
                var a = `?sub=${subject}&chap=${chapter}`
                var location = `https://classnotes.netlify.app/upload/notes.html${a}`
                var link = `${location}`;

                array.push({ chapter: chapter, subject: subject, link: link })
                popup.appendChild(div)
                popup.appendChild(br)
                i++

            });
        }
    })
    document.getElementsByClassName("popup")[0].addEventListener("click", function (e) {
        if (e.path[0].id == "addButton") {
            var id = e.path[0].classList[0].slice(4, 5)
            var userID = localStorage.getItem("userID")
            if (userID == null) {
                window.location.href = `https://classnotes.netlify.app/id/id.html?upload=true&req=false&chap=${array[id].chapter}&sub=${array[id].subject}`
            } else {
                window.location.href = array[id].link
            }

        }

    })
})

