import LocalDrink from '@mui/icons-material/LocalDrink';
import { Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AddWater ({ water, AddWaterHandler }) {
  return (
    <Grid item container direction="row" justifyContent='space-between' alignItems='center'
      sx={{ backgroundColor: '#ffffff75', mb: '1rem', p: '1rem', boxShadow: 1, }}>
      <Grid item container xs={8} direction='row' gap={4}>
        <LocalDrink sx={{ fontSize: '2rem' }}/>
        <Typography variant='h6'>{water} ml</Typography>
      </Grid>
      <Grid item justifySelf="end" xs={3}>
        <Typography>+ 250 ml</Typography>        
      </Grid>
      <Grid item xs={1}>
        <AddCircleIcon fontSize="large" color="primary" sx={{ mt: 1, cursor: 'pointer' }}
          onClick={AddWaterHandler}/>        
      </Grid>
    </Grid>
  );
}