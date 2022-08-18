import { Button, Grid, Paper, Typography } from '@mui/material';
// import { Card, CardActionArea, CardContent } from '@mui/material';

export default function SingleActivityView() {
  
  return (
    <Paper sx={{ display: 'flex' , backgroundColor: '#6633ff10', p: 2 }}>
      {/* <Card sx={{ display: 'flex' , backgroundColor: '#6633ff10' }}>
        <CardActionArea>
          <CardContent> */}

      <Grid container direction='column' spacing={1} justifyContent='space-between' alignItems='centre'>
        <Grid item container spacing={2} justifyContent='space-between' alignItems='centre'>
          <Grid item xs={6} sm={6} >
            <Typography variant='h5'>Swimming</Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography sx={{ textAlign:'right' }}>17|08|2022</Typography>
          </Grid>
        </Grid>

        <Grid item container spacing={2} justifyContent='space-between' alignItems='centre' sx={{ color:'#00000050' }}>
          <Grid item xs={6} sm={6}>
            <Typography>5km, cardio</Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography sx={{ textAlign:'right' }}><em>{'with Joey' || null}</em></Typography>
          </Grid>
        </Grid>

        <Grid item container spacing={2} justifyContent='space-between'  alignItems='centre'>
          <Grid item xs={6} sm={6}>
            <Typography variant="h6">60 min | 316 kcal</Typography>
          </Grid>
          <Grid container item xs={6} sm={6} justifyContent='right'>
            <Button variant="text" color="primary" size='small' sx={{ ml:'auto' }}>ADD</Button>
          </Grid>
        </Grid>
      </Grid>

      {/* </CardContent>
        </CardActionArea>
      </Card> */}
    </Paper>
  );

}