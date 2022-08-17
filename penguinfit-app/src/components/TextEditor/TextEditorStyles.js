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
};

export const wrapperContainerStyle = {
  gap: '2rem',
  my: '1rem',
  px: '2rem',
  borderRadius: 3,
};
  
export const userInfoContainer = {
  display: 'flex',
  flexDirection: 'row',
  bgcolor: purple[50],
  boxShadow: 2,
  borderRadius: 2,
  my: '1rem',
  py: '1rem',
};
  
export const friendsContainer = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: purple[50],
  boxShadow: 2,
  borderRadius: 2,
  my: '1rem',
  py: '1rem',
};
  
export const midiContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  bgcolor: 'none',
  width: 'fit-content'
};
  
export const infoBoxStyle = {
  display: 'flex',
  flexDirection: 'row',
  bgcolor: 'background.paper',
  boxShadow: 2,
  borderRadius: 2,
  border: 1,
  borderColor: purple[500],
  p: '1rem',
  m: '1rem',
  minWidth: '12rem',
  alignSelf: 'center',
  textAlign: 'center',
  justifyContent: 'space-around',
  alignItems: 'center',
};
  
export const sideBoxStyleGreen = {
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 1,
  borderRadius: 2,
  bgcolor: 'rgb(190, 242, 128, 0.2)',
  p: '3rem',
  alignSelf: 'center',
  textAlign: 'center',
  minWidth: '12rem',
  justifyContent: 'space-around',
  m: '1.5rem',
  alignItems: 'center'
};
  
export const sideBoxStyleBlue = {
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 1,
  borderRadius: 2,
  bgcolor: 'rgb(92, 107, 192, 0.2)',
  p: '4.5rem',
  m: '1.5rem',
  alignSelf: 'center',
  textAlign: 'center',
  minWidth: '12rem',
  justifyContent: 'space-around',
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