import React from 'react';

import styles from './Settings.module.css';

import {
  Modal,
  IconButton,
  TextField,
  Button,
} from '@material-ui/core/';
import SettingsIcon from '@material-ui/icons/Settings';

const Settings = ({ setName, name }) => {
  const [open, setOpen] = React.useState(!name);
  const [localName, setLocalName] = React.useState(name);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (localName) {
      setOpen(false);
    }
  };

  const handleSave = () => {
    setOpen(false);
    setName(localName);
    window.localStorage.setItem('name', localName);
  };

  return (
    <div>
      <IconButton
        aria-label="upload picture"
        component="span"
        onClick={handleOpen}
      >
        <SettingsIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <div className={styles.modal}>
          <h2 id="transition-modal-title">Settings</h2>
          <TextField
            id="standard-basic"
            label="Name"
            onChange={(event) => setLocalName(event.target.value)}
            value={localName}
          />
          <div className={styles.btnContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!localName}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
