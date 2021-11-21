import React from "react";

import ReactConfetti from "react-confetti";

const Confetti = ({ cards }) => {
  if (cards.length > 1) {
    const allCardsMatch = cards.every((card) => card === cards[0]);
    if (allCardsMatch) {
      return <ReactConfetti recycle={false} numberOfPieces={800} />;
    }
  }
  return null;
};

export default Confetti;
