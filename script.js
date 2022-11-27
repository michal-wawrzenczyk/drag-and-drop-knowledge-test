const draggableListItems = document.querySelectorAll(".draggable-list li");
const endMessage = document.getElementById("end-message");
const startMessage = document.getElementById("start-message");

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

let selectedId;
let dropTargetId;
let matchingCounter = 0;

addEventListeners();

function dragStart() {
  selectedId = this.id;
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(event) {
  event.preventDefault();
}

function dragDrop() {
  dropTargetId = this.id;

  if (checkForMatch(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = "none";
    document.getElementById(dropTargetId).style.display = "none";
    matchingCounter++;
  } else if (checkForMatch2(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = "none";
    document.getElementById(dropTargetId).style.display = "none";
    matchingCounter++;
  } else {
    modal.style.display = "block";
  }

  if (matchingCounter === 5) {
    endMessage.style.display = "block";
    startMessage.style.display = "none";
  }

  this.classList.remove("over");
}

function checkForMatch(selected, dropTarget) {
  switch (selected) {
    case "c1":
      return dropTarget === "d1" ? true : false;
    case "c2":
      return dropTarget === "d2" ? true : false;
    case "c3":
      return dropTarget === "d3" ? true : false;
    case "c4":
      return dropTarget === "d4" ? true : false;
    case "c5":
      return dropTarget === "d5" ? true : false;

    default:
      return false;
  }
}

function checkForMatch2(selected, dropTarget) {
  switch (selected) {
    case "d1":
      return dropTarget === "c1" ? true : false;
    case "d2":
      return dropTarget === "c2" ? true : false;
    case "d3":
      return dropTarget === "c3" ? true : false;
    case "d4":
      return dropTarget === "c4" ? true : false;
    case "d5":
      return dropTarget === "c5" ? true : false;

    default:
      return false;
  }
}

function playAgain() {
  matchingCounter = 0;
  endMessage.style.display = "none";
  startMessage.style.display = "block";
  draggableListItems.forEach((item) => {
    document.getElementById(item.id).style.display = "block";
  });
}

function addEventListeners() {
  draggableListItems.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragleave", dragLeave);
  });

  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
