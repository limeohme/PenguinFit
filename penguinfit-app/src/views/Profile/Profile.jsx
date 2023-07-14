import { Box, Avatar, Typography, Button, TextField, Slider, Grid, Paper } from '@mui/material';
import { useContext, useRef } from 'react';
// import { useEffect } from 'react';
import { useState } from 'react';
import AppState from '../../providers/app-state.js';
import { calculateBMIMessage } from '../../utils/utils.js';
// import { activityStatus } from '../../common/activity-status.js';
import { getRandomAvatar } from '../../services/avatar-service.js';

import * as style from './ProfileStyles.js';
import { changeEmail, changePassword } from '../../services/auth-service.js';
import { updateUserProfilePicture, updateUserInfoDB } from '../../services/user-service.js';
import { updateUserInfo } from '../../services/local-storage-service.js';
import { validateProfileUpdates } from '../../utils/validations.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase-config.js';
import { Stack } from '@mui/system';
import RenderFriendsManagement from '../../components/RenderFriendsManagement/RenderFriendsManagement.jsx';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { userActivityStatus } from '../../common/user-activity-status.js';


function Profile () {
  const { appState } = useContext(AppState);
  const [message, setMessage] = useState('');
  const [edit, setEdit] = useState(false);
  const [upload, setUpload] = useState(false);
  const fileInput = useRef();
  const [user, setUser] = useState(appState.user);
  const [form, setForm] = useState({
    age: '',
    height: '',
    weight: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const BMIMarks = [
    { value: 18.5, label:'18.5' },
    { value: 25, label:'25' },
  ];
  
  function editDetailsHandler(newForm) {
    try {
      validateProfileUpdates(newForm);
      setEdit(!edit);
      if (newForm.password) {
        changePassword(newForm.password)
          .then(() => setMessage('Password changed successfully!'))
          .catch(() =>
            setMessage('Requires recent login to change password !'),
          );
      }
      if (newForm.email) {
        changeEmail(newForm.email)
          .then(() => setMessage('Email changed successfully!'))
          .catch(() =>
            setMessage('Requires recent login to change email !'),
          );
      }
      
      updateUserInfoDB(user.username, newForm);
      updateLocalUser(newForm);
      setMessage('Details changed successfully! 😊');
      setTimeout(() => {setMessage('');}, 4000);
    } catch (err) {
      setMessage(err.message);
    }
  }
 
  const handleFilesChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setMessage('Please select an image.');
      return;
    }
    setUpload(false);
    uploadBytes(ref(storage, `images/${user.username}/avatar`), file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref)
          .then((url) => {
            updateUserProfilePicture(user.username, url).then(() => {
              updateUserInfo({ ...user, avatarURL: url });
              setUser({ ...user, avatarURL: url });
              setMessage('Yay, success!');
              
            });
          }
          ).catch(console.error);
      }).catch(console.error);
  };

  const updateLocalUser = (newForm) => {
    setUser({
      ...user,
      age: newForm.age || user.age,
      height: newForm.height || user.height,
      weight: newForm.weight || user.weight,
      email: newForm.email || user.email,
      phoneNumber: newForm.phoneNumber || user.phoneNumber,
    });
  };

  const calculateBMI = () => {
    return (Number(user.weight)/((Number(user.height)/100)**2));
  };
  
  
  return (
    <Grid container spacing={2} direction="row" sx={{ mt: 5 }}>
      <Grid item container xs md>
        <Grid container direction="row">
          <Grid item xs md sx={{ ...style.midiContainerStyle, bgcolor: 'none', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar sx={style.avatarStyle} alt={user.username} src={user.avatarURL || getRandomAvatar(user.username)} />
            {!edit ? 
              <SettingsRoundedIcon onClick={() => setEdit(true)} sx={{ alignSelf: 'center', ml: 10, mt: 0 }}/>:
              <Box sx={style.buttonBoxStyle}>
                <Button onClick={() => {editDetailsHandler(form); setUpload(false);}}><DoneOutlineRoundedIcon/></Button>
                <Button onClick={() => {setMessage(''); setEdit(!edit); setUpload(false);}}><CancelIcon/></Button>
                <Button onClick={() => {setUpload(!upload);}}><InsertPhotoIcon/></Button>
              </Box>
          
            }
            {
              upload?
                <Box sx={style.buttonBoxStyle}>
                  <Button onClick={() => fileInput.current?.click()}>CHOOSE FILE</Button>
                  <input ref={fileInput} style={{ display: 'none' }} type='file' accept="image/*" onChange={(e) => handleFilesChange(e)}></input>
                </Box> 
                : ''
            }
            <Typography sx={style.messageStyle}>{message? message : ''}</Typography>
            
            <Typography sx={{ ...style.nameStyle }}>{user.username}</Typography>
            {edit? '' :
              <>
                <Typography  sx={{ ...style.infoBoxStyle }}>{`${user.age} yrs`}</Typography>
                <Typography sx={{ ...style.infoBoxStyle }}>{`${user.email}`}</Typography>
                <Typography sx={{ ...style.infoBoxStyle }}>{`${user.phoneNumber}`}</Typography>
                <Typography sx={{ ...style.infoBoxStyle }}>{`${user.height} cm`}</Typography>
                <Typography sx={{ ...style.infoBoxStyle }}>{`${user.weight} kg`}</Typography>
              </>
            }

            { edit === true ?
              <Box sx={{ display: 'flex', flexDirection: 'column', my: '1rem' }}>
                <TextField variant="standard" placeholder={user.age + ' years'} type='text'  
                  onChange={(e) => setForm({ ...form, age: e.target.value })}/>
                <TextField variant="standard" placeholder={user.email} type='text' 
                  onChange={(e) => setForm({ ...form, email: e.target.value })}/>
                <TextField variant="standard" placeholder={user.phoneNumber} type='text'  
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}/>
                <TextField variant="standard" placeholder={user.height + ' cm'} type='text'  
                  onChange={(e) => setForm({ ...form, height: e.target.value })}/>
                <TextField variant="standard" placeholder={user.weight + ' kg'} type='text' 
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}/>
                <TextField variant="standard" placeholder='New password' value={form.password} type='password' 
                  onChange={(e) => setForm({ ...form, password: e.target.value })}/>            
                <TextField variant="standard" placeholder='Confirm password' value={form.confirmPassword} type='password' 
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}/>
            
              </Box>: ''
            }
          </Grid>
          <Grid item xs md sx={{ ...style.midiContainerStyle, bgcolor: 'none', justifyContent: 'space-between' }}>
            <Box sx={ style.sideBoxStyleGreen }>
              <Typography sx={ style.BMIStyle}>BMI </Typography>
              <Typography sx={ style.BMINumberStyle}>{calculateBMI().toFixed(1)}</Typography>
              <Typography sx={style.BMIMsgStyle}>{calculateBMIMessage(calculateBMI())}</Typography>
              <Typography sx={style.rangeStyle}>Healthy Range:</Typography>
              <Slider sx={style.sliderStyle} disabled={true} marks={BMIMarks} step={0.5} valueLabelDisplay="auto" defaultValue={[18.5, 25]} min={13.5} max={30} />
            </Box>
            <Box sx={style.sideBoxStyleBlue}>
              <Typography sx={ style.activityStyle}>{userActivityStatus[user.activityStatus]}</Typography>
            </Box>
          </Grid>
        
        </Grid>
      </Grid>
      <Grid item xs md>
        <Box sx={{ flexGrow: 1, m: 2, p:2 }}>
          <Paper sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}>
              <Typography align="center" variant='h5'>Friends</Typography>
              <RenderFriendsManagement username={ user.username }></RenderFriendsManagement>
            </Stack>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Profile;