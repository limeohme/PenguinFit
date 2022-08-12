import { Container, Box, Avatar, Typography, Button, TextField, Slider } from '@mui/material';
import { useContext, useRef } from 'react';
// import { useEffect } from 'react';
import { useState } from 'react';
import AppState from '../../providers/app-state.js';
import { calculateBMIMessage } from '../../utils/utils.js';
import { activityStatus } from '../../common/activity-status.js';
import { getRandomAvatar } from '../../services/avatar-service.js';

import * as style from './ProfileStyles.js';
import { changeEmail, changePassword } from '../../services/auth-service.js';
import { updateUserProfilePicture, updateUserInfoDB } from '../../services/user-service.js';
import { getLoggedUser, getLoggedUserAuth, updateUserInfo } from '../../services/local-storage-service.js';
import { useEffect } from 'react';
import { validateProfileUpdates } from '../../utils/validations.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase-config.js';

function Profile () {
  const { appState, setState } = useContext(AppState);
  const [message, setMessage] = useState('');
  const [edit, setEdit] = useState(false);
  const [upload, setUpload] = useState(false);
  const fileInput = useRef();
  // const [BMI, setBMI] = useState(0);
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
        changePassword(newForm.password).catch(() =>
          setMessage('Requires recent login to change password !'),
        );
      }
      if (newForm.email) {
        changeEmail(newForm.email).catch(() =>
          setMessage('Requires recent login to change email !'),
        );
      }
      
      updateUserInfoDB(appState.user.username, newForm);
      setMessage('Details changed successfully\nRefresh to see your changes 😊');
      
      setTimeout(() => {setMessage('');}, 4000);
    } catch (err) {
      setMessage(err.message);
    }
  }
  // const handleFileUploadError = () => {
  //   // Do something...
  // };
  
  const handleFilesChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setMessage('Please select an image.');
      return;
    }
    uploadBytes(ref(storage, `images/${appState.user.username}/avatar`), file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref)
          .then((url) => {
            updateUserProfilePicture(appState.user.username, url).then(() => {
              updateUserInfo({ ...appState.user, avatarURL: url });
              setMessage('Yay, success!\nPlease refresh to see your changes.');
            });
          }
          ).catch(console.error);
      }).catch(console.error);
  };
  
  useEffect(() => {
    const updatedState = {
      user: getLoggedUser(),
      userAuthData: getLoggedUserAuth() || null,
    };
    setState(updatedState);
  }, []);
  
  
  return (
    <Container sx={style.wrapperContainerStyle}>
      <Container sx={style.userInfoContainer}>
        <Avatar sx={style.avatarStyle} alt={appState.user.username} src={appState.user.avatarURL || getRandomAvatar(appState.user.username)} />
        {!edit ? 
          <Button onClick={() => setEdit(!edit)}>EDIT</Button>:
          <Box sx={style.buttonBoxStyle}>
            <Button onClick={() => editDetailsHandler(form)}>DONE</Button>
            <Button onClick={() => {setMessage(''); setEdit(!edit); setUpload(false);}}>CANCEL</Button>
            <Button onClick={() => {setUpload(true);}}>{'UPLOAD\nAVATAR'}</Button>
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
        <Box sx={{ ...style.infoBoxStyle }}>
          <Typography sx={{ ...style.nameStyle }}>{appState.user.username}</Typography>
        </Box>
        <Box sx={{ ...style.infoBoxStyle }}>
          {!edit ? <Typography >{`${appState.user.age} yrs`}</Typography>:
            <TextField variant="standard" placeholder={appState.user.age + ' years'} type='text'  
              onChange={(e) => setForm({ ...form, age: e.target.value })}/>}
        </Box>
        <Box sx={style.infoBoxStyle}>{
          !edit ? appState.user.email : 
            <TextField variant="standard" placeholder={appState.user.email} type='text' 
              onChange={(e) => setForm({ ...form, email: e.target.value })}/>
        }</Box>
        <Box sx={style.infoBoxStyle}>{
          !edit ? appState.user.phoneNumber : 
            <TextField variant="standard" placeholder={appState.user.phoneNumber} type='text'  
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}/>
        }</Box>
        <Box sx={style.infoBoxStyle}>{
          !edit ? appState.user.height + ' cm' : 
            <TextField variant="standard" placeholder={appState.user.height + ' cm'} type='text'  
              onChange={(e) => setForm({ ...form, height: e.target.value })}/>
        }</Box>
        <Box sx={style.infoBoxStyle}>{
          !edit ? appState.user.weight + ' kg' : 
            <TextField variant="standard" placeholder={appState.user.weight + ' kg'} type='text' 
              onChange={(e) => setForm({ ...form, weight: e.target.value })}/>
        }</Box>
        { edit === true ?
          <>
            <Box sx={style.infoBoxStyle}>{
              !edit ? appState.user.height : 
                <TextField variant="standard" placeholder='New password' value={form.password} type='password' 
                  onChange={(e) => setForm({ ...form, password: e.target.value })}/>
            }</Box>
            <Box sx={style.infoBoxStyle}>{
              !edit ? appState.user.weight : 
                <TextField variant="standard" placeholder='Confirm password' value={form.confirmPassword} type='password' 
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}/>
            }</Box>
          </>: ''
        }
        
      </Container>
      <Container sx={{ ...style.midiContainerStyle, bgcolor: 'none', justifyContent: 'space-between' }}>
        <Box sx={ style.sideBoxStyleGreen }>
          <Typography sx={ style.BMIStyle}>BMI </Typography>
          <Typography sx={ style.BMINumberStyle}>{appState.user.BMI || Number((Number(appState.user.weight)/(Number(appState.user.height)**2)).toFixed(0))}</Typography>
          <Typography sx={style.BMIMsgStyle}>{calculateBMIMessage(+appState.user.BMI || (Number(appState.user.weight)/(Number(appState.user.height)**2)))}</Typography>
          <Typography sx={style.rangeStyle}>Healthy Range:</Typography>
          <Slider sx={style.sliderStyle} disabled={true} marks={BMIMarks} step={0.5} valueLabelDisplay="auto" defaultValue={[18.5, 25]} min={13.5} max={30} />
        </Box>
        <Box sx={style.sideBoxStyleBlue}>
          <Typography sx={ style.activityStyle}>{activityStatus[appState.user.activityStatus]}</Typography>
        </Box>
      </Container>
    </Container>
  );
}

export default Profile;