// import { Avatar, Grid, Paper, Typography, Box, IconButton  } from '@mui/material';
// // import { removeUserFriend } from '../../../services/user-service';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { createGoal, deleteGoal } from '../../../services/goals-service';

const parseDate = (date) => new Date(date).toLocaleDateString('en-uk', { year:'numeric', month:'short', day:'numeric' }); 

const millisecondsToDHM = (ms) => {
  const days = Math.floor(ms / (24*60*60*1000));
  const daysms = ms % (24*60*60*1000);
  const hours = Math.floor(daysms / (60*60*1000));
  const hoursms = ms % (60*60*1000);
  const minutes = Math.floor(hoursms / (60*1000));
  const minutesms = ms % (60*1000);
  const sec = Math.floor(minutesms / 1000);
  return `${days} days, ${hours} hrs, ${minutes} min, ${sec} sec`;
};

export default function SingleAchievedGoalView({ goal , username }) {

  const handleQuickAdd = ( user, values ) => {
    const newGoal = { ...values, currentValue:0, createdOn:Date.now(), status:'Not there yet', achievedOn:'' };
    createGoal(user, newGoal);
  };

  const handleDelete = ( user, values ) => {
    deleteGoal(user, values.type, values.target, values.id );
  };

  return (
    <Card sx={{ minWidth: 180, maxWidth:'100%' }} >
      <CardContent>
        <Stack 
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={-1}
        >
          <Typography sx={{ fontSize: 14 }} color="text.main" gutterBottom>
            { 'Title:' }
          </Typography>
          <Typography sx={{ fontSize: 11 }} color="text.main" gutterBottom>
            {goal.title}
          </Typography>
        </Stack>
        <Stack 
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-start"
          spacing={0.5}
          sx={{ m:2 }}
        >
          <Typography sx={{ fontSize: 11 }} xs={6} color="text.secondary" gutterBottom>
            {`Type: ${goal.type}`}
          </Typography>
          <Typography sx={{ fontSize: 11 }} xs={6} color="text.secondary" gutterBottom>
            {`Target: ${goal.target}`}
          </Typography>
          <Typography sx={{ fontSize: 11 }} xs={6} color="text.secondary" gutterBottom>
            {`Created on: ${parseDate(goal.createdOn) }`}
          </Typography>
          <Typography sx={{ fontSize: 11 }} xs={6} color="text.secondary" gutterBottom>
            {'Completed in:'}
          </Typography>
          <Typography sx={{ fontSize: 11 }} xs={6} color="text.secondary" gutterBottom>
            {`${millisecondsToDHM(goal.achievedOn - goal.createdOn)}`}
          </Typography>
        </Stack>

      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Button size="small" onClick={() => handleQuickAdd(username, goal)}>Quick add</Button>
          <Button size="small" onClick={() => handleDelete(username, goal)}>Delete</Button>
        </Stack>
      </CardActions>
    </Card>
  );

}