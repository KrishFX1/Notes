var url_string = window.location.href
var url = new URL(url_string);
var subject = url.searchParams.get("sub");
var chapter = url.searchParams.get("chap");


var array = []

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

var userName = localStorage.getItem("userName")
console.log(userName)
if (userName == null) {
    var a = `?req=false&sub=${subject}&chap=${chapter}&upload=true`
    console.log(a)
    var loc = `http://localhost:5500/id/id.html${a}`
    // console.log(location)
    window.location.replace(loc);
}

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
            localStorage.setItem(`${data.userName}`, `${documentSnapshot.id}`)
            i++
        });

    })
} else {
    localStorage.setItem("index", Number(Number(count) + 1))
}

var index = 1
var images = []



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("imageDiv").addEventListener("click", function (e) {
        if (e.path[0].classList[0] == "imageSelect") {
            var id = e.path[0].id
            if (id < array.length) {

                var reader = new FileReader()
                reader.readAsDataURL(array[id])
                reader.onload = function (event) {
                    document.getElementById("imageid").src = event.target.result
                };

                document.getElementById("popupDiv").style.display = "block"
                document.getElementById("div").style.display = "none"

                document.getElementById('popupImageDiv').style.height = `${75 * screen.height / 100}px`
                document.getElementsByClassName('spacer')[0].style.height = `${12.5 * screen.height / 100}px`
                document.getElementsByClassName('spacer')[1].style.height = `${12.5 * screen.height / 100}px`
                document.getElementById('popupDiv').style.marginTop = "0px"
                document.getElementById('popupDiv').style.width = `${84 / 100 * screen.width}px`
                var height = document.getElementById("imageid").height
                var width = document.getElementById("imageid").width
                document.getElementById("popupImageDiv").style.height = `${screen.height * 75 / 100 - 60}px`
                if (height < width) {
                    document.querySelector("p").style.fontSize = "larger"
                }

                document.getElementById("okButton").addEventListener("click", function (e) {
                    document.getElementById("popupDiv").style.display = "none"
                    document.getElementById("div").style.display = "block"
                    document.getElementById("imageDiv").style.marginTop = "0px"
                    document.getElementById("imageid").src = "https://i.ibb.co/Y2S7t9N/image.png"
                })
            } else {
                document.getElementById("fileInput").click()
            }
        } else if (e.path[0].id == "addButton") {
            document.getElementById("addButton").remove()
            var div = document.createElement("div")
            div.innerHTML = `<div id="div${index}">
      <div class="imageSelect" id="${index}" style="margin: 0px 8px 8px 8px; border-radius: 3px;
    padding: 9.5px;
    background-color: #EFEFEF; width: fit-content; float: left;">Select an Image
      </div>
      <i id="addButton" style="color: #6990f2; margin: 8px 0px 0px 7px; font-size: x-large; float: left;"
        class="add${index} fas fa-plus-circle"></i>
        <i id="delete${index}"
        style="color: #aaa5a5; margin: 16px 5px 0px 7px; font-size: x-large; float: right; visibility: hidden; pointer-events: none;"
        class="deleteImage fas fa-trash"></i>
    </div>`

            var imgDiv = document.getElementById("imageDiv")
            var br = document.createElement("br")
            var br2 = document.createElement("br")
            var br3 = document.createElement("br")
            imgDiv.append(br)
            imgDiv.append(br2)
            imgDiv.append(br3)
            imgDiv.append(div)

            index++

        } else if (e.path[0].classList[0] == "deleteImage") {
            var id = e.path[0].id.slice(6)
            array.splice(id, 1)
            for (let i = 0; i <= array.length; i++) {

                if (i == array.length) {
                    document.getElementById(`${i}`).innerText = "Select an Image"
                    var deleteBin = document.getElementById(`delete${i}`)
                    deleteBin.style.visibility = "hidden"
                    deleteBin.style.pointerEvents = "none"
                } else {
                    document.getElementById(`${i}`).innerText = array[i].name

                }
            }
        }
    })

})

const fileInput = document.getElementById('fileInput');
fileInput.onchange = () => {
    const selectedFiles = fileInput.files;
    if (fileInput.files.length > 1) {
        var length = fileInput.files.length
        for (let index = 1; index < length; index++) {
            document.getElementById("addButton").click()
        }
    }
    for (let index = 0; index < fileInput.files.length; index++) {
        var i = array.length
        array[i] = selectedFiles[index]
        document.getElementById(`${i}`).innerText = selectedFiles[index].name
        document.getElementById(`${i}`).style.color = "#0057F7"
        document.getElementById(`delete${i}`).style.pointerEvents = "all"
        document.getElementById(`delete${i}`).style.visibility = "visible"
    }

}

document.getElementById("confirm").addEventListener("click", function (e) {

    document.getElementById("div").style.display = "none"
    document.getElementById("imageUploadingDiv").style.display = "block"
    var image0 = document.createElement("div")
    image0.innerHTML = `<div class="imageSelect" style="margin: 0px auto 10px auto; border-radius: 3px;padding: 9.5px;  text-align: center;background-color: #EFEFEF; width: fit-content; "> <i style="margin-right: 4px; color: #4AB516;"
    id="icon0" class="icon0 far fa-clock"> </i> <article  id="image0" style="float: right;margin-bottom: 0px;margin-left: 4px;padding-bottom: 8px;margin-top: -2;"> Image 1 Uploading..
    </article>
 </div>`

    document.getElementById("imageUploadDiv").appendChild(image0)

    const options = {
        targetSize: 0.2,
        quality: 0.75,
        maxWidth: 800,
        maxHeight: 600
    }

    const compress = new Compress(options)


    compress.compress(array).then((conversions) => {
        // Conversions is an array of objects like { photo, info }.
        // 'photo' has the photo data while 'info' contains metadata
        // about that particular image compression (e.g. time taken).

        for (let i = 0; i < conversions.length; i++) {
            const { photo, info } = conversions[i]

            if (i > 0) {
                var image = document.createElement("div")
                image.innerHTML = `<div class="imageSelect" style="margin: 0px auto 10px auto; border-radius: 3px;padding: 9.5px;  text-align: center;background-color: #EFEFEF; width: fit-content; "> <i style="margin-right: 4px; color: #4AB516;"
       id="icon${i}" class="icon${i} far fa-clock"> </i> <article  id="image${i}" style="float: right;margin-bottom: 0px;margin-left: 4px;padding-bottom: 8px;margin-top: -2;"> Image ${i + 1} Uploading..
       </article>
    </div>`

                document.getElementById("imageUploadDiv").appendChild(image)
            }


            // Create an object URL which points to the photo Blob data
            const objectUrl = URL.createObjectURL(photo.data)

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Client-ID 2809817d5151af3");
            const formdata = new FormData()
            formdata.append("image", photo.data)
            fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            }).then(data => data.json()).then(async function (data) {
                var img = await data.data
                images.push(img.link)
                var icon = document.getElementsByClassName(`icon${i}`)

                icon[0].classList = [
                    `icon${i} fas fa-check`
                ]
                document.getElementById(`image${i}`).innerText = `Image ${i + 1} uploaded`
                if (i == conversions.length - 1) {
                    setInterval(function () {
                        var length = images.length
                        if (length - i == 1) {
                            var notes = firestore.collection(subject).doc(chapter);
                            notes.update({
                                notes: firebase.firestore.FieldValue.arrayUnion({
                                    urls: images,
                                    userName: userName
                                })
                            });


                            image.innerHTML = `<div class="imageSelect" style="margin: 100px auto 10px auto; border-radius: 3px;padding: 9.5px; font-size:larger; text-align: center;background-color: #EFEFEF; width: fit-content; "> <i style="margin-right: 4px; color: #4AB516; font-size : larger;"
                            class="fas fa-check"> </i> <article style="float: right;margin-bottom: 0px;margin-left: 4px;padding-bottom: 8px;margin-top: -2;"> Notes Uploaded , Redirecting...
                            </article>
                         </div>`
                            document.getElementById("imageUploadDiv").appendChild(image)


                            setTimeout(function () {
                                var a = `?sub=${subject}&chap=${chapter}`
                                var location = `https://classnotes.netlify.app/notes/index.html${a}`
                                window.location.href = `${location}`
                            }, 1000)

                        } else {

                        }

                    }, 500)

                }
            })

            // Set the preview img src to the object URL and wait for it to load
            Compress.loadImageElement(".", objectUrl).then(() => {
                // Revoke the object URL to free up memory
                URL.revokeObjectURL(objectUrl)
            })


        }

    })


})

