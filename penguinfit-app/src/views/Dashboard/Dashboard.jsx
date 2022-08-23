import { Typography, Grid } from '@mui/material';
import * as style from './DashboardStyles.js';
import { formatDateToString } from '../../utils/utils.js';
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
import { BarActivityDurationByDay, BarCalorieBalanceByDay } from '../../components/DataVisualisationComponents/BarCharts/BarCharts.jsx';
import { PieGoalAchievement, PieNutrientsDistribution } from '../../components/DataVisualisationComponents/PieCharts/PieCharts.jsx';
import StatsCardsDash from '../../components/SingleViewComponent/StatsCardDash/StatsCardDash.jsx';
import NoDataYet from '../../components/NoDataYet/NoDataYet.jsx';

function Dashboard () {

  const { appState, _setState } = useContext(AppState);
  const [water, setWater] = useState(0);
  const [date, setDate] = useState();
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
    setInterval(() => {
      const newDate = new Date();
      setDate(newDate);
    }, 1000);
  }, []);

  useEffect(() => {
    const unsub =  getStatsToday(appState.user.username, (snapshot) => {
      if (snapshot.exists()) setWater(Object.values(snapshot.val())[0].waterIntake);
    });
    return unsub;
  });

  return (
    // outer container
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={style.containerStyle}>
      {/* left half*/}
      <Grid item xs sx={style.midiContainerStyle}>
        
        <Grid item xs>
          <Typography sx={{ ...style.salutationStyle, color: '#000000' }} variant='h4'>Hello, </Typography>
          <Typography sx={style.salutationStyle} variant='h4'>{appState.user.username}</Typography>
        </Grid>
        
        {/* three cards box*/}
        <Grid container direction="row" sx={style.cardsContainerStyle}>
          <Grid item xs={4}><StatsCardsDash type={'cals'} IconComponent={LunchDiningIcon} /></Grid>
          <Grid item xs={4}><StatsCardsDash type={'water'} IconComponent={LocalDrinkIcon} water={water}/></Grid>
          <Grid item xs={4}><StatsCardsDash type={'steps'} IconComponent={DirectionsWalkIcon} /></Grid>
        </Grid>
        <BarActivityDurationByDay/>
      </Grid>
      {/* right half*/}
      <Grid item xs sx={style.midiContainerStyle}>
        <Grid item xs>
          <Typography sx={style.dateStyle} variant='h5'>{date? formatDateToString(date): ''}</Typography>
        </Grid>
        <Grid container direction='row-reverse' sx={style.piessContainerStyle}>      
          {goals.length? 
            <PieGoalAchievement goals={goals}/> :
            <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
              flexDirection: 'column', height: '400px', m: '2rem' }}>              
              <NoDataYet/>
            </Grid>
          }
          { nutrients.length?
            <PieNutrientsDistribution nutrients={nutrients}/> :
            <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
              flexDirection: 'column', height: '400px', m: '2rem' }}>
              <NoDataYet/> 
            </Grid>
          }

        </Grid>
        {/* right chart*/}
        <BarCalorieBalanceByDay/>
      </Grid>
    </Grid>

  );
}

export default Dashboard;