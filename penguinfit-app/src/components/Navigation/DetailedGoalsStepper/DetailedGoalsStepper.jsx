import { Typography, Stack, Box, } from '@mui/material';
import { useState } from 'react';
import { deleteGoal, updateGoalStatus } from '../../../services/goals-service';
import { activateConfetti } from '../../../utils/goals-utils';
import SingleDetailedGoalView from '../../SingleViewComponent/SingleDetailedGoalView/SingleDetailedGoalView';
import Carousel from '../Carousel/Carousel';


export default function DetailedGoalsStepper({ steps, username, setShowConfetti }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleDelete = (type, target, id) => {
    deleteGoal(username, type, target, id);
    setActiveStep(activeStep > 1 ? activeStep - 1 : 0);
  };
  
  const handleCelebrate = (type, target, id) => {
    updateGoalStatus(username, type, target, id, 'celebrated');
    activateConfetti(setShowConfetti);
    setActiveStep(activeStep > 1 ? activeStep - 1 : 0);
  };

  return (
    <Box sx={{ minWidth:{ xs: 'auto', sm:500 }, minHeight: '100%' ,flexGrow: 1 , overflow:'hidden' }}>
      { steps.length > 0 ? <>
        <SingleDetailedGoalView step={steps[activeStep]} handleCelebrate={handleCelebrate} handleDelete={handleDelete} />
        <Carousel steps={steps} activeStep={activeStep} setActiveStep={setActiveStep}/>
      </>
        : 
        <>
          <Stack>
            <Typography align="center" >Don't be a lazy penguin !</Typography>
            <Typography align="center" >Add some goals ! </Typography>

          </Stack>
        </>
      }
    </Box>
  );
}