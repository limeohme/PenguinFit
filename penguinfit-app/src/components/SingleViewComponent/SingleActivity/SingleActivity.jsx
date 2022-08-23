import { Button, Grid, Paper, Typography } from '@mui/material';
// import { Card, CardActionArea, CardContent } from '@mui/material';

export default function SingleActivityView({ activity }) {
  
  return (
    <Paper sx={{ 
      display: 'flex' ,
      backgroundColor: '#ffffff90', p: 2, minHeight: '11em' }}>

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
            <Typography>{`${activity.details.distance} km, ${activity.type}`}</Typography>
          </Grid>

          <Grid item xs={6} sm={6}>
            <Typography sx={{ textAlign:'right' }}><em>{activity.buddy? `with ${activity.buddy}` : null}</em></Typography>
          </Grid>

        </Grid>

        <Grid item container justifyContent='space-between'  alignItems='center'>

          <Grid item xs={8} sm={8}>
            <Typography variant="h6">{`${activity.duration} min, ${activity.details.caloriesBurned.toFixed(0)} kcal`}</Typography>
          </Grid>

          <Grid container item xs={4} sm={4} justifyContent='right'>
            <Button variant="text" color="primary" size='small' sx={{ ml:'auto' }}>ADD</Button>
          </Grid>

        </Grid>

      </Grid>
      
    </Paper>
  );

}