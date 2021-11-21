import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import classnames from 'classnames';

import Confetti from './Confetti';

import { Typography, Button } from '@material-ui/core';

import { cards } from '../imgs/cards';

import openHack from '../imgs/open_hack_2019-03.svg';

import {
  initiateSocket,
  disconnectSocket,
  setCard,
  showCards,
  resetCards,
  subscribeToStateUpdate,
} from '../utils/socketIo';

import Card from './Card';
import Settings from './Settings';

import styles from './Game.module.css';

const getCards = (players) => {
  if (!players) {
    return null;
  }
  return players.filter(({ card }) => !!card).map(({ card }) => card);
};

const getCardValues = (players) => {
  if (!players) {
    return null;
  }

  const numOr0 = (n) => (isNaN(n) || !n ? Infinity : n);

  // return list of all defined cards
  return players
    .filter(({ card }) => !!card)
    .map(({ card }) => numOr0(card));
};

const getAverage = (players) => {
  if (!players) {
    return null;
  }

  const allCards = getCardValues(players);

  const sum = allCards.reduce((a, b) => a + b, 0);

  return sum ? sum / allCards.length : 0;
};

const Game = () => {
  const { gameId } = useParams();
  const history = useHistory();

  const [userId, setUserId] = useState(null);

  const [showValue, setShowValue] = useState(false);

  const [players, setPlayers] = useState([]);

  const [name, setName] = useState(
    window.localStorage.getItem('name') || null,
  );

  const handleShowValue = () => {
    if (showValue) {
      resetCards();
    } else {
      showCards();
    }
  };

  const handleSelected = (cardName) => {
    setCard(cardName);
  };

  useEffect(() => {
    if (name && gameId) {
      initiateSocket(name, gameId, setUserId);

      subscribeToStateUpdate(setPlayers, setShowValue);

      return () => {
        disconnectSocket();
      };
    }
  }, [name, gameId]);

  const getCard = (value) => {
    if (value) {
      return (
        <>
          {showValue ? (
            <Card cardName={value} />
          ) : (
            <Card cardName={'cover'} />
          )}
        </>
      );
    }

    return <Card />;
  };

  const getPlayer = (player) => (
    <div className={styles.cardContainer} key={player.userId}>
      {getCard(player.card)}
      <div
        className={classnames(styles.playerName, {
          [styles.playerMe]: getMe()?.userId === player.userId,
        })}
      >
        <Typography variant="subtitle1">{player.name}</Typography>
      </div>
    </div>
  );

  const getSomeoneHasCard = () =>
    players?.find((player) => !!player.card);
  const getMe = () =>
    players?.find((player) => player.userId === userId);

  return (
    <div className={styles.gameContainer}>
      <div className={styles.header}>
        <div
          className={styles.headerLogo}
          onClick={() => history.push('/')}
        >
          <img
            className={styles.logo}
            src={openHack}
            alt="Open Hack Logo"
          />
          <div>📅</div>
          <div>🃏</div>
        </div>
        <Typography variant="h5">{gameId}</Typography>
        <Settings setName={setName} name={name} />
      </div>

      <div className={styles.cardsContainer}>
        {showValue && <Confetti cards={getCards(players)} />}
        {players.map((player) => getPlayer(player))}
      </div>

      <div className={styles.selectionContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowValue}
          disabled={!getSomeoneHasCard() && !showValue}
        >
          {showValue ? 'Reset' : 'Show'} cards
        </Button>

        <div className={styles.subtitle}>
          <Typography variant="subtitle2">
            {'Average: '}
            {showValue && getAverage(players)}
          </Typography>
        </div>

        <div className={styles.subtitle}>
          <Typography variant="subtitle1">
            Select your Card
          </Typography>
        </div>

        <div
          className={classnames(styles.btnContainer, {
            [styles.btnsDisabled]: showValue,
          })}
        >
          {cards.map((cardName) => (
            <div
              key={cardName}
              className={classnames(styles.card, {
                [styles.selectedCard]: getMe()?.card === cardName,
              })}
              onClick={() => handleSelected(cardName)}
            >
              <Card cardName={cardName} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
