# Memory Game Project
Memory Game matching pairs of cards, built by Bryce Rairden, with a gaming theme.


## Table of Contents

* [Game Details](#game-details)
* [How to Play](#how-to-play)
* [Dependencies](#dependencies)

## Game Details

The project is a matching game consisting of 8 pairs of cards. The cards are hidden and must be clicked on to reveal their associated picture. If the two cards clicked match, they remain face up until the game is reset. If the pair of cards do not match, they are flipped back over, hiding their respective images. The game continues until all 8 pairs have been matched.

The player will be judged on the number of turns they take to match all pairs, with less than 15 turn earning the full 3 stars, 15 - 24 moves earning 2 stars, and 25 and over earning 1 star. A timer is also included to inform the player how long they took to solve the problem.

The game may be reset via the reset button at the bottom at any time, or via the Play Again! button on the winning screen.

## How to Play

Click on any card to start the timer. Clicking on a second card will compare the two cards and increment the move counter by 1. Continue selecting cards until all 8 pairs have been matched with their counterparts, at which point you WIN! To reset the game, select the reset icon.

## Dependencies

Browser support for HTML5, CSS3, and Javascript with ES6.
Access to the font-awesome library via the Bootstrap CDN.
Access to Google Fonts via GoogleAPIs for the following fonts: Cabin, VT323, Saira