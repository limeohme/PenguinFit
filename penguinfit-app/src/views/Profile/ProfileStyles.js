import { lightGreen, purple, pink, indigo } from '@mui/material/colors';

export const green = lightGreen[100];
export const palePink = pink[50];
export const blue = indigo[400];
export const deepBlue = indigo[800];

export const wrapperContainerStyle = {
  display: 'flex',
  my: '2rem',
  borderRadius: 3,
  border: 4,
  borderColor: blue
};

export const userInfoContainer = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'none',
  my: '5rem',
  py: '3rem',
  px: '10rem',
};

export const midiContainerStyle = {
  alignSelf: 'flex-end',
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'none',
  my: '5rem',
  py: '2rem',
  px: '10rem',
  ml: '6rem'
};

export const infoBoxStyle = {
  display: 'flex',
  flexDirection: 'row',
  bgcolor: 'background.paper',
  boxShadow: 1,
  borderRadius: 2,
  border: 1,
  borderColor: purple[500],
  p: '1rem',
  my: '1rem',
  minWidth: '16rem',
  alignSelf: 'center',
  textAlign: 'center',
  justifyContent: 'space-around'
};

export const sideBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 1,
  borderRadius: 2,
  border: 4,
  borderColor: blue,
  p: '3rem',
  my: '2rem',
  alignSelf: 'center',
  textAlign: 'center',
  minWidth: '16rem',
  justifyContent: 'space-around',
  mt: '1.5rem',
  height: 240,
  alignItems: 'center'
};

export const editStyle = {
  p: 0,
  m: 0,
  outline: 0
};


export const avatarStyle = {
  width: 120,
  height: 120,
  alignSelf: 'center',
  p: '2rem',
  border: 3,
  borderColor: purple[800],
  bgcolor: 'white'
};

export const nameStyle = {
  fontSize: 24,
  fontWeight: 700,
  fontFamily: 'Monospace',
  letterSpacing: 4,

};

export const ageStyle = {
  fontSize: 16,
  fontWeight: 600,
  fontFamily: 'Monospace',
  letterSpacing: 4,

};

export const BMIStyle = {
  fontSize: 58,
  fontWeight: 700,
  fontFamily: 'Monospace',
  letterSpacing: 4,
  color: purple[900]  
};

export const BMINumberStyle = {
  fontSize: 58,
  fontWeight: 700,
  fontFamily: 'Monospace',
  letterSpacing: 4,
  color: blue  
};

export const BMIMsgStyle = {
  my: '0.5rem',
  fontSize: 16,
  fontWeight: 'bold',
  fontFamily: 'Monospace',
  letterSpacing: 1,
  color: purple[900]
};

export const activityStyle = {
  fontSize: 58,
  fontWeight: 900,
  fontFamily: 'Monospace',
  letterSpacing: 4,
  color: lightGreen[900]
};

export const rangeStyle = {
  my: '0.5rem',
  fontSize: 16,
  fontWeight: 'bold',
  fontFamily: 'Monospace',
  letterSpacing: 1,
  color: lightGreen[900]
};
