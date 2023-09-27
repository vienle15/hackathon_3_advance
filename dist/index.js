"use strict";
let titleInput = document.querySelector(".title");
let contentInput = document.querySelector(".content");
let notesList = document.querySelector(".notes");
function addNote() {
  let title = titleInput.value;
  let content = contentInput.value;
  let note = {
    title,
    content,
  };
  let notes = JSON.parse(localStorage.getItem("note") || "[]");
  if (title === "") {
    alert("Tiêu đề không được để trống");
    return;
  }
  if (content === "") {
    alert("Nội dung không được để trống");
    return;
  }
  if (
    notes.some((note) => {
      return note.title === title;
    })
  ) {
    alert("Tiêu đề đã tồn tại");
    return;
  }
  notes.push(note);
  localStorage.setItem("note", JSON.stringify(notes));
  titleInput.value = "";
  contentInput.value = "";
  let noteElement = document.createElement("li");
  noteElement.textContent = `${title}: ${content}`;
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Xoá";
  deleteButton.addEventListener("click", (event) => {
    let noteTitle = noteElement.textContent.split(":")[0];
    notes = notes.filter((note) => {
      return note.title !== noteTitle;
    });
    localStorage.setItem("note", JSON.stringify(notes));
    notesList.removeChild(noteElement);
  });
  noteElement.appendChild(deleteButton);
  notesList.appendChild(noteElement);
}
function displayNotes() {
  let notes = JSON.parse(localStorage.getItem("note") || "[]");
  notesList.innerHTML = "";
  notes.forEach((note) => {
    let noteElement = document.createElement("li");
    noteElement.textContent = `${note.title}: ${note.content}`;
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Xoá";
    deleteButton.addEventListener("click", (event) => {
      let noteTitle = noteElement.textContent.split(":")[0];
      notes = notes.filter((note) => {
        return note.title !== noteTitle;
      });
      localStorage.setItem("note", JSON.stringify(notes));
      notesList.removeChild(noteElement);
    });
    noteElement.appendChild(deleteButton);
    notesList.appendChild(noteElement);
  });
}
window.addEventListener("load", displayNotes);
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  addNote();
});
