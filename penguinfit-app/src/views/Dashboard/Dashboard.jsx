import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { Box, Card, CardActions, CardContent, Typography, Grid, Button } from '@mui/material';
import * as style from './DashboardStyles.js';
import { formatDateToString } from '../../utils/utils.js';
import { useContext } from 'react';
import AppState from '../../providers/app-state.js';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import {
  addWater,
  getCalorieDifferenceByDate, getCaloriesToday, getExerciseDurationByDate,
  getGoalsDistribution, getNutrientDistribution, getStepsToday, getWaterToday
} from './DashMockData.js';
import { useState } from 'react';
import { useEffect } from 'react';

function Dashboard () {

  const [water, setWater] = useState(getWaterToday('BabyPenguin78'));
  const [date, setDate] = useState();

  useEffect(() => {
    setInterval(() => {
      const newDate = new Date();
      setDate(newDate);
    }, 1000);
  }, []);

  const { appState, _setState } = useContext(AppState);

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

          <Card sx={style.cardsStyle}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
              <LunchDiningIcon sx={style.iconsStyle} />
              <Typography sx={{ alignSelf: 'center', my: '1rem' }} variant="h5" component="div">{`${getCaloriesToday('BabyPenguin78')} kcal`}</Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
          <Card sx={style.cardsStyle}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
              <LocalDrinkIcon sx={style.iconsStyle}></LocalDrinkIcon>
              <Typography sx={{ alignSelf: 'center', my: '1rem' }} variant="h5" component="div">{`${water} ml`}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
              <Button size='small' onClick={() =>{ addWater('BabyPenguin78'); setWater(water + 250);}}>+</Button>             
            </CardActions>
          </Card>
          <Card sx={style.cardsStyle}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
              <DirectionsWalkIcon sx={style.iconsStyle} />
              <Typography sx={{ alignSelf: 'center', my: '1rem' }} variant="h5" component="div">{getStepsToday('BabyPenguin78')}</Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
        {/* left chart*/}
        <Box sx={style.barChartStyle}>
          <VictoryChart minDomain={{ x: 0, y: 0 }} style={{ padding: 10, width: 'fit-content' }}>
            <VictoryAxis label={'minutes in activities'}  style={{
              axis: { stroke: '#5c6bc0', padding: 5 },
              axisLabel: { fontSize: 12, padding: 35 },
              grid: { stroke: '#5c6bc0' },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
            }}
            dependentAxis />
            <VictoryAxis label={'minutes spent in activities by day,\n\nAugust 2022'}  style={{
              axis: { stroke: '#5c6bc0', padding: 5 },
              axisLabel: { fontSize: 12, padding: -240 },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 12, padding: 0, fill: '#000000' }
            }} crossAxis />
            <VictoryBar
              barRatio={0.7}
              style={{
                
                data: {
                  fill: ({ datum }) => datum.y < 30 ? '#000000' : '#5c6bc0',
                  stroke: ({ datum }) => datum.y < 30 ? '#000000' : '#5c6bc0',
                  fillOpacity: 0.7,
                  strokeWidth: 1
                },
                labels: {
                  fontSize: 12,
                  fill: ({ datum }) => datum.x === 3 ? '#000000' : '#5c6bc0',
                }
              }}
              data={getExerciseDurationByDate('BabyPenguin78')}
              animate={{
                duration: 2000,
                easing: 'bounce',
                onLoad: {
                  duration: 2000,
                  before: () => ({ _y: -50 }),
                  after: (datum) => ({ _y: datum._y })
                } }}
            />
          </VictoryChart>
        </Box>
      </Grid>
      {/* right half*/}
      <Grid item xs sx={style.midiContainerStyle}>
        <Grid item xs>
          <Typography sx={style.dateStyle} variant='h5'>{date? formatDateToString(date): ''}</Typography>
        </Grid>
        <Grid container direction='row-reverse' sx={style.piessContainerStyle}>
          <Grid item xs={12} sm={12} md={6} sx={style.pieChartStyle}>
            <VictoryPie
              labelRadius={({ innerRadius }) => innerRadius + 15 }
              animate={{
                duration: 2000,
                easing: 'bounce',
                onEnter: {

                }
              }}
              colorScale={['gold', 'pink', '#5c6bc0' ]}
              innerRadius={60}
              data={getNutrientDistribution('BabyPenguin78')}
              labels={({ datum }) => datum.x}
              labelComponent={<VictoryLabel angle={5} style={{ fill: 'navy' }}/> }
            />
            <Typography sx={style.chartNamesStyle} variant='h7'>nutrients distribution %</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} sx={style.pieChartStyle}>
            <VictoryPie
              labelRadius={({ innerRadius }) => innerRadius + 15 }
              animate={{
                duration: 2000,
                easing: 'circle',
                onLoad: {
                  duration: 2000,
                  before: () => ({ _y: -50 }),
                  after: (datum) => ({ _y: datum._y })
                } }}
              colorScale={['#c5e1a5', 'gold', '#5c6bc0' ]}
              innerRadius={60}
              data={getGoalsDistribution('BabyPenguin78')}
              labels={({ datum }) => datum.x}
              labelComponent={<VictoryLabel angle={5} style={{ fill: 'navy' }}/> }
            />
            <Typography sx={style.chartNamesStyle} variant='h7'>goal achievement %</Typography>
          </Grid>
        </Grid>
        {/* right chart*/}
        <Box sx={style.barChartStyle}>
          <VictoryChart domainPadding={{ x: 4 }} minDomain={{ x: 0,  y: -1000 }}>
            <VictoryAxis style={{
              axis: { stroke: '#c5e1a5', padding: 5 },
              axisLabel: { fontSize: 12, padding: 100 },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
            }}
            dependentAxis />
            <VictoryAxis label={'calorie balance by day,\nAugust 2022'}  style={{
              axis: { stroke: '#c5e1a5', padding: 5 },
              axisLabel: { fontSize: 12, padding: 100 },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 12, padding: 0, fill: '#000000' }
            }} crossAxis />
            <VictoryBar
              barRatio={0.8}
              labels={ ({ datum }) => ` ${datum.y.toFixed(0)}\nkcal`}
              style={{
                data: {
                  fill: ({ datum }) => datum.y < 0 ? '#000000' : '#c5e1a5',
                  stroke: ({ datum }) => datum.y < 0 ? '#000000' : '#c5e1a5',
                  fillOpacity: 0.7,
                  strokeWidth: 1
                },
                labels: {
                  fontSize: 12,
                  fill:'#000000'
                }
              }}
              data={getCalorieDifferenceByDate('BabyPenguin78')}
              animate={{ duration: 500 }}
            />
          </VictoryChart>
        </Box>
      </Grid>
    </Grid>

  );
}

export default Dashboard;