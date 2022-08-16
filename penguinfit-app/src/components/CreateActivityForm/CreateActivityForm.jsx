import { Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { useState } from 'react';

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

const CreateActivityForm = () => {
  // filter falsy when used:
  const defaultValues = {
    title: '',
    duration: 0,
    type: '',
    

    distance: 0,
    weight: 0,
    sets: 0,
    reps: 0,
    buddy: ''
  };

  const activityTypes = {
    cardio: ['distance'],
    strength: ['weight', 'sets', 'reps'],
    other: null
  };

  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  const renderTypeDetails = (types, defaults, changeHandler) => {

    return (
      types[defaults.type]?.length
        ? types[defaults.type].map((t)=>{
          return (
            <Grid item xs={4} key={t}>
              <TextField 
                id={`${t}-input`} 
                name={t} label={t} 
                type="number" 
                value={defaults[t]} 
                onChange={changeHandler}
                variant="standard" 
                size="small"
              />
            </Grid>
          );
        })

        :null
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" justifyContent="space-between" alignItems="center" alignSelf="left" sx={styles.form} >
        
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField 
              id="title-input" 
              name="title" 
              label="Title" 
              type="text" 
              value={formValues.title} 
              onChange={handleInputChange} 
              fullWidth 
              variant="standard" 
              size="small"/>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="duration-input"
              name="duration"
              label="Duration"
              type="number"
              value={formValues.duration}
              onChange={handleInputChange}
              fullWidth
              variant="standard" 
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
            
          <Grid item xs={12}>
            <FormControl>
              {/* <FormLabel>Type</FormLabel> */}
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
            
        </Grid>

        <Grid container spacing={2}>
          {renderTypeDetails(activityTypes, formValues, handleInputChange)}
          {/* <Grid item xs={4}>
              <TextField id="title-input" name="title" label="Title" type="text" value={formValues.title} onChange={handleInputChange} sx={styles.inputs}/>
            </Grid>
            <Grid item xs={4}>
              <TextField id="title-input" name="title" label="Title" type="text" value={formValues.title} onChange={handleInputChange} sx={styles.inputs}/>
            </Grid>
            <Grid item xs={4}>
              <TextField id="title-input" name="title" label="Title" type="text" value={formValues.title} onChange={handleInputChange} sx={styles.inputs}/>
            </Grid> */}
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField id="buddy-input" name="buddy" label="Activity Buddy" type="text" value={formValues.buddy} onChange={handleInputChange} fullWidth
              variant="outlined" 
              size="small"/>
          </Grid>
          <Grid item xs={4} sx={{ display:'flex', alignItems: 'right', justifyContent: 'right' }}>
            <Button variant="contained" color="primary" type="submit" sx={{ width: '100%', boxSizing: 'border-box' }}>
            ADD
            </Button>
          </Grid>
        </Grid>

      </Grid>
      
    </form>
    
  );


  return (
    
    <form onSubmit={handleSubmit}>
      {/* <h3>Add goal</h3> */}
      <Paper>
        <Grid container direction="column" justifyContent="space-between" alignItems="center" alignSelf="left">

          <Grid item xs={12}>
            <TextField id="title-input" name="title" label="Title" type="text" value={formValues.title} onChange={handleInputChange} sx={styles.inputs}/>
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={styles.inputs}>
              <FormLabel>Type</FormLabel>
              <RadioGroup name="type" value={formValues.type} onChange={handleInputChange} row>
                <FormControlLabel key="cardio" value="cardio" control={<Radio size="small" />} label="Cardio" />
                <FormControlLabel key="strength" value="strength" control={<Radio size="small" />} label="Strength" />
                <FormControlLabel key="other" value="other" control={<Radio size="small" />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={styles.inputs}>
            <FormControl disabled={!formValues.type} sx={styles.inputs}>
              <InputLabel id="target">Type</InputLabel>
              <Select name="target" label="Target" id="target" value={formValues.target} onChange={handleInputChange}>
                <MenuItem value="">
                  <em>Cardio</em>
                </MenuItem>
                <MenuItem key="target" value="caloriesBurned">
                  <em>Strength</em>
                </MenuItem>
                <MenuItem key="duration" value="duration">
                  <em>Other</em>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="targetValue-input"
              name="targetValue"
              label="Target value"
              type="number"
              value={formValues.targetValue}
              onChange={handleInputChange}
              sx={styles.inputs}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
            ADD
            </Button>
          </Grid>
            
        </Grid>
      </Paper>
    </form>
    
  );
};
export default CreateActivityForm;
