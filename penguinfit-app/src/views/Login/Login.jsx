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
  Box,
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

        <Grid item xs={3}>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container alignItems="center" justify="center" direction="column">
                <h3>Login</h3>
                <Grid item>
                  <TextField
                    id="email-input"
                    name="email"
                    label="Email"
                    type="text"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="password-input"
                    name="password"
                    label="Password"
                    type="password"
                    value={formValues.password}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                  </FormGroup>
                </Grid>
                <Button variant="contained" color="primary" type="submit">
          Submit
                </Button>
              </Grid>
              <Grid item>
                <p>Not a member? Sign up</p>
              </Grid>
            </form>
          </Box>
        </Grid>   
   
      </Grid> 
    </>
  );
};

export default Login;