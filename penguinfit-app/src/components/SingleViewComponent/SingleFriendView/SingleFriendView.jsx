import { Avatar, Grid, Paper, Typography, Box, Button  } from '@mui/material';
// import { removeUserFriend } from '../../../services/user-service';

export default function SingleFriendContainerView({ avatar, text, handleDelete, handleAdd }) {
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
            <Avatar alt={text} src={avatar} />
          </Grid>
          <Grid item xs sm >
            <Typography variant='h5'>{text}</Typography>
          </Grid>
          <Grid item xs sm alignItems="flex-start" >
            <Button variant="contained" color="primary" onClick={() => handleDelete()}  >Remove</Button>
          </Grid>
          {handleAdd && 
          <Grid item xs sm alignItems="flex-start" >
            <Button variant="contained" color="primary" onClick={() => handleAdd()}  >Add</Button>
          </Grid>
          }
        </Grid>
      </Paper>
    </Box>
  );

}