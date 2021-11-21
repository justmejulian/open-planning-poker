import React from 'react';

import { Typography } from '@material-ui/core';

const getAverage = (cardValues) => {
  if (!cardValues) {
    return null;
  }

  const sum = cardValues.reduce((a, b) => a + b, 0);

  return sum ? sum / cardValues.length : 0;
};

const Average = ({ cardValues, showValue }) => {
  return (
    <Typography variant="subtitle2">
      {'Average: '}
      {showValue && getAverage(cardValues)}
    </Typography>
  );
};

export default Average;
