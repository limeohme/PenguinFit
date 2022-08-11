import { useContext } from 'react';
import AppState from '../../providers/app-state';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { signInUser } from '../../services/auth-service';
// import { getUserByHandle } from '../../services/users-service';
// import Error from '../../components/Error/Error';
// import { keepUserInfo } from '../../services/local-storage-service';

import {
  Grid,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Typography,
} from '@mui/material';

import React, { useState } from 'react';
import { signInUser } from '../../services/auth-service';
import { getUserByHandle } from '../../services/user-service';
import { keepUserInfo } from '../../services/local-storage-service';
import { Link } from 'react-router-dom';
// import { Navigate } from 'react-router';
const defaultValues = {
  email: '',
  password: '',
  rememberMe: true,
};
const Login = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const { appState, setState } = useContext(AppState);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e, propName) => {
    const { checked } = e.target;
    setFormValues({
      ...formValues,
      [propName]: checked,
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
            if(form.rememberMe) keepUserInfo(userData, userCredential);
            // navigate(location?.state?.from ?? '/home');
          })
          .catch(console.error);
      });
  };
  return (
    <>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >

        <Grid item xs={3} >
          <Paper   sx={{ padding: 4, margin: 4, }}>
            <form onSubmit={handleSubmit}>
              <Grid container alignItems="center" justify="center" direction="column">
                <h3>Login</h3>
                <TextField
                  id="email-input"
                  name="email"
                  label="Email"
                  type="text"
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                  sx={{ margin: 1, }}
                />
                
                <TextField
                  id="password-input"
                  name="password"
                  label="Password"
                  type="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  required
                  sx={{ margin: 1, }}
                />
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" onChange={(e) => handleCheckboxChange(e,'rememberMe')}/>
                </FormGroup>
                <Button variant="contained" color="primary" type="submit">
          Submit
                </Button>
                <Typography  sx={{ margin: 1, }}> Not a member?
                  <Link to = '/register'>
                  Sign up
                  </Link>
                </Typography>
              </Grid>
            </form>
          </Paper>
        </Grid>   
   
      </Grid> 
    </>
  );
};

export default Login;