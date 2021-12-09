import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Card,
  Typography,
} from '@material-ui/core';

import openHack from '../imgs/open_hack_2019-03.svg';

import styles from './Form.module.css';

const Form = () => {
  const history = useHistory();

  const [name, setName] = React.useState(
    window.localStorage.getItem('name') || null,
  );

  // todo: uid for room
  const [roomName, setRoomName] = React.useState(null);

  const handleClick = () => {
    window.localStorage.setItem('name', name);
    history.push('/' + roomName);
  };

  return (
    <Card className={styles.formContainer}>
      <div className={styles.titleLogo}>
        <img
          className={styles.logo}
          src={openHack}
          alt="Open Hack Logo"
        />
        📅🃏
      </div>
      <Typography variant="subtitle1">Open Planning Poker</Typography>
      <TextField
        id="standard-basic"
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Room Name"
        value={roomName}
        onChange={(event) => setRoomName(event.target.value)}
      />
      <div className={styles.btnContainer}>
        <Button
          variant="contained"
          color="primary"
          disabled={!roomName || !name}
          onClick={handleClick}
        >
          Create Room
        </Button>
      </div>
    </Card>
  );
};

export default Form;
