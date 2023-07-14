import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { formatDateToString } from '../../utils/utils.js';

const style = {
  fontWeight: 700,
  letterSpacing: 3,
  px: '32px',
  boxSizing: 'border-box'
};

export default function Clock() {
  const [date, setDate] = useState();

  useEffect(() => {
    setInterval(() => {
      const newDate = new Date();
      setDate(newDate);
    }, 1000);
  }, []);

  return (
    <Typography sx={style.dateStyle} variant='h5'>{date? formatDateToString(date): ''}</Typography>
  );
}