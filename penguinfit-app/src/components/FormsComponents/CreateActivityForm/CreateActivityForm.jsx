import { useContext, useEffect, useState } from 'react';
import AppState from '../../../providers/app-state';
import { sortedActivities } from '../../../common/activitiesMET';
import { typesDetails } from '../../../common/types-details';
import { listenToFriends, updateUserActivitiesDataByDay } from '../../../services/user-service';
import { addActivity, createActivityObject, updateRelatedGoals } from '../../../services/activities-service';
import { Button, FormHelperText, Grid, InputAdornment, TextField } from '@mui/material';
import { activityFromStyles as styles } from './CreateActivityForm-styles';
import { defaultErrors, defaultValues } from './CreateActivityForm-defaults';
import { activitiesTypes } from '../../../common/activities-types';
import CustomAutocomplete from '../CustomAutocomplete/CustomAutocomplete';
import { getSortedKeys } from '../../../utils/utils';
import CustomNumberInput from '../CustomNumberInput/CustomNumberInput';
import { isValidActivityInput } from './CreateActivityForm-validations';


const CreateActivityForm = () => {

  const { appState:{ user } } = useContext(AppState);
  const [friends, setFriends] = useState([]);
  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState(defaultErrors);

  useEffect(() => {
    const unsubscribe = listenToFriends(user.username, (snapshot) => {
      
      if(snapshot.exists()){
        const userFriends = snapshot.val().friends;
        setFriends(getSortedKeys(userFriends));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e, name, value) => {
    e?.preventDefault();

    setFormValues({
      ...formValues,
      [name]: value
    });
    
    // if(isValidActivityInput(formValues, friends, setFormErrors)){
    //   setFormErrors(defaultErrors);
    // }
  };

  const handleAdd = (e) => {
    e.preventDefault();

    // validations - 
    if(!isValidActivityInput(formValues, friends, setFormErrors, defaultErrors)){
      return;
    }

    // try{
    //   validateActivityInput(formValues, friends);
    // }catch(err){
    //   setFormErrors({ ...defaultErrors, [err.cause]: { msg: err.message } });
    //   return;
    // }
    
    const activityObj = createActivityObject(user, formValues);

    addActivity(user.username, activityObj)
      .then(() => {
        // TODO: updateDataByDay()
        // TODO: if walking -> updateSteps()

        return updateUserActivitiesDataByDay(user.username, activityObj.details)
          .then(() => {
          // TODO: refactor updateRelatedGoals

            return updateRelatedGoals(user.username, activityObj)
              .then(() => {

                if(activityObj.buddy){
                  const activityObjOfBuddy = { ...activityObj, buddy: user.username };
                  addActivity(activityObj.buddy, activityObjOfBuddy).catch(console.error);
                };

                setFormValues(defaultValues);
                setFormErrors(defaultErrors);
              });
          });
      })
      .catch(console.error);

  };

  // TODO: fix and optimize
  const renderTypeDetails = (types, formInputs, changeHandler) => {

    // TODO: expose only getType() and getDetails()
    const activityType = activitiesTypes[formInputs.activity];
    const activityDetails = types[activityType];

    // TODO: use enum
    const getAdornment = (det) => {
      if(det === 'weight') return 'kg';
      if(det === 'distance') return 'km';
      return '';
    };

    // TODO: use custom component
    return (
      activityDetails?.length
        ? activityDetails.map((det)=>{
          return (
            <Grid item xs={4} key={det}>
              <TextField 
                id={`${det}-input`} 
                name={det} 
                label={det + ' (optional)'} 
                type="number" 
                value={formInputs[det]} 
                onChange={changeHandler}
                variant="standard" 
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end">{getAdornment(det)}</InputAdornment>,
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
          <CustomAutocomplete 
            name="activity" 
            label="Activity"
            value={formValues.activity}
            options={sortedActivities}
            handler={handleInputChange}
            error={formErrors.activity}
          />
        </Grid>

        <Grid item xs={4}>
          <CustomNumberInput 
            name="duration"
            label="Duration"
            value={formValues.duration}
            handler={handleInputChange}
            error={formErrors.duration}
          />
        </Grid>

      </Grid>

      <Grid container spacing={2}>
        {renderTypeDetails(typesDetails, formValues, handleInputChange)}
      </Grid>

      <Grid container spacing={2}>

        <Grid item xs={8}>
          <CustomAutocomplete 
            name="buddy" 
            label="Activity Buddy (optional)"
            value={formValues.buddy}
            options={friends}
            handler={handleInputChange}
            error={formErrors.buddy}
          />
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
