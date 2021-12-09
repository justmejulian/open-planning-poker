import React from 'react';

import { useHistory } from 'react-router-dom';

import styles from './HeaderLogo.module.css';

import openHack from '../imgs/open_hack_2019-03.svg';

const HeaderLogo = () => {
  const history = useHistory();

  return (
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
  );
};

export default HeaderLogo;
