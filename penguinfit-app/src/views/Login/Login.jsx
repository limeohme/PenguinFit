// import { useContext, useState } from 'react';
// import AppState from '../../providers/app-state';
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
  Link,
} from '@mui/material';

import React, { useState } from 'react';
const defaultValues = {
  email: '',
  password: '',
};
const Login = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
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
                  InputAdornment
                  sx={{ margin: 1, }}
                />
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                </FormGroup>
                <Button variant="contained" color="primary" type="submit">
          Submit
                </Button>
                <Typography  sx={{ margin: 1, }}> Not a member?
                  <Link href = '/register'>
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