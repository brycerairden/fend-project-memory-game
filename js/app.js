/* Creates a list that holds all of cards */

let card = document.querySelectorAll(".card");
let cards = [...card];

const deck = document.querySelector(".deck");

/*
 * Displays the cards on the page
 *   - shuffles the list of cards
 *   - loops through each card and create its HTML
 *   - adds each card's HTML to the page
 */

function deal() {
	const cardDeck = shuffle(cards);
	cardDeck.forEach(function(c) {
		deck.appendChild(c);
	})
}

window.onload = deal();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - displayCard() display the card's symbol (put this functionality in another function that you call from this one)
 *  - openCardList() add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + matched() if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + unmatched() if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + count() increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + score() if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Adds "open" class to the card the user clicked on
function displayCard(clickedCard) {
	clickedCard.classList.add('open');
}

// Removes the "open" class to hid the card when it is unmatched or the game is reset after a .8 second delay
function hideCard(card) {
	setTimeout(function () {card.classList.remove('open')}, 800);
}

// Array that will hold the 2 open cards for comparision reasons
let openCards = [];

// Adds the user clicked card to an array that can be used to compare cards
function openCardList(clickedCard) {
	openCards.push(clickedCard);
}

// Variable to count matches, so I know when all cards have been matched
let matches = 0;

// If 2 cards are a match, it removes the "open" class and replaces it with the "match" class while incrementing the number of matches overall
function matched() {
	openCards.forEach(function(card) {
		hideCard(card)
	});
	openCards.forEach(function(card) {
		card.classList.add("match");
	});
	matches++;
}

// if 2 cards are not a match, return them to their original state to be reused
function unmatched() {
	openCards.forEach(function(card) {
		hideCard(card)
	});
}

// Move counter and display of count
const moveCount = document.querySelectorAll(".moves")[0]

function count() {
	counter++;
	moveCount.innerHTML = counter;
}

// Stops the game with the win condition when 8 matches (16 cards) are matched
function score() {
	if (matches === 8) {
		stopTimer();
		modal.style.display = "block";
		document.querySelectorAll(".modal-moves")[0].innerHTML = counter;
		document.querySelectorAll(".modal-time")[0].innerHTML = `Your time was ${endMinutes} min ${endSeconds} sec.`;
		const starsEarned = document.querySelectorAll(".stars")[0].innerHTML;
		document.querySelectorAll(".modal-stars")[0].innerHTML = starsEarned;
	}
}

// Restart function, suffles and resets all values associated with the timer, move counter, star rating, and matches made
const restart = document.querySelectorAll(".restart")[0];
const modalRestart = document.querySelectorAll(".modal-restart")[0]

function restartGame() {
	deal();
	stopTimer();
	counter = 0;
	moveCount.innerHTML = counter;
	displayStars.children[2].style.visibility = "visible";
	displayStars.children[1].style.visibility = "visible";
	cards.forEach(function(card) {
		card.classList.remove('open');
		card.classList.remove('match');
	})
	seconds = 0;
	minutes = 0;
	document.querySelector("#seconds").innerHTML = `0${seconds}`;
	document.querySelector("#minutes").innerHTML = minutes;
	timerStarted = false;
	matches = 0;
	modal.style.display = "none";
}

restart.addEventListener("click", function() {
	restartGame();
});

modalRestart.addEventListener("click", function() {
	restartGame();
});

// Timer function
let seconds = 0,
minutes = 0,
activeTimer,
timerStarted = false,
endSeconds,
endMinutes;

function timer() {
	activeTimer = setInterval(function() {
		console.log(seconds);
		seconds++;
		if (seconds === 60) {
			minutes++;
			seconds = 0;
		}
		document.querySelector("#minutes").innerHTML = minutes;
		if (seconds < 10) {
			document.querySelector("#seconds").innerHTML = `0${seconds}`;
		} else {
			document.querySelector("#seconds").innerHTML = seconds;
		}
	}, 1000)
}

function stopTimer() {
	endSeconds = seconds;
	endMinutes = minutes;
	clearInterval(activeTimer);
}


// Star Rating function
let counter = 0;
const displayStars = document.querySelectorAll(".stars")[0];

function stars() {
	if (counter === 15) {
		displayStars.children[2].style.visibility = "hidden";
	} else if (counter === 25) {
		displayStars.children[1].style.visibility = "hidden";
	}
}

// Event listener set to the ul class, passing along the info on the LI target
deck.addEventListener("click", function(event) {
	let clickedCard;
	if (event.target.nodeName === "UL") {
		return false;
	} else if (event.target.nodeName === "LI") {
		clickedCard = event.target;
	} else if (event.target.nodeName === "IMG") {
		clickedCard = event.target.parentElement;
	};

	// Below ignores matched, or open, before checking if the timer is on, turning it on if not, compares the cards
	if ((clickedCard.classList.contains("match") === false) && (clickedCard.classList.contains("open") === false)) {
		if (timerStarted === false) {
			timerStarted = true;
			timer();
		}
		displayCard(clickedCard);
		openCardList(clickedCard);
		if (openCards.length === 2) {
			if(openCards[0].getAttribute("name") === openCards[1].getAttribute("name")) {
				matched();
			} else {
				unmatched();
			};
			openCards = [];
			count();
		};
	};

	stars();
	score();
});


// Get the modal
const modal = document.querySelector('#win-modal');

// Get the <span> element that closes the modal
const closeModal = document.querySelectorAll(".close-modal")[0];


// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};