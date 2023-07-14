import { lightGreen, pink, _purple, indigo } from '@mui/material/colors';

export const green = lightGreen[100];
export const palePink = pink[50];
export const blue = indigo[400];
export const deepBlue = indigo[800];

export const textAreaStyle = {
  minHeight: '16rem',
  resize: 'none',
  m: '1rem',
  alignSelf: 'center', 
  borderRadius: '5px' 
};

export const wrapperContainerStyle = {
  borderRadius: 3,
  alignSelf: 'center',
  display: 'flex',
  boxSizing: 'border-box',
};

export const midiContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'none',
  textAlign: 'center',
  justifyContent: 'space-around',
  width: 'fit-content',
  alignSelf: 'center',
  boxSizing: 'border-box',
  mx: '1rem',
  py: 1
};
  
export const sideBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  // boxShadow: 1,
  borderRadius: 2,
  // bgcolor: '#6633ff10',
  py: '1rem',
  alignSelf: 'center',
  textAlign: 'center',
  minWidth: '12rem',
  justifyContent: 'space-around',
  my: '1.5rem',
  alignItems: 'center',
  boxSizing: 'border-box'
};

export const messageStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  letterSpacing: 1,
  color: pink[600],
  alignSelf: 'center'
};

export const pageTitleStyle = {
  // fontSize:36,
  // fontWeight: 700,
  // fontFamily: 'monospace',
  // letterSpacing: 7,
  // color: purple[900],
  alignSelf: 'center'  
};