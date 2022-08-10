import { Container, Box, Avatar, Typography, Button } from '@mui/material';

import * as style from './ProfileStyles.js';

function Profile () {
  return (
    <Container sx={style.wrapperContainerStyle}>
      <Container sx={style.midiContainerStyle}>
        <Avatar sx={style.avatarStyle} alt='baby penguin' src='https://gitlab.com/limeohme/cat-being-dragged-memes/-/raw/main/PenguinNoBack.png' />
        <Button sx={{ border: 2 , width: 'fit-content', alignSelf: 'center', my: 2 }}>Edit</Button>
        <Box sx={{ ...style.boxStyle, display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ pl: 4 }}>Baby Penguin</Typography>
          <Typography sx={{ pr: 4 }}>2 years old</Typography>
        </Box>
        <Typography sx={{ alignSelf: 'center', bgcolor: 'none', color: 'white', fontWeight: '800' }}>HYPERACTIVE</Typography>
        <Box sx={style.boxStyle}>babyPingu78@mail.com</Box>
        <Box sx={style.boxStyle}>08XXXXXXXX</Box>
        <Box sx={style.boxStyle}>80 kg</Box>
        <Box sx={style.boxStyle}>1.30 m</Box>
      </Container>
      <Container sx={{ ...style.midiContainerStyle, bgcolor: 'none', justifyContent: 'space-between' }}>
        <Box sx={{ ...style.boxStyle, mt: 3, height: 240, bgcolor: style.palePink, alignItems: 'center' }}>
          <Typography>Безцелен съм в момента</Typography>
          <Button>Some</Button>
        </Box>
        <Box sx={{ ...style.boxStyle, mb: 3, height: 240, bgcolor: style.palePink, alignItems: 'center' }}>
          <Typography>Безцелен съм в момента</Typography>
        </Box>
      </Container>
    </Container>
  );
}

export default Profile;