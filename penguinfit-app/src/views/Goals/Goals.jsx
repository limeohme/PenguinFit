import { Grid } from '@mui/material';
import GoalsStepper from '../../components/GoalsStepper/GoalsStepper';

const steps = [
  {
    name: 'Da skolasam da zawursha',
    status: 'po4ti',
    createdOn: new Date(),
    dueDate: new Date(),
    completed: 90,
  },
  {
    name: 'Da skolasam da si namerq rabota',
    status: 'zle e',
    createdOn: new Date(),
    dueDate: new Date(),
    completed: 1,
  },
];
    

function Goals() {
  return(
    <Grid>
      <h3>Your goals:</h3>
      <GoalsStepper steps={ steps }></GoalsStepper>
    </Grid>
  ); 
};

export default Goals;