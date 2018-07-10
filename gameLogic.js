//programmatic variables
let suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];
let playerCards = [], dealerCards = [];
let playerScore = 0, dealerScore = 0;
let gameOver = false;

//document variables
let dealButton = document.getElementById("deal-button");
let hitButton = document.getElementById("hit-button");
let standButton = document.getElementById("stand-button");
let gameStatus = document.getElementById("game-status");
let dealerInfo = document.getElementById("dealer-info");
let playerInfo = document.getElementById("player-info");

//function to create a deck of cards
function createDeck() {
    let deck = [];
    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < values.length; j++) {
            let card = {
                suit: suits[i],
                value: values[j]
            };
            deck.push(card);
        }
    }
    return deck;
}

//function to shuffle the deck
function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let randomNumber = Math.trunc(Math.random() * 52);
        let placeHolder = deck[i];
        deck[i] = deck[randomNumber];
        deck[randomNumber] = placeHolder;
    }
}

//home screen initial look
hitButton.style.display = 'none';
standButton.style.display = 'none';

dealButton.addEventListener('click', function () {
    dealButton.style.display = 'none';
    hitButton.style.display = 'inline';
    standButton.style.display = 'inline';
    gameStatus.innerText = "Let the games begin!";
})

//create the deck and shuffle it five times for good random distribution
let newDeck = createDeck();
For(let i = 0; i < 5; i++) {
    shuffleDeck(newDeck);
}

//function to deal the cards, two to player and dealer, alternating at game start
function dealCards(deck) {
    playerCards[0] = deck.shift();
    dealerCards[0] = deck.shift();
    playerCards[1] = deck.shift();
    dealerCards[1] = deck.shift();
}

function displayCards(personsInfo, hand) {
    for (let i = 0; i < hand.length; i++) {
        personsInfo.innerText = hand[i].value + " of " + hand[i].suit;
    }
}

function updateScore(hand) {
    let score = 0;
    for (let i = 0; i < hand.length; i++) {
        switch (hand[i].value) {
            case "Ace":
                score += 11;
                break;
            case "King":
            case "Queen":
            case "Jack":
            case "Ten":
                score += 10;
                break;
            case "Nine":
                score += 9;
                break;
            case "Eight":
                score += 8;
                break;
            case "Seven":
                score += 7;
                break;
            case "Six":
                score += 6;
                break;
            case "Five":
                score += 5;
                break;
            case "Four":
                score += 4;
                break;
            case "Three":
                score += 3;
                break;
            case "Two":
                score += 2;
                break;
            default:
                break;
        }
    }
    return score;
}

dealCards(newDeck);
displayCards(playerInfo, playerCards);
displayCards(dealerInfo, dealerCards);
playerScore = updateScore(playerCards);
dealerScore = updateScore(dealerCards);
console.log(playerScore, dealerScore);
console.log(playerCards, dealerCards);

