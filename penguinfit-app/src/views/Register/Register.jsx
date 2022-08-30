
import {
  Grid,
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
import { Link, useNavigate } from 'react-router-dom';
import { getRandomAvatar } from '../../services/avatar-service';
import CustomNumberInput from '../../components/FormsComponents/CustomInput/CustomInput';
import { defaultErrors, defaultValues } from './registerForm-defaults';
import { isValidRegisterInput } from './registerForm-validations';
import { USER_EMAIL_MAX } from '../../common/constants';
import { registerFromStyles } from './registerForm-styles';

const Register = () => {
  const { appState, setState } = useContext(AppState);
  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState(defaultErrors);
  const navigate = useNavigate();
  
  const handleInputChange = (e, name, value) => {
    e?.preventDefault();
    // console.log(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    });
  };


  const handleSliderChange = () => (e, value) => {
    setFormValues({
      ...formValues,
      activityStatus: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(!isValidRegisterInput(formValues, setFormErrors, defaultErrors)){
      return;
    }
    
    console.log(formValues);
    regHandler(formValues);
  };
  

  const regHandler = (form) => {
    getUserByHandle(form.username)
      // eslint-disable-next-line consistent-return
      .then((snapshot) => {
        if (snapshot.val()) {
          setFormErrors({ ...defaultErrors, username: { msg:'Username already taken' } });
          throw new Error('Username already taken');
        }
      }).then(() => {
        registerUser(form.email, form.password)
          .then(() => {
            userUpdate(form.username);

            const userData = {
              username: form.username,
              age: +form.age,
              email: form.email,
              weight: +form.weight,
              height: +form.height,
              goalsStatus: {
                achieved:0,
                notYet:0,
              },
              phoneNumber: +form.phoneNumber,
              activityStatus: form.activityStatus,
              BMI: (Number(form.weight)/((Number(form.height)/100)**2)),
              avatarURL: getRandomAvatar(form.username)
            };
            createUserHandle(userData);

            setState({
              ...appState,
              user: userData,
            });
            navigate('/private/dashboard');
          });

      }).catch(console.error);

  };

  return (
    <>
      <Grid
        container
        spacing={20}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={registerFromStyles.main}
      >

        <Grid item xs={3}>
          <Paper sx={registerFromStyles.paper}>
            <form onSubmit={handleSubmit}>
              <Grid container alignItems="center" justifyContent="center" direction="column">
                <Grid item >

                  <h3>Register</h3>
                </Grid>
                <Grid item >
                  <CustomNumberInput 
                    type="username"
                    name="username"
                    adornment={''}
                    label="Username"
                    value={formValues.username}
                    handler={handleInputChange}
                    error={formErrors.username}
                  />
                </Grid>
                <Grid item >
                  <CustomNumberInput 
                    type="password"
                    name="password"
                    label="Password"
                    adornment={''}
                    value={formValues.password}
                    handler={handleInputChange}
                    error={formErrors.password}
                  />
                </Grid>
                <Grid item >
                  <CustomNumberInput 
                    type="password"
                    name="passwordCheck"
                    label="Repeat password"
                    adornment={''}
                    value={formValues.passwordCheck}
                    handler={handleInputChange}
                    error={formErrors.passwordCheck}
                  />
                </Grid>
                <Grid item >
                  <CustomNumberInput 
                    type="number"
                    name="age"
                    label="Age"
                    adornment={''}
                    value={formValues.age}
                    handler={handleInputChange}
                    error={formErrors.age}
                  />
                </Grid>
                <Grid item >

                  <CustomNumberInput 
                    type="text"
                    name="email"
                    label="Email"
                    adornment={''}
                    value={formValues.email}
                    handler={handleInputChange}
                    error={formErrors.email}
                    maxInputLength={USER_EMAIL_MAX}
                  />
                </Grid>
                <Grid item >

                  <CustomNumberInput 
                    type="number"
                    name="height"
                    label="Height"
                    adornment={''}
                    value={formValues.height}
                    handler={handleInputChange}
                    error={formErrors.height}
                  />
                </Grid>
                <Grid item >
                  <CustomNumberInput 
                    type="number"
                    name="weight"
                    label="Weight"
                    adornment={''}
                    value={formValues.weight}
                    handler={handleInputChange}
                    error={formErrors.weight}
                  />
                </Grid>
                <Grid item >
                  <CustomNumberInput 
                    type="number"
                    name="phoneNumber"
                    label="Phone number"
                    adornment={''}
                    value={formValues.phoneNumber}
                    handler={handleInputChange}
                    error={formErrors.phoneNumber}
                  />
                </Grid>
                
                <Grid item >
                  <div style={registerFromStyles.center}>
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
                <Button variant="contained" color="primary" type="submit" sx={{ my: 2 }}>
            Submit
                </Button>
                <Grid item sx={registerFromStyles.center}>
                  <Typography > You have an account ?
                    <Button variant='text' component={Link} to='/login'>Login</Button>
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