import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { Box, Card, CardActions, CardContent, Typography, Grid } from '@mui/material';
import * as style from './DashboardStyles.js';
import { formatDateToString } from '../../utils/utils.js';
import { useContext } from 'react';
import AppState from '../../providers/app-state.js';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

function Dashboard () {

  const { appState, _setState } = useContext(AppState);

  return (
    // outer container
    <Grid container spacing={2} xs={12} direction="row" justifyContent="center" alignItems="center" sx={style.containerStyle}>
      {/* left half*/}
      <Grid item xs sx={style.midiContainerStyle}>
        
        <Grid item xs sx={{ alignSelf: 'center' }}>
          <Typography sx={{ ...style.salutationStyle, color: '#000000' }} variant='h4'>Hello, </Typography>
          <Typography sx={style.salutationStyle} variant='h4'>{appState.user.username}</Typography>
        </Grid>
        {/* three cards box*/}
        <Grid container xs={12} direction="row" sx={style.cardsContainerStyle}>
          <Card sx={style.cardsStyle}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
              <LunchDiningIcon sx={style.iconsStyle} />
              <Typography sx={{ alignSelf: 'center', my: '1rem' }} variant="h4" component="div">300 kcal</Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
          <Card sx={style.cardsStyle}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
              <LocalDrinkIcon sx={style.iconsStyle}></LocalDrinkIcon>
              <Typography sx={{ alignSelf: 'center', my: '1rem' }} variant="h4" component="div">3 L</Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
          <Card sx={style.cardsStyle}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
              <DirectionsWalkIcon sx={style.iconsStyle} />
              <Typography sx={{ alignSelf: 'center', my: '1rem' }} variant="h4" component="div">8654</Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
        </Grid>
        {/* left chart*/}
        <Box sx={style.barChartStyle}>
          <VictoryChart minDomain={{ x: 0, y: 0 }} style={{ padding: 10, width: 'fit-content' }}>
            <VictoryAxis label={'minutes in exercise'}  style={{
              axis: { stroke: '#5c6bc0', padding: 5 },
              axisLabel: { fontSize: 16, padding: 35 },
              grid: { stroke: '#5c6bc0' },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 15, padding: 0, fill: '#000000' }
            }}
            dependentAxis />
            <VictoryAxis label={'May 2021'}  style={{
              axis: { stroke: '#5c6bc0', padding: 5 },
              axisLabel: { fontSize: 16, padding: -240 },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 15, padding: 0, fill: '#000000' }
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
                  fontSize: 15,
                  fill: ({ datum }) => datum.x === 3 ? '#000000' : '#5c6bc0',
                }
              }}
              data={[
                { x: new Date(2021, 5, 1).getDate(), y: 8 },
                { x: new Date(2021, 5, 2).getDate(), y: 100 },
                { x: new Date(2021, 5, 3).getDate(), y: 70 },
                { x: new Date(2021, 5, 4).getDate(), y: 40 },
                { x: new Date(2021, 5, 7).getDate(), y: 60 },
                { x: new Date(2021, 5, 8).getDate(), y: 300 },
                { x: new Date(2021, 5, 9).getDate(), y: 7 },
                { x: new Date(2021, 5, 10).getDate(), y: 9 },
                { x: new Date(2021, 5, 11).getDate(), y: 6 }
              ]}
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
        <Grid item xs sx={{ alignSelf: 'center', }}><Typography sx={style.dateStyle} variant='h5'>{formatDateToString(new Date())}</Typography></Grid>
        <Grid container direction='row-reverse' xs sx={style.piessContainerStyle}>
          <Grid item xs sm sx={style.pieChartStyle}>
            <VictoryPie
              labelRadius={({ innerRadius }) => innerRadius + 15 }
              animate={{
                duration: 2000,
                easing: 'bounce',
                onLoad: {
                  duration: 2000,
                  before: () => ({ _y: -50 }),
                  after: (datum) => ({ _y: datum._y })
                } }}
              colorScale={['gold', 'pink', 'navy' ]}
              innerRadius={60}
              data={[
                { x: 'Achieved', y: 60 },
                { x: 'Not yet', y: 40 },
              ]}
              labels={({ datum }) => datum.x}
              labelComponent={<VictoryLabel angle={5} style={{ fill: 'navy' }}/> }
            />
            <Typography sx={style.chartNamesStyle} variant='h7'>nutrients distribution %</Typography>
          </Grid>
          <Grid item xs sm sx={style.pieChartStyle}>
            <VictoryPie
              labelRadius={({ innerRadius }) => innerRadius + 15 }
              animate={{
                duration: 2000,
                easing: 'bounce',
                onLoad: {
                  duration: 2000,
                  before: () => ({ _y: -50 }),
                  after: (datum) => ({ _y: datum._y })
                } }}
              colorScale={['gold', 'pink', 'navy' ]}
              innerRadius={60}
              data={[
                { x: 'Achieved', y: 60 },
                { x: 'Not yet', y: 40 },
              ]}
              labels={({ datum }) => datum.x}
              labelComponent={<VictoryLabel angle={5} style={{ fill: 'navy' }}/> }
            />
            <Typography sx={style.chartNamesStyle} variant='h7'>goal achievement %</Typography>
          </Grid>
        </Grid>
        {/* right chart*/}
        <Box sx={style.barChartStyle}>
          <VictoryChart domainPadding={{ x: 4 }} minDomain={{ x: 0,  y: -200 }}>
            <VictoryAxis style={{
              axis: { stroke: '#c5e1a5', padding: 5 },
            }}
            dependentAxis />
            <VictoryAxis label={'May 2021'}  style={{
              axis: { stroke: '#c5e1a5', padding: 5 },
              axisLabel: { fontSize: 16, padding: -100 },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 15, padding: 0, fill: '#000000' }
            }} crossAxis />
            <VictoryBar
              barRatio={0.8}
              // eslint-disable-next-line quotes
              labels={ ({ datum }) => datum.y + `\nkcal`}
              style={{
                data: {
                  fill: ({ datum }) => datum.y < 0 ? '#000000' : '#c5e1a5',
                  stroke: ({ datum }) => datum.y < 0 ? '#000000' : '#c5e1a5',
                  fillOpacity: 0.7,
                  strokeWidth: 1
                },
                labels: {
                  fontSize: 15,
                  fill:'#000000'
                }
              }}
              data={[
                { x: new Date(2021, 5, 1).getDate(), y: 8 },
                { x: new Date(2021, 5, 2).getDate(), y: 100 },
                { x: new Date(2021, 5, 3).getDate(), y: 70 },
                { x: new Date(2021, 5, 4).getDate(), y: 40 },
                { x: new Date(2021, 5, 7).getDate(), y: -60 },
                { x: new Date(2021, 5, 8).getDate(), y: -300 },
                { x: new Date(2021, 5, 9).getDate(), y: 7 },
                { x: new Date(2021, 5, 10).getDate(), y: 9 },
                { x: new Date(2021, 5, 11).getDate(), y: 6 }
              ]}
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
    </Grid>

  );
}

export default Dashboard;