// import './Login.css';
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
  //   FormControlLabel,
  //   FormControl,
  //   FormLabel,
  //   RadioGroup,
  //   Radio,
  //   Select,
  //   MenuItem,
  Slider,
  Button,
  Box,
} from '@mui/material';
  
import React, { useState } from 'react';
const defaultValues = {
  username: '',
  age: 0,
  email: '',
  weight: '',
  height: 0,
  phoneNumber: 0,
  activityStatus: 0,
  BMI: 0,

};
const Register = () => {
  const [formValues, setFormValues] = useState(defaultValues);
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
                <Grid item>
                  <TextField
                    id="username-input"
                    name="username"
                    label="Username"
                    type="text"
                    value={formValues.username}
                    onChange={handleInputChange}
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
                  />
                </Grid>
                {/* username: '',
  age: 0,
  email: '',
  weight: '',
  height: 0,
  phoneNumber: 0,
  activityStatus: 0,
  BMI: 0, */}
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
                    id="height-input"
                    name="height"
                    label="Height"
                    type="number"
                    value={formValues.height}
                    onChange={handleInputChange}
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
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="BMI-input"
                    name="BMI"
                    label="BMI"
                    type="number"
                    value={formValues.phoneNumber}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item>
                  <div style={{ width: '400px' }}>
              How active are you ?
                    <Slider
                      value={formValues.favoriteNumber}
                      onChange={handleSliderChange('favoriteNumber')}
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
              </Grid>
            </form>
          </Box>
        </Grid>   
     
      </Grid> 
    </>
  );
};
  
export default Register;