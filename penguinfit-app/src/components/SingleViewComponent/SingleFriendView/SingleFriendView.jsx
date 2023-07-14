import { Avatar, Grid, Paper, Typography, Box, IconButton  } from '@mui/material';
// import { removeUserFriend } from '../../../services/user-service';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function SingleFriendContainerView({ avatar, text, handleDelete, handleAdd }) {
  return (
    <Box sx={{ width: '280px', maxWidth: '100%' }}>
      <Paper sx={{ display: 'flex' , backgroundColor: '#6633ff10', p: 2 }}>
        <Grid 
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={5} 
        >
          <Grid item xs={3} sm={3}>
            <Avatar alt={text} src={avatar} />
          </Grid>
          <Grid item xs={5} sm={5} >
            <Typography variant='h6'>{text}</Typography>
          </Grid>
          <Grid item container xs={4} sm={4} alignItems="center" justifyContent="flex-end">
            <Grid item xs={6} sm={6}>
              <IconButton variant="contained" color="error"  onClick={() => handleDelete()} >
                <PersonRemoveIcon/>
              </IconButton>
            </Grid>
            {handleAdd && 
            <Grid item xs={6} sm={6}>
              <IconButton variant="contained" color="primary" onClick={() => handleAdd()}  >
                <PersonAddIcon/>
              </IconButton>
            </Grid>
            }
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );

}