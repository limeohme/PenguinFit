// import { Avatar, Chip } from '@mui/material';
// import { Grid } from '@mui/system';
import { Grid, Paper } from '@mui/material';
import SingleAchievedGoalView from '../../SingleViewComponent/SingleAchievedGoalView/SingleAchievedGoalView';


export default function DisplayAchievedGoals ({ username, goals }) {

  return (
    <Paper sx={{ p:2 }}>
      <Grid 
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center" 
        spacing={1} 
        gap={1}>
        {/* <Typography>{`Total achieved goals ${achievedGoals}`}</Typography> */}
        { goals.map(el =>
          <Grid item xs={12} sm={12} key={el.id}> 
            <SingleAchievedGoalView goal={el} username={username} /> 
          </Grid>) }
      </Grid>
    </Paper>
  );
}