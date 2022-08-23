import { useContext, useEffect, useState } from 'react';
import AppState from '../../providers/app-state';
import { activitiesMET } from '../../common/activitiesMET';
import { typesDetails } from '../../common/types-details';
// import { getActivityTotalCalBurned } from '../../utils/utils';
import { listenToFriends, updateUserActivitiesDataByDay } from '../../services/user-service';
import { addActivity, createActivityObject, updateRelatedGoals } from '../../services/activities-service';
import { 
  Autocomplete, 
  Button, 
  FormControl, 
  FormControlLabel, 
  FormHelperText, 
  Grid, 
  InputAdornment, 
  Radio, 
  RadioGroup, 
  TextField 
} from '@mui/material';
// import { getDateAsString } from '../../utils/utils';
// import { upTheUser } from '../../mock-data/dash-mock-data';

const styles = {
  inputs:{
    minWidth: '100%',
  },
  form:{
    p: 2,
  },
  helperText:{ 
    color:'#D81159' 
  },
  btn:{ 
    width: '100%', 
    height: '3.2em' 
  }
};

const CreateActivityForm = () => {
  
  const defaultValues = {
    title: null,
    duration: 0,
    type: '',
    distance: 0,
    kg: 0,
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
  const [friends, setFriends] = useState([]);
  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState(defaultErrors);

  useEffect(() => {
    const unsubscribe = listenToFriends(user.username, (snapshot) => {
      
      if(snapshot.exists()){
        const userFriends = snapshot.val().friends;
        setFriends(Object.keys(userFriends));
      }
    });
    return () => unsubscribe();
  }, []);

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
    
  };

  const handleAdd = (event) => {
    event.preventDefault();
    // console.log(formValues);

    // upTheUser(user.username).then(console.log);

    // const today = new Date();
    // console.log(getDateAsString(today));
    
    // getUserDataOfDay(user.username, 'Sat Aug 6 2022').then((snapshot)=>{
      
    //   console.log('FROM CREATE ACTIVITY FORM');
    //   console.log(snapshot.val());
    // });

    // validations -> optimize -> in validateInputs() + setError()

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
    
    // refactor createActivityObject to calculate steps based on duration if walking
    const activityObj = createActivityObject(user, formValues);

    if(activityObj.buddy){
      const activityObjOfBuddy = { ...activityObj, buddy: user.username };
      addActivity(activityObj.buddy, activityObjOfBuddy).catch(console.error);
    };

    addActivity(user.username, activityObj)
      .then(() => {
        // updateDataByDay()
        // if walking -> updateSteps()

        return updateUserActivitiesDataByDay(user.username, activityObj.details)
          .then(() => {
          // refactor updateRelatedGoals

            return updateRelatedGoals(user.username, activityObj)
              .then(() => {

                // console.log(snapshot);

                setFormValues(defaultValues);
                setFormErrors(defaultErrors);
              });
          });
      })
      .catch(console.error);
  };

  // put in activitiesMET
  // unite with validateInputs()
  const validateTitle = (title) => {
    return Object.keys(activitiesMET).includes(title);
  };

  // 
  // unite with validateInputs()
  const validateBuddy = (fr, buddy) => {
    return fr.includes(buddy);
  };

  // replace with activity-type enum
  const renderTypeOptions = (types)=>{
    return Object.keys(types).map((t)=>{
      return (
        <FormControlLabel
          key={t}
          value={t}
          control={<Radio size="small" />}
          label={t}
        />
      );
    });
  };

  const renderTypeDetails = (types, defaults, changeHandler) => {
    const getAdornment = (type) => {
      if(type === 'kg') return 'kg';
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

              <FormHelperText id="number-error-text" sx={styles.helperText}>
                <em>{formErrors.number?.msg}</em>
              </FormHelperText>

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
      gap={2}
      sx={styles.form} 
    >
        
      <Grid container spacing={2}>

        <Grid item xs={8}>

          {/* separate component */}
          <Autocomplete
            id="title-input"
            value={formValues.title} 
            options={Object.keys(activitiesMET).sort()}
            clearIcon={null}
            onOpen={(e)=>e.target.value = null}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, value) => handleAutocompleteChange(event, value)}
            onInputChange={(event, value) => handleAutocompleteChange(event, value)}
            renderInput={(params) => <TextField {...params} fullWidth size="small" variant="standard" label="Activity" />}
          />


          <FormHelperText id="title-error-text" sx={styles.helperText}>
            <em>{!formErrors.title? null : formErrors.title.msg}</em>
          </FormHelperText>

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

          <FormHelperText id="duration-error-text" sx={styles.helperText}>
            <em>{formErrors.duration?.msg}</em>
          </FormHelperText>

          <FormHelperText id="number-error-text" sx={styles.helperText}>
            <em>{formErrors.number?.msg}</em>
          </FormHelperText>

        </Grid>

      </Grid>

      
      <Grid container spacing={2}>
        {/* replace with activity-type enum  */}
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
              {renderTypeOptions(typesDetails)}
            </RadioGroup>
          </FormControl>

          <FormHelperText id="type-error-text" sx={styles.helperText}>
            <em>{formErrors.type?.msg}</em>
          </FormHelperText>
          
        </Grid>
            
      </Grid>

      <Grid container spacing={2}>
        {renderTypeDetails(typesDetails, formValues, handleInputChange)}
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

          <FormHelperText id="buddy-error-text" sx={styles.helperText}>
            <em>{formErrors.buddy?.msg}</em>
          </FormHelperText>
          
        </Grid>
        
        <Grid item xs={4}>

          <Button variant="contained" color="primary" onClick={handleAdd} sx={styles.btn}>
            ADD
          </Button>

        </Grid>
        
      </Grid>

    </Grid>
  );
};

export default CreateActivityForm;
