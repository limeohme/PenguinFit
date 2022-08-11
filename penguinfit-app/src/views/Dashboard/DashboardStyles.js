import { lightGreen, purple, pink, indigo } from '@mui/material/colors';

export const green = lightGreen[100];
export const palePink = pink[50];
export const blue = indigo[400];
export const deepBlue = indigo[800];
export const somePurple = purple[500];

export const containerStyle = {
  display: 'grid',
  gridTemplateRows: 'auto',
  gridTemplateColumns: '50% 50%',
  gap: '1rem',
  justifyContent: 'space-between',
  p: '1rem'
};

export const midiContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0rem',
  justifyContent: 'space-around',
  flexFlow: 'wrap',
  p: '1rem',
  my: '2rem'
};

export const cardsContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '0rem',
  justifyContent: 'space-around',
  p: '1rem',
  my: '2rem'
};

export const piessContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '0rem',
  justifyContent: 'space-between',
  p: '1rem',
};

export const cardsStyle = {
  p: '1rem',
  mx: '1rem',
  bgcolor: green,
  alignSelf: 'center'
};

export const pieChartStyle = {
  my: '1rem',
  display: 'flex',
  flexDirection: 'column',
  height: 'fit-content',
  width: 'fit-content',
  justifyContent: 'space-around',
  flexFlow: 'wrap'
};

export const barChartStyle = {
  my: '1rem',
  px: '1rem'
};

export const salutationStyle = {
  color: lightGreen[900],
  fontWeight: 900,
  fontFamily: 'Monospace',
  letterSpacing: 4

};

export const dateStyle = {
  fontWeight: 900,
  fontFamily: 'Monospace',
  letterSpacing: 4,
  color: blue
};

export const chartNamesStyle = {
  fontWeight: 700,
  fontFamily: 'Monospace',
  letterSpacing: 1,
  color: blue
};