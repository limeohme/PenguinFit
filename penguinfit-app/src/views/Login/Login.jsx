
import {
  Grid,
  Button,
  Paper,
  Typography,
} from '@mui/material';

import { useContext } from 'react';
import AppState from '../../providers/app-state';
import React, { useState } from 'react';
import { signInUser } from '../../services/auth-service';
import { getUserByHandle } from '../../services/user-service';
import { keepUserInfo } from '../../services/local-storage-service';
import { Link, useNavigate } from 'react-router-dom';
import { defaultValues } from './loginForm-defaults';
import CustomNumberInput from '../../components/FormsComponents/CustomInput/CustomInput';
import { Stack } from '@mui/system';
import { USER_EMAIL_MAX } from '../../common/constants';
import { loginFromStyles } from './loginForm-styles';

const Login = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState(null);
  const { appState, setState } = useContext(AppState);
  const navigate = useNavigate();



  const handleInputChange = (e, name, value) => {
    e?.preventDefault();
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signInHandler(formValues);

  };

  const signInHandler = (form) => {
    signInUser(form.email, form.password)
      .then((userCredential) => {
      // Signed in
        getUserByHandle(userCredential.user.displayName)
          .then((snapshot) => {
            const userData = snapshot.val();

            setState({
              ...appState,
              user: userData,
            });
            keepUserInfo(userData, userCredential);
            navigate('/private/dashboard');
          });
      }).catch(() => setFormErrors({ msg: 'user with those credentials does not exist' }));
  };
  return (
    
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ flex:1 }}
    >

      <Grid item>
        <Paper sx={loginFromStyles.paper}>
          <form onSubmit={handleSubmit}>
            <Grid container
              alignItems="center" 
              justify="center" 
              direction="column"
            >
              <Stack spacing={1} alignItems="center" >
                
                <Typography variant="h5">Login</Typography>
                <CustomNumberInput 
                  type="text"
                  name="email"
                  adornment={''}
                  label="Email"
                  value={formValues.email}
                  handler={handleInputChange}
                  error={formErrors}
                  maxInputLength={USER_EMAIL_MAX}
                />
                <CustomNumberInput 
                  type="password"
                  name="password"
                  adornment={''}
                  label="Password"
                  value={formValues.password}
                  handler={handleInputChange}
                  error={formErrors}
                  maxInputLength={Infinity}
                />

                <Button variant="contained" color="primary" type="submit">Sign In</Button>

                <Typography variant="h8" >Not a penguin?</Typography>
                <Button component={Link} to='/register'>Sign Up</Button>
              </Stack>

            </Grid>
          </form>
        </Paper>
      </Grid>   
   
    </Grid> 
    
  );
};

export default Login;