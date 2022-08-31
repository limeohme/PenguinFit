import {  Grid, Paper, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomTooltip from '../../CustomTooltip/CustomTooltip';

export default function SingleMeal({ addMealHandler, meal }) {
 
  

  return (
    <Paper sx={{ display: 'flex' , backgroundColor: '#ffffff75', p: 2, minHeight: '14em' }}>

      <Grid container direction='column' spacing={1} justifyContent='space-between' alignItems='center'>
        <Grid item container spacing={2} justifyContent='space-between' alignItems='center'>
          <Grid item xs={4} sm={4}><Typography variant='h5'>{meal.title}</Typography></Grid>
          <Grid item xs={4} sm={4}><Typography sx={{ color:'#00000050' }}>{meal.type}</Typography></Grid>
          <Grid item xs={4} sm={4}> <Typography sx={{ textAlign:'right' }}>{meal.createdOn}</Typography></Grid>
        </Grid>

        <Grid item container direction="row" spacing={2} justifyContent='left' alignItems='center' sx={{ color:'#00000050' }}>
          <Grid item xs={6} sm={6}>
            <Typography>{meal.foods.map((el) =>  `${el.foodItem} |`).join(' ')}</Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={2} justifyContent='space-between' alignItems='center'>
          <Grid item xs={6} sm={6}>
            <Typography variant='h6'>{`${meal.cal.toFixed(2)} kcal`}</Typography>
          </Grid>
          <Grid item container xs={6} sm={6} justifyContent='center'>
            <CustomTooltip title="re-log" arrow>
              <AddCircleIcon variant="contained" color="primary" fontSize="large" sx={{ ml:'auto', cursor: 'pointer' }} onClick={() => addMealHandler(meal)} />
            </CustomTooltip>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

}