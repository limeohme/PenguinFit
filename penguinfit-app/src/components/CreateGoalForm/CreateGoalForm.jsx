import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { createGoal } from '../../services/goals-service';
import { activitiesMET } from '../../common/activitiesMET';


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

const CreateGoalForm = ({ username }) => {
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
                    key="general"
                    value="general"
                    control={<Radio size="small" />}
                    label="General"
                  />
                  <FormControlLabel
                    key="byExercise"
                    value="byExercise"
                    control={<Radio size="small" />}
                    label="By exercise"
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
                  {formValues.type === 'general' && 
                   <MenuItem key="caloriesBurned" value="caloriesBurned">
                     <em>Calories burned</em>
                   </MenuItem>
                  }
                  {formValues.type === 'general' && 
                   <MenuItem key="duration" value="duration">
                     <em>Duration</em>
                   </MenuItem>
                  }
                  {formValues.type === 'byExercise' && 
                   Object.keys(activitiesMET).sort().map((el) => {
                     return(
                       <MenuItem key={el} value={el}>
                         <em>{el}</em>
                       </MenuItem>
                     );
                   })
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