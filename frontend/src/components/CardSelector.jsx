import React from 'react';

import classnames from 'classnames';

import Card from './Card';

import { cards } from '../imgs/cards';

import styles from './CardSelector.module.css';

const CardSelector = ({ me, setCard, showValue }) => {
  const handleSelected = (cardName) => {
    setCard(cardName);
  };

  return (
    <div
      className={classnames(styles.btnContainer, {
        [styles.btnsDisabled]: showValue,
      })}
    >
      {cards.map((cardName) => (
        <div
          key={cardName}
          className={classnames(styles.card, {
            [styles.selectedCard]: me?.card === cardName,
          })}
          onClick={() => handleSelected(cardName)}
        >
          <Card cardName={cardName} />
        </div>
      ))}
    </div>
  );
};

export default CardSelector;
