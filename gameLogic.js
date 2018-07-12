//programmatic variables
let suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];
let playerHand = []; let dealerHand = [];
let playerScore = 0; let dealerScore = 0;
let gameOver = false;

//document variables
let dealButton = document.getElementById("deal-button");
let hitButton = document.getElementById("hit-button");
let standButton = document.getElementById("stand-button");
let gameStatus = document.getElementById("game-status");
let dealerInfo = document.getElementById("dealer-info");
let playerInfo = document.getElementById("player-info");
let blackJackTable = document.getElementById("blackjack-table");

//function to create a deck of cards
function createDeck() {
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
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
blackJackTable.style.display = 'none';
hitButton.style.display = 'none';
standButton.style.display = 'none';

function displaycards(hand, player) {
    for (let i = 0; i < hand.length; i++) {
        player.innertext = hand[i].value + " of " + hand[i].suit;
        player.innertext += '\n';
    }
}

//create the deck and shuffle it five times for good random distribution
let newDeck = createDeck();
for (let i = 0; i < 5; i++) {
    shuffleDeck(newDeck);
}

//function to deal the cards, two to player and dealer, alternating at game start
function dealCards(deck) {
    playerHand[0] = deck.shift();
    dealerHand[0] = deck.shift();
    playerHand[1] = deck.shift();
    dealerHand[1] = deck.shift();
}

dealButton.addEventListener('click', function () {
    dealCards(newDeck);
    dealButton.style.display = 'none';
    blackJackTable.style.display = 'inline';
    hitButton.style.display = 'inline';
    standButton.style.display = 'inline';
    gameStatus.innerText = "Let the games begin!";
    displaycards(playerHand, playerInfo);
    displaycards(dealerHand, dealerInfo);
})

//function updatescore(hand) {
//    let score = 0;
//    for (let i = 0; i < hand.length; i++) {
//        switch (hand[i].value) {
//            case "ace":
//                score += 11;
//                break;
//            case "king":
//            case "queen":
//            case "jack":
//            case "ten":
//                score += 10;
//                break;
//            case "nine":
//                score += 9;
//                break;
//            case "eight":
//                score += 8;
//                break;
//            case "seven":
//                score += 7;
//                break;
//            case "six":
//                score += 6;
//                break;
//            case "five":
//                score += 5;
//                break;
//            case "four":
//                score += 4;
//                break;
//            case "three":
//                score += 3;
//                break;
//            case "two":
//                score += 2;
//                break;
//            default:
//                break;
//        }
//    }
//    return score;
//}

//playerscore = updatescore(playerhand);
//dealerscore = updatescore(dealerhand);
//console.log(playerscore, dealerscore);
console.log(playerHand, dealerHand);