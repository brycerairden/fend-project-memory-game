/*
 * Create a list that holds all of your cards
 */

let card = document.querySelectorAll(".card");
let cards = [...card];

const deck = document.querySelector(".deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function deal() {
	const cardDeck = shuffle(cards);
	cardDeck.forEach(function(c) {
		deck.appendChild(c);
	})
};

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


function displayCard(clickedCard) {
	clickedCard.classList.add('open');
};

function hideCard(card) {
	setTimeout(function () {card.classList.remove('open')}, 800);
};

let openCards = [];

function openCardList(clickedCard) {
	openCards.push(clickedCard);
	console.log(openCards);
};

let matches = 0;

function matched() {
	console.log ("matched");
	openCards.forEach(function(card) {
		hideCard(card)
	});
	openCards.forEach(function(card) {
		card.classList.add("match");
	});
	matches++;
};

function unmatched() {
	console.log ("unmatched")
	openCards.forEach(function(card) {
		hideCard(card)
	});
};

const moveCount = document.querySelectorAll(".moves")[0]
function count() {
	counter++;
	moveCount.innerHTML = counter;
};

function score() {
	if (matches === 8) {
		console.log("You WIN!")
		stopTimer();
		console.log(`Your time was ${endMinutes} min ${endSeconds} sec.`)
		modal.style.display = "block";
		document.querySelectorAll(".modal-moves")[0].innerHTML = counter;
		document.querySelectorAll(".modal-time")[0].innerHTML = `Your time was ${endMinutes} min ${endSeconds} sec.`;
		const starsEarned = document.querySelectorAll(".stars")[0].innerHTML;
		document.querySelectorAll(".modal-stars")[0].innerHTML = starsEarned;
		// congradulations modal, with replay ask and link to restart function, time to win, and star rating
	}
};

// restart function, suffles and resets all values associated with the timer, move counter, star rating, and matches made
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
};

restart.addEventListener("click", function() {
	restartGame();
});

modalRestart.addEventListener("click", function() {
	restartGame();
});

//timer function
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

let counter = 0;
const displayStars = document.querySelectorAll(".stars")[0];

function stars() {
	if (counter === 15) {
		displayStars.children[2].style.visibility = "hidden";
	} else if (counter === 25) {
		displayStars.children[1].style.visibility = "hidden";
	}
};

deck.addEventListener("click", function(event) {
	let clickedCard;
	if (event.target.nodeName === "UL") {
		return false;
	} else	if (event.target.nodeName === "LI") {
		clickedCard = event.target;
	} else if (event.target.nodeName === "I") {
		clickedCard = event.target.parentElement;
	} else if (event.target.nodeName === "IMG") {
		clickedCard = event.target.parentElement;
	};
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
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}