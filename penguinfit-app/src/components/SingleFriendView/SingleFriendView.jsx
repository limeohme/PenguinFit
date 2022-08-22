import { Avatar, Grid, Paper, Typography, Box, Button  } from '@mui/material';
import { removeUserFriend } from '../../services/user-service';

export default function SingleFriendView({ friend, user }) {
  
  const handleDelete = (userHandle, toBeRemoved) => {
    removeUserFriend(userHandle, toBeRemoved);
  };

  return (
    <Box >
      <Paper sx={{ display: 'flex' , backgroundColor: '#6633ff10', p: 2 }}>
        <Grid 
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={5} 
        >
          <Grid item xs sm>
            <Avatar alt={friend.username} src={friend.avatarURL} />
          </Grid>
          <Grid item xs sm >
            <Typography variant='h5'>{friend.username}</Typography>
          </Grid>
          <Grid item xs sm alignItems="flex-start" >
            <Button variant="contained" color="primary" onClick={() => handleDelete( user, friend.username)}  >x</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );

}