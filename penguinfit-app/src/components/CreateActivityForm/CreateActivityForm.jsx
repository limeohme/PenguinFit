import { Autocomplete, Button, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { activitiesMET } from '../../common/activitiesMET';
import { activityTypes } from '../../common/activity-types';
import AppState from '../../providers/app-state';
import { addActivity, createActivityObject } from '../../services/activities-service';
// import { getUserFriendsByHandle } from '../../services/user-service';
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

  const defaultErrors = { 
    title : null, 
    duration : null, 
    type : null,
    buddy: null,
    number: null 
  };

  const { appState:{ user } } = useContext(AppState);
  const [friends] = useState(Object.keys(user.friends));
  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState(defaultErrors);

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    const numValue = parseInt(value);

    if(!Number.isNaN(numValue) && numValue < 0){
      setFormErrors({ ...formErrors, number: { msg:'only positive integers' } });
      return;
    }
    
    setFormValues({
      ...formValues,
      [name]: numValue? numValue : value
    });
    
  };

  const handleAutocompleteChange = (e, val = '') => {
    
    setFormValues({
      ...formValues,
      [e?.target.id.split('-')[0]]: val
    });

    console.log(formValues.title);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    console.log(formValues);

    // validations

    if(!validateTitle(formValues.title)){
      setFormErrors({ ...formErrors, title: { msg: 'choose activity from the menu' } });
      return;
    }

    if(!formValues.duration || parseInt(formValues.duration) === 0){
      setFormErrors({ ...formErrors, duration: { msg: 'add duration' } });
      return;
    }

    if(!formValues.type){
      setFormErrors({ ...formErrors, type: { msg: 'select a type' } });
      return;
    }

    if(formValues.buddy){
      if(!validateBuddy(friends, formValues.buddy)){
        setFormErrors({ ...formErrors, buddy: { msg: 'choose user from the menu or skip' } });
        return;
      }
    }

    const { username, weight } = user;
    const { title, duration } = formValues;
    const calories = getActivityTotalCalBurned(activitiesMET[title], weight, duration);

    const activityInput = { ...formValues, calories };
    const activityObj = createActivityObject(activityInput);

    if(activityObj.buddy){
      const activityObjOfBuddy = { ...activityObj, buddy: username };
      addActivity(activityObj.buddy, activityObjOfBuddy);
    };

    addActivity(username, activityObj)
      .then(() => {
        console.log('activity added');
        console.log(activityObj);

        setFormValues(defaultValues);
        setFormErrors(defaultErrors);
      })
      .catch(console.error);
  };

  const validateTitle = (title) => {
    return Object.keys(activitiesMET).includes(title);
  };

  const validateBuddy = (fr, buddy) => {
    return fr.includes(buddy);
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
              <FormHelperText id="number-error-text" sx={{ color:'#D81159' }}><em>{formErrors.number?.msg}</em></FormHelperText>
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
            
            id="title-input"
            value={formValues.title} 
            options={Object.keys(activitiesMET).sort()}
            clearIcon={null}
            // selectOnFocus
            // clearOnBlur
            onOpen={(e)=>e.target.value = null}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, value) => handleAutocompleteChange(event, value)}
            onInputChange={(event, value) => handleAutocompleteChange(event, value)}
            renderInput={(params) => <TextField {...params} fullWidth size="small" variant="standard" label="Activity" />}
          />
          <FormHelperText id="title-error-text" sx={{ color:'#D81159' }}><em>{!formErrors.title? null : formErrors.title.msg}</em></FormHelperText>
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
          <FormHelperText id="duration-error-text" sx={{ color:'#D81159' }}><em>{formErrors.duration?.msg}</em></FormHelperText>
          <FormHelperText id="number-error-text" sx={{ color:'#D81159' }}><em>{formErrors.number?.msg}</em></FormHelperText>
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
          <FormHelperText id="type-error-text" sx={{ color:'#D81159' }}><em>{formErrors.type?.msg}</em></FormHelperText>
          
        </Grid>
            
      </Grid>

      <Grid container spacing={2}>
        {renderTypeDetails(activityTypes, formValues, handleInputChange)}
        
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Autocomplete
            id="buddy-input"
            value={formValues.buddy} 
            options={friends}
            clearIcon={null}
            onOpen={(e)=>e.target.value = null}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, value) => handleAutocompleteChange(event, value)}
            onInputChange={(event, value) => handleAutocompleteChange(event, value)}
            renderInput={(params) => <TextField {...params} fullWidth size="small" variant="standard" label="Activity Buddy (optional)" />}
          />
          <FormHelperText id="buddy-error-text" sx={{ color:'#D81159' }}><em>{formErrors.buddy?.msg}</em></FormHelperText>
          
        </Grid>
        
        <Grid item xs={4} sx={{ display:'flex', alignItems: 'right', justifyContent: 'right' }}>
          <Button variant="contained" color="primary" onClick={handleAdd} sx={{ width: '100%', boxSizing: 'border-box', height: '3.2em' }}>
            ADD
          </Button>
        </Grid>
        
      </Grid>
    </Grid>
  );
};

export default CreateActivityForm;
