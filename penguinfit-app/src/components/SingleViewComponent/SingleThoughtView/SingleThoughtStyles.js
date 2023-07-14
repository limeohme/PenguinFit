import { lightGreen, pink, _purple, indigo } from '@mui/material/colors';

export const green = lightGreen[100];
export const palePink = pink[50];
export const blue = indigo[400];
export const deepBlue = indigo[800];

export const textAreaStyle = {
  minWidth: '100%',
  minHeight: '16rem',
  resize: 'none',
  margin: '1rem',
  alignSelf: 'center',
  boxShadow: 1,
  borderRadius: 2,
  bgcolor: 'white',
  textAlign: 'center',
  
};
  
export const boxStyleWhite = {
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 0,
  borderRadius: 2,
  bgcolor: 'transparent',
  // bgcolor: 'rgb(255, 255, 255, 0.2)',
  alignSelf: 'center',
  textAlign: 'center',
  justifyContent: 'space-around',
  alignItems: 'center',
  boxSizing: 'border-box',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
};
  
export const buttonBoxStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignSelf: 'center'
};
  
export const messageStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  fontFamily: 'Monospace',
  letterSpacing: 1,
  color: pink[600],
  alignSelf: 'center'
};

export const bodyStyle = {
  fontSize: 16,
  fontFamily: 'Monospace',
  letterSpacing: 1,
  alignSelf: 'center',
  my: '1rem',
  boxSizing: 'border-box'
};
export const titleStyle = {
  // fontSize: 32,
  // fontWeight: 700,
  // fontFamily: 'Monospace',
  // letterSpacing: 3,
  // color: purple[900] ,
  p: '1rem',
  m: '1rem',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  maxWidth: '100%'
};