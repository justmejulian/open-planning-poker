import React from "react";

import ReactConfetti from "react-confetti";

const getCards = (players) => {
  if (!players) {
    return null;
  }
  return players.filter(({ card }) => !!card).map(({ card }) => card);
};

const Confetti = ({ players }) => {
  const cards = getCards(players);

  // only check if more than 1 card
  const allCardsMatch =
    cards.length > 1 ? cards.every((card) => card === cards[0]) : false;

  return (
    allCardsMatch && <ReactConfetti recycle={false} numberOfPieces={800} />
  );
};

export default Confetti;
