import React from 'react';

import { image } from '../imgs/cards/index';

import styles from './Card.module.css';

const Card = ({ cardName }) => {
  if (cardName) {
    return (
      <img className={styles.img} src={image[cardName]} alt="card image" />
    );
  }
  return <img className={styles.empty} src={image.cover} alt="card image" />;
};

export default Card;
