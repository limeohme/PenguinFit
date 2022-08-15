import {  VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { Box } from '@mui/material';
import * as style from './BarChartsDashStyles.js';
import { getCalorieDifferenceByDate, getExerciseDurationByDate } from '../../views/Dashboard/DashMockData';

export function BarActivityDurationByDay () {
  return (

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
  );
}

export function BarCalorieBalanceByDay () {

  return (
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
  );
}