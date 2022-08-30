import {  VictoryBar, VictoryChart, VictoryAxis, VictoryLine, VictoryGroup, VictoryLegend } from 'victory';
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
              axis: { stroke: '#6633ff70', padding: 5 },
              axisLabel: { fontSize: 12, padding: 35 },
              grid: { stroke: '#5c6bc0' },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
            }}
            dependentAxis />
            <VictoryAxis label={'minutes spent in activities by date,\n\nlast 30 days'}  style={{
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
          <VictoryChart domainPadding={{ x: 4 }} minDomain={{ x: 0,  }}>
            <VictoryAxis style={{
              axis: { stroke: '#6633ff', padding: 5 },
              axisLabel: { fontSize: 12, padding: 100 },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
            }}
            dependentAxis />
            <VictoryAxis label={'calorie balance in kcal, by date,\nlast 30 days'}  style={{
              axis: { stroke: '#6633ff', padding: 5 },
              axisLabel: { fontSize: 12, padding: 120 },
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
        </>
      }
    </Box>
  );
}

export function BarCaloriesByMeal ({ data , maxima }) {


  return (
    
    <VictoryChart domainPadding={{ x: 5 }} minDomain={{ y: 0, x: 0 }} maxDomain={{ y: 1, }}>
      <VictoryAxis style={{
        axis: { stroke: '#6633ff', padding: 5 },
        ticks: { stroke: 'grey', size: 5 },
        tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
      }}
      // Re-scale ticks by multiplying by correct maxima
      tickValues={[...[...Array(maxima[0]+1).keys()].map(val => val/maxima[0])]}
      tickFormat={(t) => t * maxima[0]}
      dependentAxis />
      <VictoryAxis style={{
        axis: { stroke: '#f2c324',  },
        ticks: { stroke: 'grey', size: 5 },
        tickLabels: { fontSize: 10, padding: -7, fill: '#000000', textAnchor: 'start' }
      }}
      offsetX={420}
      tickValues={[0.25, 0.5, 0.75, 1]}
      // Re-scale ticks by multiplying by correct maxima
      tickFormat={(t) => Math.floor(t * maxima[1])} 
      dependentAxis />
      <VictoryAxis label={'meal count/average calorie intake by meal type,\nlast 7 days'}  style={{
        axis: { stroke: '#000', padding: 5 },
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
            y={(datum) => datum.y / maxima[i]} // [[{x y},{x y}],[{x y}]]
            style={{
              data: {
                fill: () => i === 0? '#6633ff80' : '#f2c324',
                stroke: () => i === 0? '#6633ff80' : '#f2c324',
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
        axis: { stroke: '#000', padding: 5 },
        axisLabel: { fontSize: 12, padding: -240 },
        ticks: { stroke: 'grey', size: 5 },
        tickLabels: { fontSize: 8, padding: 0, marginBottom: 2, fill: '#000000' }
      }} crossAxis />
      <VictoryLine
        interpolation={'natural'}
        
        data={data}
        style={{
          data: {
            stroke: '#6633ff',

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

const durVSCalColors = ['#6633ff', '#6633ff50'];


export function BarCaloriesToActivityDuration () {
  // const getBarData = () => {
  //   return [1, 2, 3, 4, 5].map(() => {
  //     return [
  //       { x: 1, y: Math.random() },
  //       { x: 2, y: Math.random() },
  //       { x: 3, y: Math.random() }
  //     ];
  //   });
  // };

  // return (
  //   <>
  //     <VictoryChart domainPadding={{ x: 50 }} width={400} height={400} >
  //       <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
  //         <VictoryStack colorScale={'red'} >
  //           {getBarData().map((data, index) => {
  //             return <VictoryBar key={index} data={data} />;
  //           })}
            
  //         </VictoryStack>
          
  //         <VictoryStack colorScale={'green'}>
  //           {getBarData().map((data, index) => {
  //             return <VictoryBar key={index} data={data}/>;
  //           })}
  //         </VictoryStack>
          
  //         <VictoryStack colorScale={'blue'}>
  //           {getBarData().map((data, index) => {
  //             return <VictoryBar key={index} data={data}/>;
  //           })}
            
  //         </VictoryStack>
  //         <VictoryAxis />
  //         {
  //           ['cat', 'dog', 'bird'].map((d, i) => {
  //             return (
  //               <VictoryAxis dependentAxis
  //                 key={i}
  //                 label={d}
  //                 style={{ tickLabels: { fill: 'none' } }}
  //                 axisValue={d}
  //               />
  //             );
  //           })
  //         }
          
  //       </VictoryGroup>
        
  //     </VictoryChart>
  //   </>
  // );
  const maxima = [360,2500];
  const data = [
    [
      { x:'cardio', y:230 },
      { x:'other', y:120 },
      { x:'strength', y:160 }
    ],
    [
      { x:'cardio', y:543 },
      { x:'other', y:2700 },
      { x:'strength', y:100 }
    ]
  ];

  return (
    
    <>
      <VictoryChart 
        domain={{ x: [0, 3.5] }}
        // domainPadding={{ x: 0 }} 
        // minDomain={{ y: 0, x: 0 }} 
        // maxDomain={{ y: 1 }}
        height={300}
        width={300}
      // style={{ padding:20, margin: 0 }}
      >
      
        <VictoryAxis label={'min'} style={{
        // axis: { stroke: '#5c6bc0',  },
          ticks: { stroke: 'grey', size: 10 },
          tickLabels: { fontSize: 10, textAnchor: 'start' , padding: 20 }
        }}
        offsetX={50}
        tickValues={[0.25, 0.5, 0.75, 1]}
        tickFormat={(t) => Math.floor(t * maxima[0])} 
        dependentAxis />
        <VictoryAxis label={'kcal'} style={{
        // axis: { stroke: '#5c6bc0',  },
          ticks: { stroke: 'grey', size: -10 },
          tickLabels: { fontSize: 10, textAnchor: 'start', padding: -6 }
        }}
        offsetX={250}
        tickValues={[0.25, 0.5, 0.75, 1]}
        tickFormat={(t) => Math.floor(t * maxima[1])} 
        dependentAxis />
        <VictoryAxis label={'duration to calories burned per activity type\nlast 30 days'}  width={330} style={{
          axisLabel: { fontSize: 12, padding: -240 },
          ticks: { stroke: 'grey', size: 10 },
          tickLabels: { fontSize: 12, padding: 5 }
        }} crossAxis />
        <VictoryGroup

          offset={20}
        >
          {data.map((d, i) => {
            return <VictoryBar
              key={i}
              // barRatio={0.5}
              y={(datum) => datum.y / maxima[i]}
              style={{
                data: {
                  width: 15,
                  fill: durVSCalColors[i],
                // stroke: () => i === 0? '#c5e1a5' : '#5c6bc0',
                // fillOpacity: 0.7,
                // strokeWidth: 1
                },
              // labels: {
              //   fontSize: 20,
              //   padding: 14,
              //   fill:'#000000'
              // }
              }}
              data={d}
            />;
          })}
        </VictoryGroup>
      
      </VictoryChart>
      <VictoryLegend x={10} y={0}
        centerTitle
        orientation="horizontal"
        itemsPerRow={data[0].length}
        gutter={30}
        height={40}
        // width={600}
        style={{ labels: { fontSize: 20, } }}
        data={['duration', 'calories'].map((type, i) => {
          return {
            name: `${type}`,
            symbol: { fill: durVSCalColors[i] }
          };
        })}
      />
    </>

  );
}