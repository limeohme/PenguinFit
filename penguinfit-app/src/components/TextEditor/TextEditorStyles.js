import { lightGreen, pink, purple, indigo } from '@mui/material/colors';

export const green = lightGreen[100];
export const palePink = pink[50];
export const blue = indigo[400];
export const deepBlue = indigo[800];

export const textAreaStyle = {
  minWidth: '20rem',
  minHeight: '16rem',
  resize: 'none',
  margin: '1rem',
  alignSelf: 'center', 
  borderRadius: '5px' 
};

export const wrapperContainerStyle = {
  gap: '2rem',
  m: '1rem',
  px: '2rem',
  borderRadius: 3,
  display: 'flex'
};

export const midiContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  bgcolor: 'none',
  width: 'fit-content',
  alignSelf: 'center'
};
  
export const sideBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 1,
  borderRadius: 2,
  bgcolor: '#6633ff10',
  p: '3rem',
  alignSelf: 'center',
  textAlign: 'center',
  minWidth: '12rem',
  justifyContent: 'space-around',
  m: '1.5rem',
  alignItems: 'center'
};

export const messageStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  fontFamily: 'Monospace',
  letterSpacing: 1,
  color: pink[600],
  alignSelf: 'center'
};

export const pageTitleStyle = {
  fontSize:36,
  fontWeight: 700,
  fontFamily: 'monospace',
  letterSpacing: 7,
  color: purple[900],
  alignSelf: 'center'  
};