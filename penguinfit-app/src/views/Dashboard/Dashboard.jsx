import { Typography, Grid } from '@mui/material';
import * as style from './DashboardStyles.js';
import { formatDateToString } from '../../utils/utils.js';
import { useContext } from 'react';
import AppState from '../../providers/app-state.js';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import {
  getWaterToday
} from '../../services/dashboard-service.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { BarActivityDurationByDay, BarCalorieBalanceByDay } from '../../components/BarChartsDash/BarChartsDash.jsx';
import { PieGoalAchievement, PieNutrientsDistribution } from '../../components/PieChartsDash/PieChartsDash.jsx';
import StatsCardsDash from '../../components/StatsCardDash/StatsCardDash.jsx';

function Dashboard () {

  const { appState, _setState } = useContext(AppState);
  const [water, setWater] = useState(0);
  const [date, setDate] = useState();

  useEffect(() => {
    setInterval(() => {
      const newDate = new Date();
      setDate(newDate);
    }, 1000);
  }, []);

  useEffect(() => {
    getWaterToday().then((res) => setWater(res)).catch(console.error);
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
          <PieGoalAchievement/>
          <PieNutrientsDistribution/>
        </Grid>
        {/* right chart*/}
        <BarCalorieBalanceByDay/>
      </Grid>
    </Grid>

  );
}

export default Dashboard;