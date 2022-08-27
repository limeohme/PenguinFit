import { Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { MEAL_TYPES } from '../../common/constants';
import { BarCalorieIntake, BarCaloriesByMeal } from '../../components/DataVisualisationComponents/BarCharts/BarCharts';
import MealForm from '../../components/FormsComponents/CreateMealForm/CreateMealForm';
// import { PieMealsDistribution } from '../../components/DataVisualisationComponents/PieCharts/PieCharts';
import SingleMeal from '../../components/SingleViewComponent/SingleMeal/SingleMeal';
import AppState from '../../providers/app-state';
import { getMealByType, getMealCalsByType, getRecentMeals } from '../../services/meals-service';
import { addMealToDB, updateDailyCalsGetter, updateDailyCalsUpdater, updateUserNutrients } from '../../services/meals-service';
import { formatDateToString } from '../../utils/utils';
import { updateDailyWaterGetter, updateDailyWaterUpdater } from '../../services/meals-service';
import { getStatsToday } from '../../services/dashboard-service';
import NoDataYet from '../../components/NoDataYet/NoDataYet';
import AddWater from '../../components/AddWater/AddWater';

function Meals () {

  const { appState:{ user } } = useContext(AppState);
  const [meals, setMeals] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [water, setWater] = useState(0);
  const [maxima, setMaxima] = useState([]);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const allTypes = [];
    const allCals = [];
    MEAL_TYPES.forEach((mealT) => allCals.push({ x: mealT, y: getMealCalsByType(meals, mealT) }));

    MEAL_TYPES.forEach((mealT) => allTypes.push({ x: mealT, y: getMealByType(meals, mealT) }));
    setTypeData([allTypes, allCals]);

    setMaxima([allTypes, allCals].map(
      (dataset) => Math.max(...dataset.map((d) => d.y))
    ));


  }, [meals]);

  useEffect(() => {
    const unsub = getRecentMeals(user.username, (snapshot) => {
      if (snapshot.exists()) {
        setMeals([...Object.values(snapshot.val())]);
        meals.length - 7 > 7? setVisible(meals.length - 7) : setVisible(0);
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
          <Grid item container  justifyContent="center" direction="column">
            {meals.length? 
              <BarCaloriesByMeal data={typeData} maxima={maxima}/> :
              <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                flexDirection: 'column', height: '400px', my: '2rem' }}>
                <NoDataYet/>  
              </Grid>
            }
            {meals.length? <BarCalorieIntake/> : 
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