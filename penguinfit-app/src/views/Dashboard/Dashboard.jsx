import { Typography, Grid } from '@mui/material';
import * as style from './DashboardStyles.js';
import { useContext } from 'react';
import AppState from '../../providers/app-state.js';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import {
  getGoalsDistribution,
  getNutrientDistribution,
  getStatsToday
} from '../../services/dashboard-service.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { BarActivityDurationByDay, BarCalorieBalanceByDay } from '../../components/DataVisualisationComponents/BarCharts/DashboardBarCharts.jsx';
import { PieGoalAchievement, PieNutrientsDistribution } from '../../components/DataVisualisationComponents/PieCharts/PieCharts.jsx';
import StatsCardsDash from '../../components/SingleViewComponent/StatsCardDash/StatsCardDash.jsx';
import Clock from '../../components/Clock/Clock.jsx';

function Dashboard () {
  const { appState } = useContext(AppState);
  const [water, setWater] = useState(0);
  const [nutrients, setNutrients] = useState([]);
  const [goals, setGoals] = useState([]);
 
  useEffect(() => {
    getGoalsDistribution(appState.user.username).then((res) => { 
      if (res) setGoals(res);
    }, console.error);
  }, [appState.user.username]);

  useEffect(() => {
    getNutrientDistribution(appState.user.username).then((res) => { 
      if (res) setNutrients(res);
    }, console.error);
  }, [appState.user.username]);

  useEffect(() => {
    const unsub =  getStatsToday(appState.user.username, (snapshot) => {
      if (snapshot.exists()) setWater(Object.values(snapshot.val())[0].waterIntake);
    });
    return unsub;
  });

  return (
    // outer container
    <Grid container direction="column" alignItems="center" sx={{ p:3, mt: 3 }}>

      <Grid item container gap={1} direction="row" justifyContent="space-between"  sx={style.midiContainerStyle}> 
        <Grid item xs={12} sm={5} container direction="column" justifyContent="space-around">
          <Typography sx={{ ...style.salutationStyle, color: '#000000' }} variant='h4'>Hello, </Typography>
          <Typography sx={style.salutationStyle} variant='h4'>{appState.user.username}</Typography>
        </Grid>       
        <Grid item xs={12} sm={6}><Clock></Clock></Grid>  
      </Grid>

      <Grid item container direction="row" xs sx={style.midiContainerStyle}> 
        {/* three cards box*/}
        <Grid item xs={12} sm={6} container direction="row" sx={style.cardsContainerStyle}>
          <Grid item xs={4}><StatsCardsDash type={'cals'} IconComponent={LunchDiningIcon} /></Grid>
          <Grid item xs={4}><StatsCardsDash type={'water'} IconComponent={LocalDrinkIcon} water={water}/></Grid>
          <Grid item xs={4}><StatsCardsDash type={'steps'} IconComponent={DirectionsWalkIcon} /></Grid>
        </Grid>
        <Grid item xs={12} sm={6} container direction='row-reverse' sx={style.piessContainerStyle}>    
          <PieGoalAchievement goals={goals}/> 
          <PieNutrientsDistribution nutrients={nutrients}/> 
        </Grid>
      </Grid>

      <Grid item container direction="row" xs sx={style.midiContainerStyle}>
        <Grid item xs={12} sm={6}><BarActivityDurationByDay/></Grid>     
        <Grid item xs={12} sm={6}><BarCalorieBalanceByDay/></Grid>
      </Grid>
    </Grid>

  );
}

export default Dashboard;