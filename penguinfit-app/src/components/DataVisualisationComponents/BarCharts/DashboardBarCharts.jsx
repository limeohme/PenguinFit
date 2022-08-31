import {  VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { Box } from '@mui/material';
import * as style from './BarChartsStyles.js';
import { getCalorieDifferenceByDate, getExerciseDurationByDate } from '../../../services/dashboard-service.js';
import { useContext, useEffect, useState } from 'react';
import AppState from '../../../providers/app-state.js';


export function BarActivityDurationByDay () {
  const { appState:{ user } } = useContext(AppState);
  const [exerciseDuration, setExerciseDuration] = useState([]);
  
  useEffect(() => {
    getExerciseDurationByDate(user.username).then((res) => setExerciseDuration(res), console.error);
  }, [user.username]);
  
  return (
    <Box sx={style.barChartStyle}>
      <VictoryChart minDomain={{ x: 0, y: 0 }} style={{ padding: 10, width: 'fit-content' }}>
        <VictoryAxis label={'minutes in activities'}  style={{
          axis: { stroke: '#6633ff70', padding: 5 },
          axisLabel: { fontSize: 12, padding: 35 },
          grid: { stroke: '#5c6bc0' },
          ticks: { stroke: 'grey', size: 5 },
          tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
        }}
        dependentAxis />
        <VictoryAxis label={'minutes spent in activities by date,\n\nlast 14 days'}  style={{
          axis: { stroke: '#6633ff70', padding: 5 },
          axisLabel: { fontSize: 12, padding: -240 },
          ticks: { stroke: 'grey', size: 5 },
          tickLabels: { fontSize: 12, padding: 0, fill: '#000000' }
        }} crossAxis />
        <VictoryBar
          barRatio={0.7}
          style={{
        
            data: {
              fill: ({ datum }) => datum.y < 30 ? '#000000' : '#6633ff',
              stroke: ({ datum }) => datum.y < 30 ? '#000000' : '#6633ff',
              fillOpacity: 0.6,
              strokeWidth: 1
            },
            labels: {
              fontSize: 12,
              fill: ({ datum }) => datum.x === 3 ? '#000000' : '#5c6bc0',
            }
          }}
          data={exerciseDuration}
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
  const [calorieDifference, setCalorieDifference] = useState([]);
  const { appState:{ user } } = useContext(AppState);
  
  useEffect(() => {
    getCalorieDifferenceByDate(user.username).then((res) => setCalorieDifference(res), console.error);
  }, [user.username]);
  
  return (
    <Box sx={style.barChartStyle}>
      <VictoryChart domainPadding={{ x: 4 }} minDomain={{ x: 0,  }}>
        <VictoryAxis style={{
          axis: { stroke: '#6633ff', padding: 5 },
          axisLabel: { fontSize: 12, padding: 100 },
          ticks: { stroke: 'grey', size: 5 },
          tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
        }}
        dependentAxis />
        <VictoryAxis label={'calorie balance in kcal, by date,\nlast 14 days'}  style={{
          axis: { stroke: '#6633ff', padding: 5 },
          axisLabel: { fontSize: 12, padding: 100 },
          ticks: { stroke: 'grey', size: 5 },
          tickLabels: { fontSize: 12, padding: 0, marginBottom: 2, fill: '#000000' }
        }} crossAxis />
        <VictoryBar
          barRatio={0.8}
          labels={ ({ datum }) => datum.y.toFixed(0) }
          style={{
            data: {
              fill: ({ datum }) => datum.y < 0 ? '#f2c324' : '#6633ff80',
              stroke: ({ datum }) => datum.y < 0 ? '#f2c324' : '#6633ff80',
              fillOpacity: 0.7,
              strokeWidth: 1
            },
            labels: {
              fontSize: 10,
              padding: 14,
              fill:'#000000'
            }
          }}
          data={calorieDifference}
          animate={{ duration: 500 }}
        />
      </VictoryChart>
    </Box>
  );
}