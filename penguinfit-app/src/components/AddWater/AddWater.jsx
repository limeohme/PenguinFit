import LocalDrink from '@mui/icons-material/LocalDrink';
import { Button, Grid, Typography } from '@mui/material';

export default function AddWater ({ water, AddWaterHandler }) {
  return (
    <Grid item container direction="row" justifyContent='space-between' alignItems='center'
      sx={{ backgroundColor: '#ffffff75', mb: '1rem', p: '1rem', boxShadow: 1, }}>
      <Grid item container xs={8} direction='row' gap={4}>
        <LocalDrink sx={{ fontSize: '2rem' }}/>
        <Typography variant='h6'>{water} ml</Typography>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" color="primary" sx={{ boxSizing:'border-box', width: '100%' }}
          onClick={AddWaterHandler}>+ 250 ml</Button>
        
      </Grid>
    </Grid>
  );
}