import { Autocomplete, Button, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { activitiesMET } from '../../common/activitiesMET';
import { activityTypes } from '../../common/activity-types';
import AppState from '../../providers/app-state';
import { addActivity, createActivityObject } from '../../services/activities-service';
import { getActivityTotalCalBurned } from '../../utils/utils';

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
  const { appState:{ user } } = useContext(AppState);
  
  const defaultValues = {
    title: null,
    duration: 0,
    type: '',
    distance: 0,
    weight: 0,
    sets: 0,
    reps: 0,
    buddy: ''
  };

  // filter falsy when used:
  const [formValues, setFormValues] = useState(defaultValues);
  // const [formError, setFormError] = useState({ title : '', duration : '', type : '' });

  const [titleError, setTitleError] = useState(null);
  const [durationError, setDurationError] = useState(null);
  const [typeError, setTypeError] = useState(null);

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    const numValue = parseInt(value);

    setFormValues({
      ...formValues,
      [name]: numValue? numValue : value
    });
    
  };

  const handleAutocompleteChange = (e, val = '') => {
    
    setFormValues({
      ...formValues,
      title: val
    });
    
    // TODO: add friend functionality
  };

  const handleAdd = (event) => {
    event.preventDefault();
    console.log(formValues);

    // if(!Object.keys(activitiesMET).includes(formValues.title)){
    //   setFormError(...formError, title: 'please, choose activity from the menu' ) ;
    //   return;
    // }

    if(!Object.keys(activitiesMET).includes(formValues.title)){
      setTitleError('please, choose activity from the menu');
      return;
    }

    if(!formValues.duration){
      setDurationError('add duration');
      return;
    }

    if(!formValues.type){
      setTypeError('select a type');
      return;
    }

    const { username, weight } = user;
    const { title, duration } = formValues;
    const calories = getActivityTotalCalBurned(activitiesMET[title], weight, duration);

    const activityInput = { ...formValues, calories };
    const activityObj = createActivityObject(activityInput);

    addActivity(username, activityObj)
      .then(() => {
        console.log('activity added');
        console.log(activityObj);

        setFormValues(defaultValues);
        setTitleError(null);
        setDurationError(null);
        setTypeError(null);
      })
      .catch(console.error);
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
                name={t} 
                label={t + ' (optional)'} 
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
            // disablePortal
            id="title-input"
            value={formValues.title} 
            options={Object.keys(activitiesMET).sort()}
            selectOnFocus
            clearOnBlur
            onOpen={(e)=>e.target.value = null}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, value) => handleAutocompleteChange(event, value)}
            renderInput={(params) => <TextField {...params} fullWidth size="small" variant="standard" label="Activity" />}
          />
          <FormHelperText id="title-error-text" sx={{ color:'#D81159' }}>{formValues.title? null : <em>{titleError}</em>}</FormHelperText>
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
          <FormHelperText id="duration-error-text" sx={{ color:'#D81159' }}>{formValues.duration? null : <em>{durationError}</em>}</FormHelperText>
        </Grid>
      </Grid>

      {/* optimize and use enums */}
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
          <FormHelperText id="type-error-text" sx={{ color:'#D81159' }}>{formValues.type? null : <em>{typeError}</em>}</FormHelperText>
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
            label="Activity Buddy (optional)" 
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
