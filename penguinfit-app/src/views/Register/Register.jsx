
import {
  Grid,
  TextField,
  Slider,
  Button,
  Paper,
  Typography,
  // InputAdornment,
} from '@mui/material';
import AppState from '../../providers/app-state';
import React, { useState } from 'react';
import { useContext } from 'react';
import { registerUser, userUpdate } from '../../services/auth-service';
import { createUserHandle, getUserByHandle } from '../../services/user-service';
import { validateRegistration } from '../../utils/validations';
import { Link } from 'react-router-dom';
// import { keepUserInfo } from '../../services/local-storage-service';

const defaultValues = {
  username: '',
  password: '',
  passwordCheck: '',
  age: '',
  email: '',
  weight: '',
  height: '',
  phoneNumber: '',
  activityStatus: 1,
  BMI: '',

};
const Register = () => {
  const { appState, setState } = useContext(AppState);
  const [formValues, setFormValues] = useState(defaultValues);
  const [errors, setErrors] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(null);
    try {
      validateRegistration(formValues, errorSetter);
      regHandler(formValues);
    } catch (err) {
      // errorSetter(err.message);
      console.log(errors);
    }
  };
  
  function errorSetter(prop, value) {
    setErrors({
      ...errors,
      [prop]: value,
    });
  }

  const regHandler = (form) => {
    getUserByHandle(form.username)
      // eslint-disable-next-line consistent-return
      .then((snapshot) => {
        if (snapshot.exists()) {
          return errorSetter(
            'username',
            `User with username ${form.username} already exists!`,
          );
        }
      }).then(() => {
        registerUser(form.email, form.password)
          .then(() => {
            userUpdate(form.username);

            const userData = {
              username: form.username,
              age: form.age,
              email: form.email,
              weight: form.weight,
              height: form.height,
              phoneNumber: form.phoneNumber,
              activityStatus: form.activityStatus,
              BMI: (Number(form.weight)/(Number(form.height/100)**2)),
            };
            createUserHandle(userData);

            setState({
              ...appState,
              user: userData,
            });
          });

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
  
        <Grid item xs={3}>
          <Paper sx={{ padding: 4, margin: 4, }}>
            <form onSubmit={handleSubmit}>
              <Grid container alignItems="center" justify="center" direction="column">
                <Grid item>
                  <h3>Register</h3>
                </Grid>
                <Grid item>
                  <TextField
                    id="username-input"
                    name="username"
                    label="Username"
                    type="text"
                    value={formValues.username}
                    onChange={handleInputChange}
                    sx={{ margin: 1, }}
                    required
                    error={!!errors?.username}
                    helperText={errors?.username}
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
                    required
                    sx={{ margin: 1, }}
                    error={!!errors?.password}
                    helperText={errors?.password}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="passwordCheck-input"
                    name="passwordCheck"
                    label="Repeat password"
                    type="password"
                    value={formValues.passwordCheck}
                    onChange={handleInputChange}
                    sx={{ margin: 1, }}
                    required
                    error={!!errors?.password}
                    helperText={errors?.password}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="age-input"
                    name="age"
                    label="Age"
                    type="number"
                    value={formValues.age}
                    onChange={handleInputChange}
                    sx={{ margin: 1, }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="email-input"
                    name="email"
                    label="Email"
                    type="text"
                    value={formValues.email}
                    onChange={handleInputChange}
                    sx={{ margin: 1, }}
                    required
                    error={!!errors?.email}
                    helperText={errors?.email}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="height-input"
                    name="height"
                    label="Height"
                    type="number"
                    value={formValues.height}
                    onChange={handleInputChange}
                    sx={{ margin: 1, }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="weight-input"
                    name="weight"
                    label="Weight"
                    type="number"
                    value={formValues.weight}
                    onChange={handleInputChange}
                    sx={{ margin: 1, }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="phoneNumber-input"
                    name="phoneNumber"
                    label="Phone number"
                    type="number"
                    value={formValues.phoneNumber}
                    onChange={handleInputChange}
                    sx={{ margin: 1, }}
                  />
                </Grid>
                
                <Grid item>
                  <div style={{ width: '400px' }}>
              How active are you ?
                    <Slider
                      value={formValues.activityStatus}
                      onChange={handleSliderChange('activityStatus')}
                      sx={{ margin: 2, }}
                      defaultValue={1}
                      step={1}
                      min={1}
                      max={3}
                      marks={[
                        {
                          value: 1,
                          label: '1',
                        },
                        {
                          value: 2,
                          label: '2',
                        },
                        {
                          value: 3,
                          label: '3',
                        },
                      ]}
                      valueLabelDisplay="off"
                    />
                  </div>
                </Grid>
                <Button variant="contained" color="primary" type="submit">
            Submit
                </Button>
                <Grid item>
                  <Typography  sx={{ margin: 1, }}> You have an account ?
                    <Link to = '/login'>
                  Login
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>   
     
      </Grid> 
    </>
  );
};
  
export default Register;