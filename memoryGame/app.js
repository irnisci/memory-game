const cards = document.querySelectorAll(".memory-card");
let cardIsFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  //   this.classList.toggle("flip");
  this.classList.add("flip");

  if (!cardIsFlipped) {
    // first click --> first Card
    cardIsFlipped = true;
    firstCard = this;
  } else {
    // second click --> second Card
    cardIsFlipped = false;
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  //checking the card match

  let isMatched = firstCard.dataset.name === secondCard.dataset.name;

  isMatched ? disabledCards() : unflipCards();
}

function disabledCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  reset();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 1500);
}

function reset() {
  [lockBoard, cardIsFlipped] = [false, false];
  [firstCard, secondCard] = [null, null];
}
//IIFE
(function shuffle() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

cards.forEach(function (card) {
  card.addEventListener("click", flipCard);
});
