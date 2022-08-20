import { Grid, Paper, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { ACTIVITIES_REQUEST_LIMIT } from '../../common/constants';
import MealForm from '../../components/MealForm/MealForm';
import SingleMeal from '../../components/SingleMeal/SingleMeal';
import AppState from '../../providers/app-state';


function Meals () {

  const [meals, _setMeals] = useState([{ title: 'Breakfast', cal: 320, foods: [{ name:'tomatoes' }, { name: 'bread' }], createdOn: new Date() }]);
  const { appState:{ _user } } = useContext(AppState);



  return(
    <Grid
      container
      direction="row"
      justifyContent="left"
      alignItems="left"
      sx={{ p:3 }}
      spacing={4}
    >
      <Grid container item direction="column" gap={4} xs={12} sm={5.5}>
        <Grid item>
          <Typography variant='h5' sx={{ pb:2 }}>New meal:</Typography>
          {/* <Divider></Divider> */}
          <Paper sx={{ backgroundColor: '#ffffff75' }}>
            <MealForm></MealForm>
          </Paper>
        </Grid>
        <Grid container item direction="column">
          <Typography variant='h5' sx={{ pb:2 }}>Recent meals:</Typography>
          
          <Grid container item direction="column-reverse" gap={1.5} justifyContent='center'>
            {meals.length
              ? meals.map((meal, i)=> <SingleMeal key={i} meal={meal}></SingleMeal>) 
              : 'No meals yet'}
          </Grid>

          {/* <SingleActivityView></SingleActivityView>
          <SingleActivityView></SingleActivityView>
          <SingleActivityView></SingleActivityView>
          <SingleActivityView></SingleActivityView> */}
          
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6.5}>
        <Typography variant='h5' sx={{ pb:2 }}>Statistics:</Typography>
        {/* <DetailedGoalsStepper steps={ steps }></DetailedGoalsStepper> */}
        <Grid 
          container
          item
          direction="column"
          justifyContent="left"
          alignItems="left"
          gap={4}
        //   sx={{ p:4 }}
        //   spacing={4}
        >
          <Grid item>
            <Paper sx={{ height: '400px', backgroundColor: '#ffffff75' }}>
                graphic
            </Paper>
          </Grid>
          <Grid container item spacing={4}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ height: '300px', backgroundColor: '#ffffff75' }}>
                graphic
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ height: '300px', backgroundColor: '#ffffff75' }}>
                graphic
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
      
    </Grid>
  );
}

export default Meals;