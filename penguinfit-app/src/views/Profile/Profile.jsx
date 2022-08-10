import { Container, Box, Avatar, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';

import * as style from './ProfileStyles.js';

function Profile () {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    username: '',
    age: '',
    height: '',
    weight: '',
    email: '',
    phoneNumber: '',
  });

  const user = {
    username: 'BabyPenguin78',
    age: '2',
    height: '1.30',
    weight: '80',
    email: 'babyPingu78@mail.com',
    phoneNumber: '08XXXXXXXX',
    BMI: '',
    status: 'HYPERACTIVE',
    avatarURL: 'https://gitlab.com/limeohme/cat-being-dragged-memes/-/raw/main/PenguinNoBack.png'
  };

  return (
    <Container sx={style.wrapperContainerStyle}>
      <Container sx={style.userInfoContainer}>
        <Avatar sx={style.avatarStyle} alt={user.username} src={user.avatarURL} />
        <Button sx={{ border: 2 , width: 'fit-content', alignSelf: 'center', my: 2 }} onClick={() => setEdit(!edit)}>{edit? 'Done':'Edit'}</Button>
        <Box sx={{ ...style.infoBoxStyle }}>
          {!edit ? <Typography sx={{ ...style.nameStyle }}>{user.username}</Typography>:
            <TextField variant="standard" defaultValue={user.username} type='text' onChange={(e) => setForm({ ...form, username: e.target.value })}/>}
        </Box>
        <Box sx={{ ...style.infoBoxStyle }}>
          {!edit ? <Typography >{`${user.age} yrs`}</Typography>:
            <TextField variant="standard" defaultValue={user.age} type='text' onChange={(e) => setForm({ ...form, username: e.target.value })}/>}
        </Box>
        <Box sx={style.infoBoxStyle}>{
          !edit ? user.email : 
            <TextField variant="standard" defaultValue={user.email} type='text' onChange={(e) => setForm({ ...form, username: e.target.value })}/>
        }</Box>
        <Box sx={style.infoBoxStyle}>{
          !edit ? user.phoneNumber : 
            <TextField variant="standard" defaultValue={user.phoneNumber} type='text' onChange={(e) => setForm({ ...form, username: e.target.value })}/>
        }</Box>
        <Box sx={style.infoBoxStyle}>{
          !edit ? user.height : 
            <TextField variant="standard" defaultValue={user.height} type='text' onChange={(e) => setForm({ ...form, username: e.target.value })}/>
        }</Box>
        <Box sx={style.infoBoxStyle}>{
          !edit ? user.weight : 
            <TextField variant="standard" defaultValue={user.weight} type='text' onChange={(e) => setForm({ ...form, username: e.target.value })}/>
        }</Box>
        
      </Container>
      <Container sx={{ ...style.midiContainerStyle, bgcolor: 'none', justifyContent: 'space-between' }}>
        <Box sx={ style.sideBoxStyle }>
          <Typography sx={ style.BMIStyle}>BMI </Typography>
          <Typography sx={ style.activityStyle}>: </Typography>
          <Typography sx={ style.BMIStyle}>{user.BMI || (Number(user.weight)/(Number(user.height)**2)).toFixed(2)}</Typography>
        </Box>
        <Box sx={style.sideBoxStyle}>
          <Typography sx={ style.activityStyle}>{user.status}</Typography>
        </Box>
      </Container>
    </Container>
  );
}

export default Profile;