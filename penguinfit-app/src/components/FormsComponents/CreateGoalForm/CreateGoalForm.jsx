import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';
import { createGoal } from '../../../services/goals-service';
import { getTargets, sortedActivities } from '../../../utils/activities-utils';
import { defaultErrors, defaultValues } from './CreateGoalForm-defaults';
import CustomAutocomplete from '../CustomAutocomplete/CustomAutocomplete';
import CustomNumberInput from '../CustomInput/CustomInput';
import { isValidGoalInput } from './CreateGoalForm-validations';
import { goalFromStyles } from './CreateGoalForm-styles';
import { GOAL_TITLE_LENGTH_MAX } from '../../../common/constants';

const CreateGoalForm = ({ username }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState(defaultErrors);

  const handleInputChange = (e, name, value) => {
    e?.preventDefault();
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleRadioForm = (e, value) => {
    e?.preventDefault();
    handleInputChange(e,e.target.name, value );
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    // validations - 
    if(!isValidGoalInput(formValues, setFormErrors, defaultErrors)){
      return;
    }
    createGoal(username, formValues)
      .then(() => {
        setFormValues(defaultValues);
        setFormErrors(defaultErrors);
      });
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
          sx={goalFromStyles.form} 
        >

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomNumberInput 
                type="text"
                name="title"
                label="Title"
                adornment={''}
                value={formValues.title}
                handler={handleInputChange}
                error={formErrors.title}
                maxInputLength={GOAL_TITLE_LENGTH_MAX}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={6}>

              <FormControl>
                <RadioGroup
                  value={formValues.type}
                  onChange={handleRadioForm}
                  name='type'
                  row
                  sx={{ justifyContent: 'space-between', alignSelf:'centre' }}
                >
                  <FormControlLabel
                    key="general"
                    value="general"
                    name='type'
                    control={<Radio size="small" />}
                    label="General"
                  />
                  <FormControlLabel
                    key="byExercise"
                    value=''
                    checked={formValues.type !== 'general'}
                    name="type"
                    control={<Radio size="small" />}
                    label="By activity"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
            
              {formValues.type !== 'general' &&
              <CustomAutocomplete 
                name="type" 
                label="Activity"
                value={formValues.type}
                options={sortedActivities}
                handler={handleInputChange}
                error={formErrors.type}
              />
              } 
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={4}>
              <CustomAutocomplete 
                name="target" 
                label="Target"
                value={formValues.target}
                options={getTargets(formValues.type)}
                handler={handleInputChange}
                error={formErrors.target}
              />
            </Grid>
            <Grid item xs={4}>
              <CustomNumberInput 
                type="number"
                name="targetValue"
                adornment={''}
                label="Target value"
                value={formValues.targetValue}
                handler={handleInputChange}
                error={formErrors.targetValue}
              />
            </Grid>
            <Grid item xs={4} sx={{ display:'flex', alignItems: 'right', justifyContent: 'right' }}>
              <Button variant="contained" color="primary" type="submit" sx={goalFromStyles.btn}>
            Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default CreateGoalForm;