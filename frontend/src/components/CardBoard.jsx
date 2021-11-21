import React from 'react';

import classnames from 'classnames';

import { Typography } from '@material-ui/core';

import Card from './Card';

import styles from './CardBoard.module.css';

const getCard = (value, showValue) => {
  if (!value) {
    return <Card />;
  }

  if (showValue) {
    return <Card cardName={value} />;
  }

  return <Card cardName={'cover'} />;
};

const CardBoard = ({ players, me, showValue }) => {
  return (
    <div className={styles.cardsContainer}>
      {players.map((player) => (
        <div className={styles.cardContainer} key={player.userId}>
          {getCard(player.card, showValue)}
          <div
            className={classnames(styles.playerName, {
              [styles.playerMe]: me.userId === player.userId,
            })}
          >
            <Typography variant="subtitle1">{player.name}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardBoard;
