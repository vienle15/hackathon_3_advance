let titleInput: HTMLInputElement = document.querySelector(".title");
let contentInput: HTMLInputElement = document.querySelector(".content");
let notesList: HTMLUListElement = document.querySelector(".notes");

function addNote(): void {
  let title: string = titleInput.value;
  let content: string = contentInput.value;

  let note: { title: string; content: string } = {
    title,
    content,
  };

  let notes: Array<{ title: string; content: string }> = JSON.parse(
    localStorage.getItem("note") || "[]"
  );
  if (title === "") {
    alert("Tiêu đề không được để trống");
    return;
  }

  if (content === "") {
    alert("Nội dung không được để trống");
    return;
  }

  if (
    notes.some((note: { title: string; content: string }) => {
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

  let noteElement: HTMLLIElement = document.createElement("li");
  noteElement.textContent = `${title}: ${content}`;

  let deleteButton: HTMLButtonElement = document.createElement("button");
  deleteButton.textContent = "Xoá";
  deleteButton.addEventListener("click", (event: Event) => {
    let noteTitle: string = noteElement.textContent.split(":")[0];

    notes = notes.filter((note: { title: string; content: string }) => {
      return note.title !== noteTitle;
    });

    localStorage.setItem("note", JSON.stringify(notes));

    notesList.removeChild(noteElement);
  });

  noteElement.appendChild(deleteButton);

  notesList.appendChild(noteElement);
}

function displayNotes(): void {
  let notes: Array<{ title: string; content: string }> = JSON.parse(
    localStorage.getItem("note") || "[]"
  );

  notesList.innerHTML = "";

  notes.forEach((note: { title: string; content: string }) => {
    let noteElement: HTMLLIElement = document.createElement("li");
    noteElement.textContent = `${note.title}: ${note.content}`;

    let deleteButton: HTMLButtonElement = document.createElement("button");
    deleteButton.textContent = "Xoá";
    deleteButton.addEventListener("click", (event: Event) => {
      let noteTitle: string = noteElement.textContent.split(":")[0];

      notes = notes.filter((note: { title: string; content: string }) => {
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

document.querySelector("form").addEventListener("submit", (event: Event) => {
  event.preventDefault();
  addNote();
});
