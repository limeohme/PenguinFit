import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { Box, Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import * as style from './DashboardStyles.js';
import { formatDateToString } from '../../utils/utils.js';

function Statistics () {
  return (
    // outer container
    <Container sx={style.containerStyle}>
      {/* left half*/}
      <Container sx={style.midiContainerStyle}>
        <Typography variant='h4'>Hello, BabyPenguin78!</Typography>
        {/* three cards box*/}
        <Box sx={style.cardsContainerStyle}>
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
          <VictoryChart domainPadding={{ x: 4 }} minDomain={{ x: 0, y: -200 }}>
            <VictoryAxis dependentAxis />
            <VictoryAxis crossAxis />
            <VictoryBar
              barRatio={0.7}
              style={{
                data: { fill: '#c43a31' }
              }}
              data={[
                { x: 'Achieved5', y: 60 },
                { x: 'Not yet1', y: -140 },
                { x: 'Not yet11', y: 400 },
                { x: 'Not ye11t', y: 40 },
                { x: 'Not y11et', y: 40 },
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
        <Typography variant='h5'>{formatDateToString(new Date())}</Typography>
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
            <Typography variant='h6'>nutrients distribution %</Typography>
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
            <Typography variant='h6'>goal achievement %</Typography>
          </Box>
        </Box>
        {/* right chart*/}
        <Box sx={style.barChartStyle}>
          <VictoryChart domainPadding={{ x: 4 }} minDomain={{ x: 0, y: -200 }}>
            <VictoryAxis dependentAxis />
            <VictoryAxis crossAxis />
            <VictoryBar
              barRatio={0.7}
              style={{
                data: { fill: '#c43a31' }
              }}
              data={[
                { x: 'Achieved5', y: 60 },
                { x: 'Not yet1', y: -140 },
                { x: 'Not yet11', y: 400 },
                { x: 'Not ye11t', y: 40 },
                { x: 'Not y11et', y: 40 },
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

export default Statistics;