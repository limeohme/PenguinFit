import { lightGreen, purple, pink } from '@mui/material/colors';

export const green = lightGreen[300];
export const palePink = pink[50];

export const wrapperContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  px: 50,
  py: 5,
};

export const midiContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: green,
  my: 10,
  py: 2,
  px: 20,
  width: 'fit-content',
  borderRadius: 3
};

export const boxStyle = {
  display: 'flex',
  flexDirection: 'row',
  bgcolor: 'background.paper',
  boxShadow: 1,
  borderRadius: 2,
  p: 2,
  my: 2,
  minWidth: 300,
  maxWidth: 700,
  alignSelf: 'center',
  textAlign: 'center',
  justifyContent: 'space-around'
};


export const avatarStyle = {
  width: 120,
  height: 120,
  alignSelf: 'center',
  p: 4,
  border: 1,
  borderColor: purple,
  bgcolor: 'white'
};