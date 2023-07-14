import { Box, Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { MEAL_TYPES } from '../../common/constants';
import { AreaCalorieIntakeByDate } from '../../components/DataVisualisationComponents/AreaCharts/AreaCalorieIntakeByDate';
import { BarCaloriesAndCountByMealType, } from '../../components/DataVisualisationComponents/BarCharts/MealsBarCharts';
import MealForm from '../../components/FormsComponents/CreateMealForm/CreateMealForm';
import SingleMeal from '../../components/SingleViewComponent/SingleMeal/SingleMeal';
import AppState from '../../providers/app-state';
import { getCalorieIntakeByDate, getMealByType, getMealCalsByType, getRecentMeals } from '../../services/meals-service';
import { addMealToDB, updateDailyCalsGetter, updateDailyCalsUpdater, updateUserNutrients } from '../../services/meals-service';
import { formatDateToString } from '../../utils/utils';
import { updateDailyWaterGetter, updateDailyWaterUpdater } from '../../services/meals-service';
import { getStatsToday } from '../../services/dashboard-service';
import AddWater from '../../components/AddWater/AddWater';

function Meals () {

  const { appState: { user } } = useContext(AppState);
  const [meals, setMeals] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [water, setWater] = useState(0);
  const [maxima, setMaxima] = useState([]);
  const [visible, setVisible] = useState(0);
  const [calData, setCalData] = useState([]);
  useEffect(() => {
    getCalorieIntakeByDate(user.username).then((d) => setCalData(d)).catch(console.error);
  }, [meals, user]);

  useEffect(() => {
    const allTypes = MEAL_TYPES.map((mealT) => ({ x: mealT, y: getMealByType(meals, mealT) }));
    const allCals = MEAL_TYPES.map((mealT) => ({ x: mealT, y: getMealCalsByType(meals, mealT) }));    
    setTypeData([allTypes, allCals]);

    setMaxima([allTypes, allCals].map(
      (dataset) => Math.max(...dataset.map((d) => d.y))
    ));
  }, [meals]);

  useEffect(() => {
    const unsub = getRecentMeals(user.username, (snapshot) => {
      if (snapshot.exists()) {
        setMeals([...Object.values(snapshot.val())]);
      }
    });
    
    meals.length - 7 > 6? setVisible(meals.length - 7) : setVisible(0);
    return unsub;
  }, [user, meals.length]);

  useEffect(() => {
    const unsub = getStatsToday(user.username, (snapshot) => {
      if (snapshot.exists()) {
        setWater(Object.values(snapshot.val())[0].waterIntake);
      }
    } );

    return unsub;
  }, [user.username]);

  const addMealHandler = (newMeal) => {
    const theDate = formatDateToString(new Date());
    addMealToDB(user.username, { ...newMeal, createdOn: theDate, dateVal: Date.parse(theDate) });
    setMeals([...meals, { ...newMeal, createdOn: theDate, dateVal: Date.parse(theDate) } ]);
    updateDailyCalsGetter(user.username)
      .then((snapshot) => updateDailyCalsUpdater(snapshot, user.username, newMeal.cal).catch(console.error))
      .catch(console.error);
    
    updateUserNutrients(user.username, newMeal.foods).catch(console.error);

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
        <Grid item>
          <Typography variant='h5' sx={{ pb:2 }}>Add water:</Typography>
          <Paper sx={{ backgroundColor: '#ffffff75' }}>
            <AddWater water={water} AddWaterHandler={AddWaterHandler}></AddWater>
          </Paper>
        </Grid>
        <Grid container item direction="column">
          <Typography variant='h5' sx={{ pb:2 }}>Recent meals:</Typography>
          
          <Grid container item direction="column-reverse" gap={1.5} justifyContent='center'>
            {meals.length
              ? meals.slice(visible).map((meal, i)=> <SingleMeal key={i} addMealHandler={addMealHandler} meal={meal}></SingleMeal>) 
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
          <Grid item container  justifyContent="center" direction="column" gap={4}>
            <Paper sx={{ height: '480px', backgroundColor: '#ffffff75', p: 1 }}>
              <Box>
                <Typography sx={{ fontSize: 15 }}> meal count/average calorie intake by meal type </Typography>
                <Typography sx={{ fontSize: 10 }}> (last 21 meals) </Typography>
              </Box>              
              <BarCaloriesAndCountByMealType data={typeData} maxima={maxima}/>             
            </Paper>
            <Paper sx={{ height: '480px', backgroundColor: '#ffffff75', p: 1 }}>
              <Box>
                <Typography sx={{ fontSize: 15 }}> average calorie intake in kcal </Typography>
                <Typography sx={{ fontSize: 10 }}> (last 14 days) </Typography>
              </Box>
              <AreaCalorieIntakeByDate data={calData}/>
            </Paper>
          </Grid>
        </Grid>
        
      </Grid>
      
    </Grid>
  );
}

export default Meals;