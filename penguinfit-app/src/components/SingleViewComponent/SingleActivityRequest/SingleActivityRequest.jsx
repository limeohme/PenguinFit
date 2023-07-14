import { ButtonBase, Grid, Paper, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { addAndUpdateActivityInfo, deleteActivityRequest } from '../../../services/activities-service';
import { updateRequestedActivity } from '../../../utils/activities-utils';
import CustomTooltip from '../../CustomTooltip/CustomTooltip';

export default function SingleActivityRequest({ activity, username }) {

  const handleDeclineRequest = () => {
    deleteActivityRequest(activity.requestHandle, username)
      .catch(console.error);
  };

  const handleAcceptRequest = () => {
    const updatedActivityObj = updateRequestedActivity(activity);

    addAndUpdateActivityInfo(username, updatedActivityObj)
      .then(() => {
        deleteActivityRequest(activity.requestHandle, username);
      })
      .catch(console.error);
  };
  
  return (
    <Paper sx={{ display: 'flex', backgroundColor: '#ffffff50', p: 2, minHeight: '8em' }}>

      <Grid container direction='column' gap={1.5} justifyContent='space-between' alignItems='center'>

        <Grid item container justifyContent='space-between' alignItems='center'>

          <Grid item xs={6} sm={6} >
            <Typography variant='h5'>{activity.activity}</Typography>
          </Grid>

          <Grid item xs={5} sm={5}>
            <Typography sx={{ textAlign:'right', color:'#00000050' }}>{`sent by ${activity.sender}`}</Typography>
          </Grid>

          <Grid item xs={1} sm={1} >
            <CustomTooltip title="decline" arrow placement="top">
              <ButtonBase sx={{ width: '100%' }}>
                <CloseIcon variant="outlined" fontSize="medium" onClick={handleDeclineRequest} ></CloseIcon>
              </ButtonBase>
            </CustomTooltip>
          </Grid>
          
        </Grid>

        <Grid item container justifyContent='space-between' alignItems='centre' >

          <Grid item xs={11} sm={11}>
            <Typography>{activity.createdOn}, {activity.createdAt}</Typography>
          </Grid>

          <Grid container item xs={1} sm={1} justifyContent='right'>
            <CustomTooltip title="accept" arrow>
              <ButtonBase sx={{ width: '100%' }}>
                <AddCircleIcon variant="contained" color="primary" fontSize="large" onClick={handleAcceptRequest}/>
              </ButtonBase>
            </CustomTooltip>
          </Grid>

        </Grid>

      </Grid>
      
    </Paper>
  );

}