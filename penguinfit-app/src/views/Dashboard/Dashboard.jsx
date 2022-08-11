import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { Box, Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import * as style from './DashboardStyles.js';
import { formatDateToString } from '../../utils/utils.js';

function Dashboard () {
  return (
    // outer container
    <Container sx={style.containerStyle}>
      {/* left half*/}
      <Container sx={style.midiContainerStyle}>
        <Typography sx={style.salutationStyle} variant='h4'>Hello, BabyPenguin78!</Typography>
        {/* three cards box*/}
        <Box sx={style.cardsContainerStyle}>
          <Card sx={style.cardsStyle}>
            <CardContent>
              <Typography sx={{ align: 'center' }} variant="h5" component="div">
                {`🍕\n${300}\nkcal`}
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
          <Card sx={style.cardsStyle}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
          be-nev-o-lent
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
          <Card sx={style.cardsStyle}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
          be-nev-o-lent
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Box>
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
              axisLabel: { fontSize: 16, padding: 35 },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 15, padding: 0, fill: '#000000' }
            }} crossAxis />
            <VictoryBar
              barRatio={0.7}
              style={{
                
                data: {
                  fill: ({ datum }) => datum.x === 3 ? '#000000' : '#5c6bc0',
                  stroke: ({ index }) => +index % 2 === 0  ? '#000000' : '#5c6bc0',
                  fillOpacity: 0.7,
                  strokeWidth: 3
                },
                labels: {
                  fontSize: 15,
                  fill: ({ datum }) => datum.x === 3 ? '#000000' : '#5c6bc0'
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
      </Container>
      {/* right half*/}
      <Container sx={style.midiContainerStyle}>
        <Typography sx={style.dateStyle} variant='h5'>{formatDateToString(new Date())}</Typography>
        <Box sx={style.piessContainerStyle}>
          <Box sx={style.pieChartStyle}>
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
          </Box>
          <Box sx={style.pieChartStyle}>
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
          </Box>
        </Box>
        {/* right chart*/}
        <Box sx={style.barChartStyle}>
          <VictoryChart domainPadding={{ x: 4 }} minDomain={{ x: 0,  y: -200 }}>
            <VictoryAxis style={{
              axis: { stroke: '#c5e1a5', padding: 5 },
            }}
            dependentAxis />
            <VictoryAxis label={'May 2021'}  style={{
              axis: { stroke: '#c5e1a5', padding: 5 },
              axisLabel: { fontSize: 16, padding: 170 },
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
                  stroke: ({ index }) => +index % 2 === 0  ? '#000000' : '#c5e1a5',
                  fillOpacity: 0.7,
                  strokeWidth: 3
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
      </Container>
    </Container>

  );
}

export default Dashboard;