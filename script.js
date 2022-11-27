// 1. We have 10 draggable list items, and we will have 5 event listeners for each (50 separate event listeners) - that is why we use the querySelectorAll
const draggableListItems = document.querySelectorAll(".draggable-list li");
const endMessage = document.getElementById("end-message");
const startMessage = document.getElementById("start-message");

// 12. Get the Modal
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

// 2. Current phrase being dragged - the "id" must be known to match with the description and to check if the "id's" match
let selectedId;

// 3. Target phrase to compare with the phrase being dragged
let dropTargetId;

// 4. Counter for correct phrases (if 5, then it's a win)
let matchingCounter = 0;

// 5. We need 50 different event listeners
addEventListeners();

// 7. Create functions for the event listeners:

// 7.1
function dragStart() {
  // as soon as we start dragging an item, we want to know it's "id":
  selectedId = this.id;
  //   console.log(selectedId);
}

// 7.2
function dragEnter() {
  // whenever we enter a valid drop zone, we want to add the classList "over":
  this.classList.add("over");
}

// 7.3
function dragLeave() {
  // whenever we leave drop zone, we want to remove the "over" class:
  this.classList.remove("over");
}

// 7.4 - use event for dragOver - to prevent the default behavior, which does not allow to drop.
function dragOver(event) {
  event.preventDefault();
}

// 7.5
function dragDrop() {
  // when we start dragging, the selected "id" must be known to compare with the target "id" of the dropable zone:
  dropTargetId = this.id;
  //   console.log(dropTargetId);

  // 9.
  if (checkForMatch(selectedId, dropTargetId)) {
    // if it is true, then we want to hide it:
    document.getElementById(selectedId).style.display = "none";
    document.getElementById(dropTargetId).style.display = "none";
    // and we will increment the matchingCounter:
    matchingCounter++;
  } else if (checkForMatch2(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = "none";
    document.getElementById(dropTargetId).style.display = "none";
    matchingCounter++;
  } // 13. Display modal:
  else {
    modal.style.display = "block";
  }

  // 9.1 - show end-message when all is matched:
  if (matchingCounter === 5) {
    endMessage.style.display = "block";
    startMessage.style.display = "none";
  }

  // whenever we drop item over a valid drop zone, it changes color (but not when the choice is incorrect):
  this.classList.remove("over");
}

// 8. Funtion to check the match and which then will be used in dragDrop function (7.5)
function checkForMatch(selected, dropTarget) {
  // use switch statement looking at the selected "id":
  switch (selected) {
    case "c1":
      // if 'c1' is equal 'd1', return true, if not, return false:
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

// 11. Matching by dragging description to component name (used in 7.5):
function checkForMatch2(selected, dropTarget) {
  // use switch statement looking at the selected "id":
  switch (selected) {
    case "d1":
      // if 'c1' is equal 'd1', return true, if not, return false:
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

// 10. Function of the button:
function playAgain() {
  // reset the matchingCounter:
  matchingCounter = 0;
  // hide end-message:
  endMessage.style.display = "none";
  // show start-message:
  startMessage.style.display = "block";
  // loop through the list items again:
  draggableListItems.forEach((item) => {
    document.getElementById(item.id).style.display = "block";
  });
}

// 6. During drag operations, several event types are fired:
// (https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
function addEventListeners() {
  draggableListItems.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragleave", dragLeave);
  });

  // 14. Close the Modal
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
