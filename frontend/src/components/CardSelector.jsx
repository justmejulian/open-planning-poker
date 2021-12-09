import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import classnames from 'classnames';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Card from './Card';

import { cards } from '../imgs/cards';

import styles from './CardSelector.module.css';

const CardSelector = ({ me, setCard, showValue }) => {
  const matches = useMediaQuery('(min-width:600px)');

  const handleSelected = (cardName) => {
    console.log(cardName);
    setCard(cardName);
  };

  if (matches) {
    return (
      <div
        className={classnames(styles.btnContainer, {
          [styles.btnsDisabled]: showValue
        })}>
        {cards.map((cardName) => (
          <div
            key={cardName}
            className={classnames(styles.card, {
              [styles.selectedCard]: me?.card === cardName
            })}
            onClick={() => handleSelected(cardName)}>
            <Card cardName={cardName} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      disabled={showValue}
      value={me?.card || ''}
      label="Card"
      onChange={(event) => handleSelected(event.target.value)}>
      {cards.map((cardName) => (
        <MenuItem value={cardName} key={cardName}>
          <div className={styles.mobileMenuItem}>
            <div className={styles.mobileCard}>
              <Card cardName={cardName} />
            </div>
            {cardName}
          </div>
        </MenuItem>
      ))}
    </Select>
  );
};

export default CardSelector;
