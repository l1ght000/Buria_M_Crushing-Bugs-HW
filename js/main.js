// variables always go at the top -> this is step 1
// these are the connections that you're making to elements on the page 
// use CSS selectors to make connections to elements with JavaScript

// create a 1 to 1 connection with a variable -> querySelector("queryString")
// let theButton = document.querySelector("#buttonOne");

// create a 1 to many connection with a variable -> querySelectorAll("queryString")
let theButtons = document.querySelectorAll("#buttonHolder img"),
	theHeading = document.querySelector("#headLine h1"),
	puzzleBoard = document.querySelector(".puzzle-board"),
	puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
	dropZones = document.querySelectorAll('.drop-zone'),
	// store the dragged piece in a global variable
	// because we need it in the handleDrop function
	draggedPiece;

// step 3
// functionality always goes in the middle -> how do we want
// the app to behave?
function changeBGImage() {
    puzzleBoard.style.backgroundImage = `url(images/backGround${this.id}.jpg)`;
  
    // reset the board by reparenting the puzzle pieces back to the original drag zone
    puzzlePieces.forEach(piece => {
      piece.parentNode.removeChild(piece);
      puzzleBoard.appendChild(piece);
    });
  
    // remove any dropped pieces from the drop zones
    dropZones.forEach(zone => {
      if (zone.children.length > 0) {
        zone.removeChild(zone.children[0]);
      }
    });
    puzzleBoard.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(puzzlePieces.length))}, 1fr)`;
    puzzlePieces.forEach(piece => {
      piece.style.width = `${puzzleBoard.clientWidth / Math.ceil(Math.sqrt(puzzlePieces.length))}px`;
      piece.style.cursor = 'grab';
    });
  }



function handleStartDrag() { 
	console.log('started dragging this piece:', this);

	// store a reference to the puzzle piece image that we're dragging
	// so we can use it later and move it to a drop zone
	draggedPiece = this;
}

function handleDragOver(e) { 
	e.preventDefault(); // e is shorthand for event
	// this overrides the default dragover behaviour
	console.log('dragged over me'); 
}

function handleDrop(e) {
    e.preventDefault();
    console.log('dropped something on me');

    if (this.children.length > 0) {
      console.log('There is already a puzzle piece here');
      return;
    }

    // move the dragged piece to the drop zone
    this.appendChild(draggedPiece);
  }

// step 2
// event handling always goes at the bottom => 
// how do we want users to interact with our app

// 1 to 1 event handling
//theButton.addEventListener("click", changeBGImage);

// 1 to many event handling
// add event handling to each button in the collection of buttons, one at a time
theButtons.forEach(button => button.addEventListener("click", changeBGImage));

// add the drag event handling to the puzzle pieces
puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

// add the dragover AND the drop event handling to the drop zones
dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));

// add the drop event handling
dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));