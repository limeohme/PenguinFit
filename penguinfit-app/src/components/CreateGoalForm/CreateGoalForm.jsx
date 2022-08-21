import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { createGoal } from '../../services/goals-service';

const defaultValues = {
  title: '',
  status: 'Not there yet', 
  dueDate: null,
  createdOn: new Date(),
  type: '',
  target: '',
  targetValue: '',
  currentValue: 0,
};

// const getDate = () => {
//   return (new Date().toISOString().split('T')[0]);
// };

const CreateGoalForm = ({ username }) => {
  const [formValues, setFormValues] = useState(defaultValues);

  // const handleCheckBoxChange = () => {
  //   setFormValues({
  //     ...formValues,
  //     dueDate: !formValues.dueDate,
  //   });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    createGoal(username, formValues);
  };

  const styles = {
    inputs:{
      minWidth: '100%',
    },
    form:{
      gap:'16px',
      p: 2,
      boxSizing: 'border-box'
    }
  
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid 
          container 
          direction="column" 
          justifyContent="space-between" 
          alignItems="center" 
          alignSelf="left" 
          gap={2}
          sx={styles.form} 
        >

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title-input"
                name="title"
                label="Title"
                type="text"
                value={formValues.title}
                onChange={handleInputChange}
                fullWidth
                variant="standard" 
                size="small" 
              />
            </Grid>
            {/* <Grid item xs={4}>
              <FormGroup>
                <FormControlLabel 
                  control={
                    <Checkbox 
                      defaultChecked
                      onChange={() => handleCheckBoxChange()} 
                    />} 
                  label="Due date" 
                  size="small"
                />
                <TextField
                  disabled={!formValues.dueDate}
                  id="dueDate-input"
                  name="dueDate"
                  type="date"
                  // defaultValue={getDate()}
                  inputProps={{
                    min: getDate(),
                  }}
                  value={formValues.age}
                  onChange={handleInputChange}
                  fullWidth
                  variant="standard" 
                  size="small"
                />
              </FormGroup>
            </Grid> */}
          </Grid>

          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={8}>

              <FormControl
              // sx={{ margin: 2 }}
              >
                <RadioGroup
                  name="type"
                  value={formValues.type}
                  onChange={handleInputChange}
                  row
                  sx={{ justifyContent: 'space-between', alignSelf:'centre' }}
                >
                  <FormControlLabel
                    key="cardio"
                    value="cardio"
                    control={<Radio size="small" />}
                    label="Cardio"
                  />
                  <FormControlLabel
                    key="strength"
                    value="strength"
                    control={<Radio size="small" />}
                    label="Strength"
                  />
                  <FormControlLabel
                    key="other"
                    value="other"
                    control={<Radio size="small" />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl 
                disabled={!formValues.type}
                sx={{ m: 1, minWidth: 120 }}
              >
                <InputLabel id="target">Target</InputLabel>
                <Select
                  name="target"
                  label='Target'
                  id='target'
                  value={formValues.target}
                  onChange={handleInputChange}
                  fullWidth
                  variant="standard" 
                  size="small" 
                >
                  <MenuItem key="target" value="caloriesBurned">
                  Calories burned
                  </MenuItem>
                  <MenuItem key="duration" value="duration">
                    <em>Duration</em>
                  </MenuItem>
          
                  {formValues.type === 'cardio' && 
                   <MenuItem key="distance" value="distance">
                     <em>Distance</em>
                   </MenuItem>
                  }
                  
                  {formValues.type === 'cardio' &&
                   <MenuItem key="steps" value="steps">
                     <em>Steps</em>
                   </MenuItem>
                  }

                  {formValues.type === 'strength' &&
                   <MenuItem key="weight" value="weight">
                     <em>Weight</em>
                   </MenuItem>
                  }
                  {formValues.type === 'strength' &&
                   <MenuItem key="reps" value="reps">
                     <em>Reps</em>
                   </MenuItem>
                  }
                  {formValues.type === 'strength' &&
                   <MenuItem key="sets" value="sets">
                     <em>Sets</em>
                   </MenuItem>
                  }
                 
                
                </Select>
              </FormControl>
            </Grid>
        
          </Grid>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={8}>
              <TextField
                id="targetValue-input"
                name="targetValue"
                label="Target value"
                type="number"
                value={formValues.targetValue}
                onChange={handleInputChange}
                sx={{ margin: 1 }}
                fullWidth
                variant="standard" 
                size="small" 
              />
            </Grid>
            <Grid item xs={4} sx={{ display:'flex', alignItems: 'right', justifyContent: 'right' }}>
              <Button variant="contained" color="primary" type="submit" sx={styles.btn}>
            Add goal
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default CreateGoalForm;