import { Button, Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { MEAL_TYPES } from '../../common/constants';
import { BarCaloriesByMeal } from '../../components/DataVisualisationComponents/BarCharts/BarCharts';
import MealForm from '../../components/FormsComponents/CreateMealForm/CreateMealForm';
import { PieMealsDistribution } from '../../components/DataVisualisationComponents/PieCharts/PieCharts';
import SingleMeal from '../../components/SingleViewComponent/SingleMeal/SingleMeal';
import AppState from '../../providers/app-state';
import { getMealByType, getMealCalsByType, getRecentMeals } from '../../services/meals-service';
import { addMealToDB, updateDailyCalsGetter, updateDailyCalsUpdater, updateUserNutrients } from '../../services/meals-service';
import { formatDateToString } from '../../utils/utils';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import { updateDailyWaterGetter, updateDailyWaterUpdater } from '../../services/meals-service';
import { getStatsToday } from '../../services/dashboard-service';
import NoDataYet from '../../components/NoDataYet/NoDataYet';

function Meals () {

  const { appState:{ user } } = useContext(AppState);
  const [meals, setMeals] = useState([]);
  const [calData, setCalData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [water, setWater] = useState(0);

  useEffect(() => {
    const allTypes = [];
    MEAL_TYPES.forEach((mealT) => allTypes.push({ x: mealT, y: getMealCalsByType(meals, mealT) }));
    setCalData(allTypes);

    MEAL_TYPES.forEach((mealT) => allTypes.push({ x: mealT, y: getMealByType(meals, mealT) }));
    setTypeData(allTypes);


  }, [meals]);

  useEffect(() => {
    const unsub = getRecentMeals(user.username, (snapshot) => {
      if (snapshot.exists()) {
        setMeals([...Object.values(snapshot.val())]);
      }
    });

    return unsub;
  });

  useEffect(() => {
    getStatsToday(user.username, (snapshot) => {
      if (snapshot.exists()) {
        setWater(Object.values(snapshot.val())[0].waterIntake);
      }
    } );
  }, [user.username]);

  const addMealHandler = (newMeal) => {
    const theDate = formatDateToString(new Date());
    addMealToDB(user.username, { ...newMeal, createdOn: theDate, dateVal: Date.parse(theDate) });
    setMeals([...meals, { ...newMeal, createdOn: theDate, dateVal: Date.parse(theDate) } ]);
    updateDailyCalsGetter(user.username)
      .then((snapshot) => updateDailyCalsUpdater(snapshot, user.username, newMeal.cal).catch(console.error))
      .catch(console.error);
    newMeal.foods.forEach((food) => {
      console.log(food);
      updateUserNutrients(user.username, food.nutrients.protein, food.nutrients.carbs, food.nutrients.fats).catch(console.error);
    });
  };

  const AddWaterHandler = () => {
    updateDailyWaterGetter(user.username).then((snapshot) => {
      updateDailyWaterUpdater(snapshot, user.username).catch(console.error);
    }).catch(console.error);  
  };


  return(
    <Grid
      container
      direction="row"
      justifyContent="left"
      alignItems="left"
      sx={{ p:3, mt: 3 }}
      spacing={4}
    >
      <Grid container item direction="column"  gap={4} xs={12} sm={5.5}>
        <Grid item>
          <Typography variant='h5' sx={{ pb:2 }}>New meal:</Typography>
          <Paper sx={{ backgroundColor: '#ffffff75' }}>
            <MealForm></MealForm>
          </Paper>
        </Grid>
        <Grid container item direction="column">
          <Grid item container direction="row" gap={2} justifyContent='space-between' alignItems='center'
            sx={{ backgroundColor: '#ffffff75', mb: '1rem', p: '1rem', boxShadow: 1, }}>
            <Grid item xs={1}><LocalDrinkIcon sx={{ fontSize: '2rem' }}/></Grid>
            <Grid item xs={2}><Typography variant='h6'>Add Water</Typography></Grid>
            
            <Grid item xs={2}><Typography variant='h6'>{water} ml</Typography></Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" sx={{ boxSizing:'border-box', width: '100%' }}
                onClick={AddWaterHandler}>+ 250 ml</Button>
            
            </Grid>
          </Grid>
          <Typography variant='h5' sx={{ pb:2 }}>Recent meals:</Typography>
          
          <Grid container item direction="column-reverse" gap={1.5} justifyContent='center'>
            {meals.length
              ? meals.map((meal, i)=> <SingleMeal key={i} addMealHandler={addMealHandler} meal={meal}></SingleMeal>) 
              : 'No meals yet'}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6.5}>
        <Typography variant='h5' sx={{ pb:2 }}>Statistics:</Typography>
        <Grid 
          container
          item
          direction="column"
          justifyContent="left"
          alignItems="left"
          gap={4}
          spacing={4}
        >
          <Grid item container  justifyContent="center" direction="column">
            {meals.length? 
              <BarCaloriesByMeal data={calData}/> :
              <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                flexDirection: 'column', height: '400px', my: '2rem' }}>
                <NoDataYet/>  
              </Grid>
            }
            {meals.length? <PieMealsDistribution meals={typeData}/> : 
              <Grid item xs sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column',
                alignItems: 'center', height: '400px', my: '2rem' }}>
                <NoDataYet/>
              </Grid>}
          </Grid>
        </Grid>
        
      </Grid>
      
    </Grid>
  );
}

export default Meals;