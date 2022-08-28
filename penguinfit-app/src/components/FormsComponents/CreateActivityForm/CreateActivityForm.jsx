import { useContext, useEffect, useState } from 'react';
import AppState from '../../../providers/app-state';
import { getSortedKeys } from '../../../utils/utils';
import { listenToFriends } from '../../../services/user-service';
import { addAndUpdateActivityInfo, sendActivityRequest } from '../../../services/activities-service';
import { createActivityObject, getActivityTypeDetails, sortedActivities } from '../../../utils/activities-utils';

import { activityFromStyles as styles } from './CreateActivityForm-styles';
import { defaultErrors, defaultValues } from './CreateActivityForm-defaults';
import { isValidActivityInput } from './CreateActivityForm-validations';

import { Button, Grid } from '@mui/material';
import CustomAutocomplete from '../CustomAutocomplete/CustomAutocomplete';
import CustomInput from '../CustomInput/CustomInput';
import RenderMultipleInputs from '../RenderMultipleInputs/RenderMultipleInputs';


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

    // validate
    if(!isValidActivityInput(formValues, friends, setFormErrors, defaultErrors)){
      return;
    }
    
    // create object
    const activityObj = createActivityObject(user, formValues);

    // update DB
    addAndUpdateActivityInfo(user.username, activityObj)
      .then((activityHandle) => {

        if(activityHandle){

          if(activityObj.buddy){
            sendActivityRequest(user.username, activityHandle, activityObj.buddy )
              .catch(console.error);
          };

          setFormValues(defaultValues);
          setFormErrors(defaultErrors);
        }
      })
      .catch(console.error);
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
          <CustomInput 
            type="number"
            name="duration"
            label="Duration"
            value={formValues.duration}
            handler={handleInputChange}
            error={formErrors.duration}
          />
        </Grid>

      </Grid>

      <Grid container spacing={2}>
        <RenderMultipleInputs 
          array={getActivityTypeDetails(formValues.activity)}
          gridItemXS={4}
          form={formValues} 
          handler={handleInputChange}
        />
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
