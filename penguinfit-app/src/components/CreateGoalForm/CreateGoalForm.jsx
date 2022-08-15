import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { useState } from 'react';

const defaultValues = {
  title: '',
  dueDate: '',
  type: '',
  target: '',
  targetValue: 0,
};


const CreateGoalForm = () => {
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
    <Box sx={{ maxWidth: 850, flexGrow: 1, m: 2 }}>
      <form onSubmit={handleSubmit}>
        <h3>Add goal</h3>
        <Paper>
          <Grid 
            container
            spacing={1}
            direction="row"
            justifyContent="space-evenly"
            alignItems="stretch"
          >

          
            <Grid item xs={12} sm={6} >
              <TextField
                id="title-input"
                name="title"
                label="Title"
                type="text"
                value={formValues.title}
                onChange={handleInputChange}
                sx={{ margin: 1, }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="dueDate-input"
                name="dueDate"
                // label="Due date"
                type="date"
                value={formValues.age}
                onChange={handleInputChange}
                sx={{ margin: 1, }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl
                sx={{ margin: 1, }}
              >
                <FormLabel>Type</FormLabel>
                <RadioGroup
                  name="type"
                  value={formValues.type}
                  onChange={handleInputChange}
                  row
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
            <Grid item xs={12} sm={3}>

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
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
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
            <Grid item xs={12} sm={4}>
              <TextField
                id="targetValue-input"
                name="targetValue"
                label="Target value"
                type="number"
                value={formValues.targetValue}
                onChange={handleInputChange}
                sx={{ margin: 1 }}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Paper>
      </form>
    </Box>

  );
};
export default CreateGoalForm;