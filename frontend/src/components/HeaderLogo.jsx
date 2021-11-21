import React from 'react';

import styles from './HeaderLogo.module.css';

import openHack from '../imgs/open_hack_2019-03.svg';

const HeaderLogo = () => {
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
