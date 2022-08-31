import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLegend } from 'victory';
import { findMaxField, formatData, getRoundedMax } from '../../../services/data-viz-service';

const durVSCalColors = ['#6633ff', '#6633ff50'];

const ActivityBarStyles = {
  axisLeft: {
    axisLabel: { fontSize: 10, padding: -15 },
    ticks: { stroke: 'grey', size: 10 },
    tickLabels: { fontSize: 10, textAnchor: 'start' , padding: 20 }
  },
  axisRight: {
    axisLabel: { fontSize: 10, padding: 7 },
    ticks: { stroke: 'grey', size: -10 },
    tickLabels: { fontSize: 10, textAnchor: 'start', padding: -6 }
  },
  axisHorizontal: {
    // axisLabel: { fontSize: 12, padding: -240 },
    ticks: { stroke: 'grey', size: 10 },
    tickLabels: { fontSize: 12, padding: 5 }
  },
  bars: (i) => {
    return {
      data: { width: 15, fill: durVSCalColors[i] }
    };
  },
  legend: { labels: { fontSize: 20 } }
};

export function CaloriesToDurationByActivityTypeBar ({ dataByType }) {

  const dataFormatted = dataByType?.map((fieldByTypeObj)=>formatData(fieldByTypeObj));
  const maxFieldsByType = dataFormatted?.map((fieldByTypeObj)=>findMaxField(fieldByTypeObj));

  const maxima = [
    getRoundedMax(maxFieldsByType[0], 100) || 200,
    getRoundedMax(maxFieldsByType[1], 1000) || 2000
  ];

  const defaultData = [
    [
      { x:'cardio', y:0 },
      { x:'other', y:0 },
      { x:'strength', y:0 }
    ],
    [
      { x:'cardio', y:0 },
      { x:'other', y:0 },
      { x:'strength', y:0 }
    ]
  ];
  
  const data = dataFormatted.flat().length? dataFormatted : defaultData;

  return (
    
    <>
      <VictoryChart 
        domain={{ x: [0, 3.5] }}
        height={300}
        width={300}
      >
      
        <VictoryAxis 
          dependentAxis 
          offsetX={50}
          label={'min'} 
          tickValues={[0.25, 0.5, 0.75, 1]}
          tickFormat={(t) => Math.floor(t * maxima[0])} 
          style={ActivityBarStyles.axisLeft}
        />

        <VictoryAxis 
          dependentAxis
          offsetX={250}
          label={'kcal'} 
          tickValues={[0.25, 0.5, 0.75, 1]}
          tickFormat={(t) => Math.floor(t * maxima[1])} 
          style={ActivityBarStyles.axisRight}
        />

        <VictoryAxis 
          crossAxis
          style={ActivityBarStyles.axisHorizontal} 
        />

        <VictoryGroup offset={20}>
          {data.map((d, i) => {
            return <VictoryBar
              key={i}
              data={d}
              y={(datum) => datum.y / maxima[i]}
              style={ActivityBarStyles.bars(i)}
            />;
          })}

        </VictoryGroup>
      
      </VictoryChart>

      <VictoryLegend x={10} y={0}
        centerTitle
        orientation="horizontal"
        gutter={30}
        height={40}
        itemsPerRow={data[0].length}
        style={ActivityBarStyles.legend}
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