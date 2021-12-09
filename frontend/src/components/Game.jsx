import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Typography, Button } from '@material-ui/core';

import {
  initiateSocket,
  disconnectSocket,
  setCard,
  showCards,
  resetCards,
  subscribeToStateUpdate
} from '../utils/socketIo';

import CardBoard from './CardBoard';
import CardSelector from './CardSelector';
import Settings from './Settings';
import Confetti from './Confetti';
import Average from './Average';
import HeaderLogo from './HeaderLogo';

import githubLogo from '../imgs/GitHub-Mark-120px-plus.png';

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
  return players.filter(({ card }) => !!card).map(({ card }) => numOr0(card));
};

const Game = () => {
  const { gameId } = useParams();

  const [userId, setUserId] = useState(null);

  const [showValue, setShowValue] = useState(false);

  const [players, setPlayers] = useState([]);

  const [name, setName] = useState(window.localStorage.getItem('name') || null);

  const handleShowValue = () => {
    if (showValue) {
      resetCards();
    } else {
      showCards();
    }
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

  const getSomeoneHasCard = () => players?.find((player) => !!player.card);
  const getMe = () => players?.find((player) => player.userId === userId);

  return (
    <>
      {showValue && <Confetti cards={getCards(players)} />}
      <div className={styles.gameContainer}>
        <div className={styles.header}>
          <HeaderLogo />
          <Typography variant="h5">{gameId}</Typography>
          <div className={styles.settingsWrapper}>
            <Settings setName={setName} name={name} />
            <a href="https://github.com/justmejulian/open-planning-poker">
              <img
                className={styles.githubLogo}
                src={githubLogo}
                alt="Github Logo"
                title="justmejulian/open-planning-poker"
              />
            </a>
          </div>
        </div>

        <CardBoard players={players} me={getMe()} showValue={showValue} />

        <div className={styles.selectionContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowValue}
            disabled={!getSomeoneHasCard() && !showValue}>
            {showValue ? 'Reset' : 'Show'} cards
          </Button>

          <div className={styles.subtitle}>
            <Average cardValues={getCardValues(players)} showValue={showValue} />
          </div>

          <div className={styles.subtitle}>
            <Typography variant="subtitle1">Select your Card</Typography>
          </div>

          <CardSelector me={getMe()} setCard={setCard} showValue={showValue} />
        </div>
      </div>
    </>
  );
};

export default Game;
