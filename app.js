
showNotes();
// add node in local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
    }
    if (addTitle.value != "") {
        notesObj.push(myObj);
    }
    else {
        alert("title is necessary !\nwrite note again.");
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";

    //show node on screen
    showNotes();
})

//show notes from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width : 18rem;">
            <div class="card-body">
                <h5 class="card-title ctitle font">${element.title}</h5>
                <hr>
                <div>
                <p class="card-text"> ${element.text}</p>
                </div>
                <button  id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary font">Delete</button>
            </div>
        </div>`;
    })
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h5>Nothing to Show! USE "Add Note" section to add notes.</h5>`;
    }
}

//delete note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//search note
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTitle = element.getElementsByClassName("ctitle")[0].innerText;
        if (cardTitle.includes(inputVal) ||cardTxt.includes(inputVal) ) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

