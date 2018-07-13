//programmatic variables
let suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];
let playerHand = []; let dealerHand = [];
let gameOver = false;
let handOver = false;
let playerStand = false;

//document variables
let dealButton = document.getElementById("deal-button");
let hitButton = document.getElementById("hit-button");
let standButton = document.getElementById("stand-button");
let gameStatus = document.getElementById("game-status");
let dealerInfo = document.getElementById("dealer-info");
let playerInfo = document.getElementById("player-info");
let blackJackTable = document.getElementById("blackjack-table");
let playerScore = 0;
let dealerScore = 0;

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

function displayCards(hand, player) {
    let cards = ""
    for (let i = 0; i < hand.length; i++) {
        cards += hand[i].value + " of " + hand[i].suit;
        cards += '\n';
    }
    player.innerText = cards;
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

//function to deal the cards, two to player and dealer, alternating at game start
function dealCards(deck) {
    playerHand[0] = deck.shift();
    dealerHand[0] = deck.shift();
    playerHand[1] = deck.shift();
    dealerHand[1] = deck.shift();
}




dealButton.addEventListener('click', function () {
    let newDeck = createDeck();
    for (let i = 0; i < 5; i++) {
        shuffleDeck(newDeck);
    }
    dealCards(newDeck);
    dealButton.style.display = 'none';
    blackJackTable.style.display = 'inline';
    hitButton.style.display = 'inline';
    standButton.style.display = 'inline';
    gameStatus.innerText = "Let the games begin!";
    displayCards(playerHand, playerInfo);
    displayCards(dealerHand, dealerInfo);
    playerScore = updateScore(playerHand);
    dealerScore = updateScore(dealerHand);

    if (dealerScore === 21 && playerScore !== 21) {
        gameStatus.innerText = "Dealer wins! Play again?";
        gameOver = true;
    } else if (dealerScore === 21 && playerScore === 21) {
        gameStatus.innerText = "It's a tie! PLay again?";
        gameOver = true;
    } else if (playerScore === 21 && dealerScore !== 21) {
        gameStatus.innerText = "Blackjack Baby!";
        gameOver = true;
    }

    hitButton.addEventListener('click', function () {
        playerHand.push(newDeck.shift());
        playerScore = updateScore(playerHand);
        displayCards(playerHand, playerInfo);
        if (playerScore === 21) {
            gameStatus.innerText = "You Win! Play again?";
            hitButton.style.display = 'none';
            gameOver = true;
        } else if (playerScore > 21) {
            gameStatus.innerText = "You Busted! Play again?";
            hitButton.style.display = 'none';
            gameOver = true;
        }
    })

    standButton.addEventListener('click', function () {
        hitButton.style.display = 'none';
        playerStand = true;
        while (dealerScore < 17 && playerStand === true) {
            dealerHand.push(newDeck.shift());
            dealerScore = updateScore(dealerHand);
            displayCards(dealerHand, dealerInfo);
        }
        if (dealerScore > playerScore && dealerScore <= 21) {
            gameStatus.innerText = "Dealer Wins! Play again?";
            gameOver = true;
        } else if (dealerScore === playerScore) {
            gameStatus.innerText = "It's a tie! Play again?";
            gameOver = true;
        } else if (dealerScore > 21) {
            gameStatus.innerText = "Dealer Busted! You win! Play again?";
            gameOver = true;
        } else {
            gameStatus.innerText = "Player wins! Play again?";
            gameOver = true;
        }
    })

    if (gameOver) {
        dealButton.style.display = 'inline';
        standButton.style.display = 'none';
        hitButton.sytle.display = 'none';
        playerScore = 0;
        dealerScore = 0;
    }
})