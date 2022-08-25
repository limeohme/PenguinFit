import {  VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { Box } from '@mui/material';
import * as style from './BarChartsStyles.js';
import { getCalorieDifferenceByDate, getExerciseDurationByDate } from '../../../services/dashboard-service.js';
import { useContext, useEffect, useState } from 'react';
import AppState from '../../../providers/app-state.js';
import NoDataYet from '../../NoDataYet/NoDataYet.jsx';


export function BarActivityDurationByDay () {
  const { appState:{ user } } = useContext(AppState);
  const [exerciseDuration, setExerciseDuration] = useState([]);

  useEffect(() => {
    getExerciseDurationByDate(user.username).then((res) => setExerciseDuration(res), console.error);
  }, [user.username]);

  return (
    <Box sx={style.barChartStyle}>
      { !exerciseDuration.length?
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
          flexDirection: 'column', height: '400px', my: '2rem' }}>
          <NoDataYet/>  
        </Box> :
        <>
          <VictoryChart minDomain={{ x: 0, y: 0 }} style={{ padding: 10, width: 'fit-content' }}>
            <VictoryAxis label={'minutes in activities'}  style={{
              axis: { stroke: '#5c6bc0', padding: 5 },
              axisLabel: { fontSize: 12, padding: 35 },
              grid: { stroke: '#5c6bc0' },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
            }}
            dependentAxis />
            <VictoryAxis label={'minutes spent in activities by day,\n\nlast 30 days'}  style={{
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
        </>
      }
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
      { !calorieDifference.length?
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
          flexDirection: 'column', height: '400px', my: '2rem' }}>
          <NoDataYet/>  
        </Box> :
        <>
          <VictoryChart domainPadding={{ x: 4 }} minDomain={{ x: 0,  y: -1000 }}>
            <VictoryAxis style={{
              axis: { stroke: '#c5e1a5', padding: 5 },
              axisLabel: { fontSize: 12, padding: 100 },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
            }}
            dependentAxis />
            <VictoryAxis label={'calorie balance by day,\nlast 30 days'}  style={{
              axis: { stroke: '#c5e1a5', padding: 5 },
              axisLabel: { fontSize: 12, padding: 90 },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 12, padding: 0, marginBottom: 2, fill: '#000000' }
            }} crossAxis />
            <VictoryBar
              barRatio={0.8}
              labels={ ({ datum }) => ` ${datum.y.toFixed(0)}\nkcal`}
              style={{
                data: {
                  fill: ({ datum }) => datum.y < 0 ? '#f2c324' : '#c5e1a5',
                  stroke: ({ datum }) => datum.y < 0 ? '#f2c324' : '#c5e1a5',
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
        </>
      }
    </Box>
  );
}

export function BarCaloriesByMeal ({ data }) {
  
  return (
    
    <VictoryChart domainPadding={{ x: 5 }} minDomain={{ y: 0, x: 0 }} maxDomain={{ y: 2000, x: 7 }}>
      <VictoryAxis style={{
        ticks: { stroke: 'grey', size: 5 },
        tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
      }}
      dependentAxis />
      <VictoryAxis label={'average calorie intake by meal,\nlast 7 days'}  style={{
        axis: { stroke: '#c5e1a5', padding: 5 },
        axisLabel: { fontSize: 12, padding: -220 },
        ticks: { stroke: 'grey', size: 5 },
        tickLabels: { fontSize: 8, padding: 0, marginBottom: 2, fill: '#000000' }
      }} crossAxis />
      <VictoryBar
        barRatio={0.8}
        style={{
          data: {
            fill: ({ datum }) => datum.y > 300 ? '#f2c324' : '#c5e1a5',
            stroke: ({ datum }) => datum.y > 300 ? '#f2c324' : '#c5e1a5',
            fillOpacity: 0.7,
            strokeWidth: 1
          },
          labels: {
            fontSize: 10,
            padding: 14,
            fill:'#000000'
          }
        }}
        data={data}
        animate={{
          duration: 2000,
          easing: 'bounce',
          onLoad: {
            duration: 2000,
            before: () => ({ _y: 0 }),
            after: (datum) => ({ _y: datum._y })
          } }}
      />
    </VictoryChart>

  );
}