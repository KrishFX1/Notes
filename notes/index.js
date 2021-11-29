var url_string = window.location.href
var url = new URL(url_string);
var subject = url.searchParams.get("sub");
var chapter = url.searchParams.get("chap");

const firebaseConfig = {
    apiKey: "AIzaSyAKRP4LAKzaglHkHJUNtdC91TaPCL4lCxM",
    authDomain: "notes-35d02.firebaseapp.com",
    projectId: "notes-35d02",
    storageBucket: "notes-35d02.appspot.com",
    messagingSenderId: "394958681149",
    appId: "1:394958681149:web:4c88898d12580cd7ada654"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

var notes = {}

var count = localStorage.getItem("index")
if (count == null) {
    localStorage.setItem("index", 1)
    firestore.collection("Users").get().then((querySnapshot) => {
        var i = 0
        querySnapshot.forEach(documentSnapshot => {
            var data = documentSnapshot.data()
            localStorage.setItem(`${documentSnapshot.id}`, `${data.userName}`)
            i++
        });

    })
} else if (count == 8) {
    localStorage.setItem("index", 1)
    firestore.collection("Users").get().then((querySnapshot) => {
        var i = 0
        querySnapshot.forEach(documentSnapshot => {
            var data = documentSnapshot.data()
            localStorage.setItem(`${documentSnapshot.id}`, `${data.userName}`)
            i++
        });

    })
} else {
    localStorage.setItem("index", Number(Number(count) + 1))
}


document.addEventListener("DOMContentLoaded", function (params) {


    firestore.collection(subject).doc(chapter).get().then((documentSnapshot) => {
        var list = document.getElementById("list")
        if (documentSnapshot.data().notes.length < 1) {
            document.body.innerHTML = ` 
            <li style="list-style: none;height: 100%;" id="list">
            
            <div style="background-color: #89A7F5;" id="div">
        <div class="space" style="height: 32%;display: inline-block; margin: 0; text-align: center;width: 100%;"></div>
        <div data-long-press-delay="600" class="popup">
            <div id="imageDiv" style="width: 100%;">

                <div>
                    <div id="div0" style="text-align: center;">
                        <div class="imageSelect" id="0" style="margin: 0px autp 45px auto; border-radius: 3px;
            padding: 9.5px; 
            background-color: #EFEFEF; width: fit-content; float: left;">No notes for this chapter
                        </div>

                    </div>
                </div>

            </div>
            <div style="width: 100%; ">
                <br>
                <br>
                <br>
                <div id="confirm"
                    style="color:white; padding: 7px; float: right; background-color: #6990f2; font-size: medium; border-radius: 5px; width: fit-content; margin-left: 15px; margin-bottom: 5px;margin-top: 4px; margin-right: 5px;">
                    Upload </div>

                <div id="cancel"
                    style="color:white; padding: 7px; float: right; background-color: #6990f2; font-size: medium; border-radius: 5px; width: fit-content; margin-bottom: 5px;margin-top: 4px; ;">
                    Request</div>
            </div>
        </div>

        <div class="space" style="height: 40%;display: inline-block; margin: 0; text-align: center;width: 100%;"></div>
    </div>
    </li>
 `
            document.getElementById("cancel").addEventListener("click", function () {
                var userID = localStorage.getItem("userID");
                if (userID == null) {
                    var a = `?req=true&sub=${subject}&chap=${chapter}&upload=false`
                    var location = `https://classnotes.netlify.app/id/id.html${a}`
                    window.location.replace(`${location}`);
                } else {
                    var list = document.getElementById("list")
                    list.innerHTML = `<div id="div">
                    <div class="space" style="height: 36.5%;display: inline-block; margin: 0; text-align: center;width: 100%;">
                    </div>
                    <div style="text-align: center; padding-top: 40px;" data-long-press-delay="600" class="popup">
        
                        <i class="fas fa-check" style="margin-left: auto; margin-right: auto;  font-size:68px; color: #4AB516;">
                        </i>
                        <div style="width: 100%; ">
                            <br>
                            <div
                                style="color:white; padding: 7px;  background-color: #6990f2; font-size: medium; border-radius: 5px; width: fit-content; margin-left: auto; margin-bottom: 5px;margin-top: 4px; margin-right: auto;">
                                Requested </div>
                        </div>
                    </div>
                    <div class="space" style="height: 32%;display: inline-block; margin: 0; text-align: center;width: 100%;">
                    </div>
                </div>`
                    firestore.collection("requests").add({
                        chapter: chapter,
                        subject: subject,
                        userID: userID
                    }).then(() => {
                        setTimeout(function () {
                            var location = `https://classnotes.netlify.app/Requests/requests.html`
                            window.location.replace(`${location}`);
                        }, 1000)
                    })
                }
            })
            document.getElementById("confirm").addEventListener("click", function () {
                var userID = localStorage.getItem("userID")
                if (userID == null) {
                    var a = `?req=false&sub=${subject}&chap=${chapter}&upload=true`
                    var location = `https://classnotes.netlify.app/id/id.html${a}`
                    window.location.replace(`${location}`);
                } else {
                    var a = `?sub=${subject}&chap=${chapter}`
                    var location = `https://classnotes.netlify.app/upload/notes.html${a}`
                    window.location.replace(`${location}`);
                }

            })

        }
        else {

            for (let index = 0; index < documentSnapshot.data().notes.length; index++) {
                if (index == 0) {
                    list.innerHTML = ``
                }
                var i = `${index}`
                notes[i] = documentSnapshot.data().notes[index].urls
                var altImage = "https://i.ibb.co/ypGQx4D/image.png"
                var userName = documentSnapshot.data().notes[index].userName

                var div = document.createElement("Div")
                div.innerHTML = `
                <h1 style="font-size: medium; color:#3e5899;"> ${userName}</h1>
                <h3 style="font-size: small; color:#3e5899">${subject} • chapter ${chapter}</h3>
                <div style="height: 12px;"></div>
                <div class="imagesDiv">
                    <div class="image">
                        <img width="100%" height="80%"
                            src="${documentSnapshot.data().notes[index].urls[0] === undefined ? altImage : documentSnapshot.data().notes[index].urls[0]}"
                            alt="">
                    </div>
                    <div class="image">
                        <img width="100%" height="80%"
                            src="${documentSnapshot.data().notes[index].urls[1] === undefined ? altImage : documentSnapshot.data().notes[index].urls[1]}"
                            alt="">
                    </div>

                    <div class="image">
                        <img width="100%" height="80%"
                            src="${documentSnapshot.data().notes[index].urls[2] === undefined ? altImage : documentSnapshot.data().notes[index].urls[2]}" alt="">
                    </div>
                </div>
             <div> 
                <button style="height : fit-content; padding : 4px 0px 4px 0px " type="button" class="button downloadButton" id="${index}">
                    <span class="button__text" id="${index}" >Download</span>
                    
                </button>
                </div>

            `
                div.style.width = "fit-content"

                div.style.height = "fit-content"
                div.classList = ["UserBox"]
                list.append(div)
            }
        }
    })
})

document.body.addEventListener("click", async function (e) {
    if (e.path[0].classList[0] == "button__icon" || e.path[0].classList[0] == "button__text") {
        var doc = new jsPDF('p', 'mm', 'a4')
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        var id = e.path[0].id
        var imageUrls = notes[id]
        for (let index = 0; index < imageUrls.length; index++) {
            var url = imageUrls[index]
            var img = new Image();

            img.src = url // optional parameters
            doc.addImage(img, 'JPEG', 0, 0, width, height);

            if (index == imageUrls.length - 1) {
                doc.save(`${subject} ch${chapter}.pdf`)
            } else {
                doc.addPage()
            }
        }

    }
})