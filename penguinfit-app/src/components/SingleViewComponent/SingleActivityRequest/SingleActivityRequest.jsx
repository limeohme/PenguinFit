import { Button, Grid, Paper, Typography } from '@mui/material';

export default function SingleActivityRequest({ activity, handleDelete, handleAdd }) {
  
  return (
    <Paper sx={{ 
      display: 'flex' ,
      backgroundColor: '#ffffff90', p: 2, minHeight: '11em' }}>

      <Grid container direction='column' justifyContent='space-between' alignItems='center'>

        <Grid item container justifyContent='space-between' alignItems='center'>

          <Grid item xs={5} sm={5} >
            <Typography variant='h5'>{activity.activity}</Typography>
          </Grid>

          <Grid item xs={6} sm={6}>
            <Typography sx={{ textAlign:'right' }}>{activity.createdOn}</Typography>
            <Typography sx={{ textAlign:'right' }}>{activity.createdAt}</Typography>
          </Grid>

          <Grid item xs={1} sm={1} >
            <Button variant="text" color="primary" size='small' onClick={handleDelete} sx={{ ml:'auto' }}>✖</Button>
          </Grid>
        </Grid>

        <Grid item container justifyContent='space-between' alignItems='centre' sx={{ color:'#00000050' }}>

          <Grid item xs={10} sm={10}>
            {/* TODO: make dynamic */}
            <Typography>{`sent by ${activity.creator}`}</Typography>
          </Grid>

          <Grid container item xs={2} sm={2} justifyContent='right'>
            <Button variant="text" color="primary" size='small' onClick={handleAdd} sx={{ ml:'auto' }}>+</Button>
          </Grid>

        </Grid>

      </Grid>
      
    </Paper>
  );

}