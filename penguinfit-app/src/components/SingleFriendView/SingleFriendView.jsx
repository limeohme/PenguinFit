import { Avatar, Grid, Paper, Typography, Box, Button  } from '@mui/material';
import { removeUserFriend } from '../../services/user-service';

export default function SingleFriendView({ friend, user }) {
  
  const handleDelete = (userHandle, toBeRemoved) => {
    removeUserFriend(userHandle, toBeRemoved);
  };

  return (
    <Box sx={{ minWidth: 500 }}>
      <Paper sx={{ display: 'flex' , backgroundColor: '#6633ff10', p: 2 }}>
        <Grid 
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={5} 
        >
          <Grid item xs={2} sm={2}>
            <Avatar alt={friend.username} src={friend.avatarURL} />
          </Grid>
          <Grid item xs={7} sm={7} >
            <Typography variant='h5'>{friend.username}</Typography>
          </Grid>
          <Grid item xs={3} sm={3} alignItems="flex-start" >
            <Button variant="contained" color="primary" onClick={() => handleDelete( user, friend.username)}  >Remove</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );

}