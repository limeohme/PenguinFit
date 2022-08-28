import { addAndUpdateActivityInfo, sendActivityRequest } from '../../../services/activities-service';
import { activityDetailsToString, updateActivityDateAndTime } from '../../../utils/activities-utils';
import { ButtonBase, Grid, Paper, Typography } from '@mui/material';
import CustomTooltip from '../../CustomTooltip/CustomTooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getDetailWithAdornment } from '../../../utils/utils';

export default function SingleActivity({ activity, username }) {
  
  const handleReuse = () => {
    const updatedActivityObj = updateActivityDateAndTime(activity);

    addAndUpdateActivityInfo(username, updatedActivityObj)
      .then((activityHandle)=>{
        
        if(activity.buddy){
          sendActivityRequest( username, activityHandle, activity.buddy )
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  return (
    <Paper sx={{ display: 'flex', backgroundColor: '#ffffff', p: 2, minHeight: '11em' }}>

      <Grid container direction='column' columnGap={0} justifyContent='space-between' alignItems='center'>

        <Grid item container justifyContent='space-between' alignItems='center'>

          <Grid item xs={5.5} sm={4} >
            <Typography variant='h5'>{activity.activity}</Typography>
          </Grid>

          <Grid item xs={6.5} sm={8}>
            <Typography sx={{ textAlign:'right' }}>{activity.createdOn}</Typography>
            <Typography sx={{ textAlign:'right' }}>{activity?.createdAt}</Typography>
          </Grid>

        </Grid>

        <Grid item container justifyContent='space-between' alignItems='centre' sx={{ color:'#00000050' }}>

          <Grid item xs={6} sm={6}>
            {/* TODO: make dynamic */}
            <Typography>{`${activityDetailsToString(activity.details)} ${activity.type}`}</Typography>
          </Grid>

          <Grid item xs={6} sm={6}>
            <Typography sx={{ textAlign:'right' }}><em>{activity.buddy? `with ${activity.buddy}` : null}</em></Typography>
          </Grid>

        </Grid>

        <Grid item container justifyContent='space-between'  alignItems='center'>

          <Grid item xs={11} sm={11}>
            <Typography variant="h6">
              {`${getDetailWithAdornment('duration', activity.details.duration)}, 
              ${getDetailWithAdornment('caloriesBurned', activity.details.caloriesBurned.toFixed(0))}`}
            </Typography>
          </Grid>

          <Grid container item xs={1} sm={1} justifyContent='right'>
            <CustomTooltip title="re-log" arrow>
              <ButtonBase sx={{ width: '100%' }}>
                <AddCircleIcon variant="contained" color="primary" fontSize="large" onClick={handleReuse}/>
              </ButtonBase>
            </CustomTooltip>
          </Grid>

        </Grid>

      </Grid>
      
    </Paper>
  );

}