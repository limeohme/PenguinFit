import { Typography, Paper, Grid, ButtonBase } from '@mui/material';
import { createGoal, deleteGoal } from '../../../services/goals-service';
import { parseDate, millisecondsToDHM } from '../../../utils/goals-utils';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomTooltip from '../../CustomTooltip/CustomTooltip';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/system';
import { targetIcons } from '../../../common/targets-icons';

const secondaryDetailsStyle = { color:'#00000050' };

export default function SingleAchievedGoalView({ goal, username  }) {

  const handleQuickAdd = ( user, values ) => {
    const newGoal = { ...values, currentValue:0, createdOn:Date.now(), status:'Not there yet', achievedOn:'' };
    createGoal(user, newGoal);
  };

  const handleDelete = ( user, values ) => {
    deleteGoal(user, values.type, values.target, values.id );
  };

  return (
    <Paper sx={{ display: 'flex', backgroundColor: '#ffffff50', p: 2, minHeight: '8em' }}>

      <Grid container direction='column' gap={1.5} justifyContent='space-between' alignItems='center'>

        <Grid item container justifyContent='space-between' alignItems='center'>

          <Grid item xs={11} sm={11} >
            <Typography variant='h5'>{`${targetIcons[goal.target]??''}`} {goal.title}</Typography>
            
          </Grid>

          

          <Grid item xs={1} sm={1} >
            <CustomTooltip title="delete" arrow placement="top">
              <ButtonBase sx={{ width: '100%' }}>
                <CloseIcon variant="outlined" fontSize="medium" onClick={() => handleDelete(username, goal)} ></CloseIcon>
              </ButtonBase>
            </CustomTooltip>
          </Grid>
          
        </Grid>

        <Grid item container justifyContent='space-between' alignItems='centre' >
          <Stack>
            <Typography sx={secondaryDetailsStyle}>{`Type: ${goal.type} `}</Typography>
            <Typography sx={secondaryDetailsStyle}>{ `Target: ${goal.target}`}</Typography>
            <Typography sx={secondaryDetailsStyle}> {`Created on: ${parseDate(goal.createdOn) }`}</Typography>
          </Stack>
        </Grid>

        <Grid item container justifyContent='space-between' alignItems='centre' >

          <Grid item xs={11} sm={11}>
            <Typography  gutterBottom>
              {`Completed in ${millisecondsToDHM(goal.achievedOn - goal.createdOn)}`}
            </Typography>
          </Grid>

          <Grid container item xs={1} sm={1} justifyContent='right'>
            <CustomTooltip title="re-log" arrow>
              <ButtonBase sx={{ width: '100%' }}>
                <AddCircleIcon variant="contained" color="primary" fontSize="large" onClick={() => handleQuickAdd(username, goal)}/>
              </ButtonBase>
            </CustomTooltip>
          </Grid>

        </Grid>

      </Grid>
      
    </Paper>
  );

}