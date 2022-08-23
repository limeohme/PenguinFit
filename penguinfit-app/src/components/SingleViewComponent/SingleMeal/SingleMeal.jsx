import { Button, Grid, Paper, Typography } from '@mui/material';
import { useContext } from 'react';
import AppState from '../../../providers/app-state';


export default function SingleMeal({ addMealHandler, meal }) {
  const { appState:{ _user } } = useContext(AppState);
  

  return (
    <Paper sx={{ display: 'flex' , backgroundColor: '#6633ff10', p: 2 }}>

      <Grid container direction='column' spacing={1} justifyContent='space-between' alignItems='center'>
        <Grid item container spacing={2} justifyContent='space-between' alignItems='center'>
          <Grid item xs={6} sm={6} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

            <Typography variant='h5'>{meal.title}</Typography>
            <Typography variant='h6' sx={{ color:'#00000050', px: '0.6em' }}>{meal.type}</Typography>
           
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography sx={{ textAlign:'right' }}>{meal.createdOn}</Typography>
          </Grid>
        </Grid>

        <Grid item container direction="row" spacing={2} justifyContent='left' alignItems='center' sx={{ color:'#00000050' }}>
          <Grid item xs={6} sm={6}>
            <Typography>{meal.foods.map((el) =>  `${el.foodItem} |`).join(' ')}</Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={2} justifyContent='space-between' alignItems='center' sx={{ color:'#00000050' }}>
          <Grid item xs={6} sm={6}>
            <Typography>{`${meal.cal.toFixed(2)} kcal`}</Typography>
          </Grid>
          <Grid item container xs={6} sm={6} justifyContent='center'>
            <Button variant="text" color="primary" size='small' sx={{ ml:'auto' }} onClick={() => addMealHandler(meal)}>ADD</Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

}