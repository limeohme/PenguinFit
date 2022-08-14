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
import { Link, useNavigate } from 'react-router-dom';
const defaultValues = {
  email: '',
  password: '',
  rememberMe: true,
};
const Login = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const { appState, setState } = useContext(AppState);
  const navigate = useNavigate();


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
            navigate('/private/dashboard');
          })
          .catch(console.error);
      });
  };
  return (
    
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ flex:1 }}
      // style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3} >
        <Paper   sx={{ padding: 3, margin: 3, }}>
          <form onSubmit={handleSubmit}>
            <Grid container alignItems="center" justify="center" direction="column">
              <Typography variant="h5">Login</Typography>
              
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
              <Button variant="contained" color="primary" type="submit">Sign In</Button>

              <Typography variant="h6" sx={{ margin: 1.5 }}>Not a penguin?</Typography>
              <Button component={Link} to='/register' variant="contained">Sign Up</Button>

            </Grid>
          </form>
        </Paper>
      </Grid>   
   
    </Grid> 
    
  );
};

export default Login;