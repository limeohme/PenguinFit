import { Grid } from '@mui/material';
import SingleAchievedGoalView from '../../SingleViewComponent/SingleAchievedGoalView/SingleAchievedGoalView';

export default function DisplayAchievedGoals ({ username, goals }) {

  return (
    <Grid 
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center" 
      spacing={1} 
      gap={1}>
      { goals.map(el =>
        <Grid item xs={12} sm={12} key={el.id}> 
          <SingleAchievedGoalView goal={el} username={username} /> 
        </Grid>) }
    </Grid>
  );
}