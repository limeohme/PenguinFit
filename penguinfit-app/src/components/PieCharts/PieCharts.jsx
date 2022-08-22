import { VictoryPie, VictoryLabel } from 'victory';
import { Typography, Grid } from '@mui/material';
import * as style from './PieChartsStyles.js';

export function PieNutrientsDistribution ({ nutrients }) {
  

  return (
    <Grid item xs={12} sm={12} md={6} sx={style.pieChartStyle}>
      <VictoryPie
        labelRadius={({ innerRadius }) => innerRadius + 15 }
        animate={{
          duration: 2000,
          easing: 'bounce',
          onEnter: {

          }
        }}
        colorScale={['#f2c324', '#c5e1a5', '#5c6bc0' ]}
        innerRadius={60}
        data={nutrients}
        labels={({ datum }) => datum.x}
        labelComponent={<VictoryLabel angle={5} style={{ fill: 'navy' }}/> }
      />
      <Typography sx={style.chartNamesStyle} variant='h7'>nutrients distribution %</Typography>
    </Grid>
  );
}
export function PieMealsDistribution ({ meals }) {
  

  return (
    <Grid item xs={12} sm={12} md={6} sx={style.pieChartStyle}>
      <Typography variant='h5'>meals by type %</Typography>
      <VictoryPie
        labelRadius={({ innerRadius }) => innerRadius + 24 }
        animate={{
          duration: 2000,
          easing: 'bounce',
          onEnter: {

          }
        }}
        colorScale={['#a3e2f7', '#8dc4d6', '#729fad', '#3c6f80', '#2a5d6e', '#0e4152', '#042b38' ]}
        innerRadius={60}
        data={meals}
        labels={({ datum }) => datum.y > 80?  datum.x : ''}
        labelComponent={<VictoryLabel angle={5} style={{ fill: '#FFF' }}/> }
      />
    </Grid>
  );
}

export function PieGoalAchievement ({ goals }) {

  return (
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
        colorScale={['#c5e1a5', '#f2c324', '#5c6bc0' ]}
        innerRadius={60}
        data={goals}
        labels={({ datum }) => datum.x}
        labelComponent={<VictoryLabel angle={5} style={{ fill: 'navy' }}/> }
      />
      <Typography sx={style.chartNamesStyle} variant='h7'>goal achievement %</Typography>
    </Grid>
  );
}