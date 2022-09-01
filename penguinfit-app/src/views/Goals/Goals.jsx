import { Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import CreateGoalForm from '../../components/FormsComponents/CreateGoalForm/CreateGoalForm';
import DisplayAchievedGoals from '../../components/ListComponents/DisplayAchievedGoals/DisplayAchievedGoals';
import DetailedGoalsStepper from '../../components/Navigation/DetailedGoalsStepper/DetailedGoalsStepper';
import AppState from '../../providers/app-state';
import { goalsListener } from '../../services/goals-service';
import DisplayConfetti from '../../components/Confetti/Confetti';
import { getSteps } from '../../utils/goals-utils';

function Goals() {
  const { appState } = useContext(AppState);
  const [ goals, setGoals ] = useState(getSteps(null));
  const [showConfetti, setShowConfetti] = useState(false);
  const user = appState.user;


  useEffect(() => {
    const unsubscribe = goalsListener(user.username, (snapshot) => {
      setGoals(getSteps(snapshot.val()));
    });
    return () => unsubscribe();
  }, [user]);

  return(
    <Grid
      container
      direction="row"
      justifyContent="left"
      alignItems="left"
      sx={{ p:3, mt: 3 }}
      spacing={4}
    >
      {showConfetti ? <DisplayConfetti/> : null}
      <Grid container item direction="column" gap={4} xs={12} sm={5.5}>
        <Grid item>
          <Typography variant='h5' sx={{ pb:2 }}>New goal:</Typography>
          <Paper sx={{ backgroundColor: '#ffffff75' }}>
            <CreateGoalForm username={user.username}></CreateGoalForm>
          </Paper>
        </Grid>
        <Grid container item direction="column">
          <Typography variant='h5' sx={{ pb:2 }}>Achieved goals:</Typography>

          <Grid container item direction="column" gap={1.5} justifyContent='centre'>
            <DisplayAchievedGoals username={user.username} goals={goals.celebrated} />
          </Grid>
          
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6.5} >
        <Typography variant='h5' sx={{ pb:2 }}>Active goals:</Typography>
        <Grid 
          container
          item
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <Grid item >
            <Paper sx={{ backgroundColor: '#ffffff75', p:2 }}>
              <DetailedGoalsStepper username={user.username} steps={goals.other} setShowConfetti={setShowConfetti}></DetailedGoalsStepper>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      
    </Grid>
  ); 
};

export default Goals;