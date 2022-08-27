import {  VictoryBar, VictoryChart, VictoryAxis, VictoryLine, VictoryGroup } from 'victory';
import { Box } from '@mui/material';
import * as style from './BarChartsStyles.js';
import { getCalorieDifferenceByDate, getExerciseDurationByDate } from '../../../services/dashboard-service.js';
import { useContext, useEffect, useState } from 'react';
import AppState from '../../../providers/app-state.js';
import NoDataYet from '../../NoDataYet/NoDataYet.jsx';
import { getCalorieIntakeByDate } from '../../../services/meals-service.js';


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
            <VictoryAxis label={'minutes spent in activities by date,\n\nlast 30 days'}  style={{
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
          <VictoryChart domainPadding={{ x: 4 }} minDomain={{ x: 0,  y: -2000 }}>
            <VictoryAxis style={{
              axis: { stroke: '#c5e1a5', padding: 5 },
              axisLabel: { fontSize: 12, padding: 100 },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
            }}
            dependentAxis />
            <VictoryAxis label={'calorie balance in kcal, by date,\nlast 30 days'}  style={{
              axis: { stroke: '#c5e1a5', padding: 5 },
              axisLabel: { fontSize: 12, padding: 120 },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 12, padding: 0, marginBottom: 2, fill: '#000000' }
            }} crossAxis />
            <VictoryBar
              barRatio={0.8}
              labels={ ({ datum }) => datum.y.toFixed(0) }
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

export function BarCaloriesByMeal ({ data , maxima }) {


  return (
    
    <VictoryChart domainPadding={{ x: 5 }} minDomain={{ y: 0, x: 0 }} maxDomain={{ y: 1, }}>
      <VictoryAxis style={{
        axis: { stroke: '#c5e1a5', padding: 5 },
        ticks: { stroke: 'grey', size: 5 },
        tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
      }}
      // Re-scale ticks by multiplying by correct maxima
      tickValues={[...[...Array(maxima[0]+1).keys()].map(val => val/maxima[0])]}
      tickFormat={(t) => t * maxima[0]}
      dependentAxis />
      <VictoryAxis style={{
        axis: { stroke: 'purple',  },
        ticks: { stroke: 'grey', size: 5 },
        tickLabels: { fontSize: 10, padding: -7, fill: '#000000', textAnchor: 'start' }
      }}
      offsetX={420}
      tickValues={[0.25, 0.5, 0.75, 1]}
      // Re-scale ticks by multiplying by correct maxima
      tickFormat={(t) => Math.floor(t * maxima[1])} 
      dependentAxis />
      <VictoryAxis label={'average calorie intake/ meal count by meal type,\nlast 7 days'}  style={{
        axis: { stroke: '#c5e1a5', padding: 5 },
        axisLabel: { fontSize: 12, padding: -240 },
        ticks: { stroke: 'grey', size: 5 },
        tickLabels: { fontSize: 8, padding: 0, marginBottom: 2, fill: '#000000' }
      }} crossAxis />
      <VictoryGroup
        offset={15}
      >
        {data.map((d, i) => {
          return <VictoryBar
            key={i}
            barRatio={0.8}
            y={(datum) => datum.y / maxima[i]}
            style={{
              data: {
                fill: () => i === 0? '#c5e1a5' : 'purple',
                stroke: () => i === 0? '#c5e1a5' : 'purple',
                fillOpacity: 0.7,
                strokeWidth: 1
              },
              labels: {
                fontSize: 10,
                padding: 14,
                fill:'#000000'
              }
            }}
            data={d}
          />;
        })}
      </VictoryGroup>
      
    </VictoryChart>

  );
}
export function BarCalorieIntake () {
  const { appState:{ user } } = useContext(AppState);
  const [data, setData] = useState([]);

  useEffect(() => {
    getCalorieIntakeByDate(user.username).then((d) => setData(d)).catch(console.error);
  }, [user]);
  
  return (
    
    <VictoryChart domainPadding={{ x: 5 }} minDomain={{ y: 0, x: 0 }} >
      <VictoryAxis style={{
        ticks: { stroke: 'grey', size: 5 },
        tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
      }}
      dependentAxis />
      <VictoryAxis label={'average calorie intake in kcal, by date,\nlast 30 days'}  style={{
        axis: { stroke: '#c5e1a5', padding: 5 },
        axisLabel: { fontSize: 12, padding: -240 },
        ticks: { stroke: 'grey', size: 5 },
        tickLabels: { fontSize: 8, padding: 0, marginBottom: 2, fill: '#000000' }
      }} crossAxis />
      <VictoryLine
        interpolation={'natural'}
        
        data={data}
        style={{
          data: {
            stroke: 'purple',

            fillOpacity: 0.7,
            strokeWidth: 1
          },
          labels: {
            fontSize: 10,
            padding: 14,
            fill:'#000000'
          }
        }}
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