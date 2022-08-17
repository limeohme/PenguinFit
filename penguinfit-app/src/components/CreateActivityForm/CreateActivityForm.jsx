import { Autocomplete, Button, FormControl, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import { useState } from 'react';
import { activitiesMET } from '../../common/activitiesMET';

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

  const handleAutocompleteChange = (e, val = '') => {

    setFormValues({
      ...formValues,
      title: val
    });
    
  };

  const handleAdd = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  const renderTypeDetails = (types, defaults, changeHandler) => {
    const getAdornment = (type) => {
      if(type === 'weight') return 'kg';
      if(type === 'distance') return 'km';
      return '';
    };

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
                InputProps={{
                  endAdornment: <InputAdornment position="end">{getAdornment(t)}</InputAdornment>,
                }}
              />
            </Grid>
          );
        })

        :null
    );
  };

  return (
    

    <Grid 
      container 
      direction="column" 
      justifyContent="space-between" 
      alignItems="center" 
      alignSelf="left" 
      sx={styles.form} 
    >
        
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Autocomplete
            disablePortal
            id="title-input"
            options={Object.keys(activitiesMET).sort()}
            // value={formValues.title}
            // isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, value) => handleAutocompleteChange(event, value)}
            renderInput={(params) => <TextField {...params} fullWidth size="small" variant="standard" label="Activity" />}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="duration-input"
            name="duration"
            label="Duration"
            type="number"
            value={formValues.duration}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            }}
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
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField 
            id="buddy-input" 
            name="buddy" 
            label="Activity Buddy" 
            type="text" 
            value={formValues.buddy} 
            onChange={handleInputChange} 
            fullWidth
            variant="outlined" 
            size="small"/>
        </Grid>
        <Grid item xs={4} sx={{ display:'flex', alignItems: 'right', justifyContent: 'right' }}>
          <Button variant="contained" color="primary" onClick={handleAdd} sx={{ width: '100%', boxSizing: 'border-box' }}>
            ADD
          </Button>
        </Grid>
      </Grid>

    </Grid>
    
    
  );

};
export default CreateActivityForm;
