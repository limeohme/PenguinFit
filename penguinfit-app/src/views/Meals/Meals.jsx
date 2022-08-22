import { Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ACTIVITIES_REQUEST_LIMIT, MEAL_TYPES } from '../../common/constants';
import { BarCaloriesByMeal } from '../../components/BarCharts/BarCharts';
import MealForm from '../../components/MealForm/MealForm';
import { PieMealsDistribution } from '../../components/PieCharts/PieCharts';
import SingleMeal from '../../components/SingleMeal/SingleMeal';
import AppState from '../../providers/app-state';
import { getMealByType, getMealCalsByType, getRecentMeals } from '../../services/meals-service';
import { addMealToDB, updateDailyCalsGetter, updateDailyCalsUpdater, updateUserNutrients } from '../../services/meals-service';
import { formatDateToString } from '../../utils/utils';

function Meals () {

  const { appState:{ user } } = useContext(AppState);
  const [meals, setMeals] = useState([]);
  const [calData, setCalData] = useState([]);
  const [typeData, setTypeData] = useState([]);

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

  const addMealHandler = (newMeal) => {
    addMealToDB(user.username, { ...newMeal, createdOn: formatDateToString(new Date()), dateVal: Date.parse(formatDateToString(new Date())) });
    setMeals([...meals, { ...newMeal, createdOn: formatDateToString(new Date()), dateVal: Date.parse(formatDateToString(new Date())) } ]);
    newMeal.foods.forEach((food) => {
      updateDailyCalsGetter(user.username)
        .then((snapshot) => updateDailyCalsUpdater(snapshot, user.username, food.cal).catch(console.error));
      updateUserNutrients(user.username, food.nutrients.protein, food.nutrients.carbs, food.nutrients.fats).catch(console.error);
    });
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
              <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff75', height: '400px', m: '2rem' }}>
                <Typography variant='h4' >No data here yet...🥺 </Typography> </Grid>
            }
            {meals.length? <PieMealsDistribution meals={typeData}/> : 
              <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff75', height: '400px', m: '2rem' }}>
                <Typography variant='h4' >No data here yet...🥺 </Typography> </Grid>}
          </Grid>
          {/* <Grid container item spacing={4}>            
            
            {meals.length? <PieNutrientsDistribution/> : 
              <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff75', height: '400px',  m: '2rem' }}>
                <Typography variant='h4' >No data here yet...🥺</Typography></Grid>}
          </Grid> */}
        </Grid>
        
      </Grid>
      
    </Grid>
  );
}

export default Meals;