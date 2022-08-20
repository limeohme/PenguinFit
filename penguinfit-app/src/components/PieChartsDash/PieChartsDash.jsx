import { VictoryPie, VictoryLabel } from 'victory';
import { Typography, Grid } from '@mui/material';
import * as style from './PieChartsDashStyles.js';
import { getGoalsDistribution, getNutrientDistribution } from '../../services/dashboard-service.js';
import { useEffect, useState } from 'react';



export function PieGoalAchievement () {
  const [nutrients, setNutrients] = useState([]);

  useEffect(() => {
    getNutrientDistribution().then((res) => setNutrients(res), console.error);
  }, []);
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

export function PieNutrientsDistribution () {
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    getGoalsDistribution().then((res) => setGoals(res), console.error);
  }, []);

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