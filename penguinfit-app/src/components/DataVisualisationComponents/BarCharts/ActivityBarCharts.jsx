import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLegend } from 'victory';

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

export function CaloriesToDurationByActivityTypeBar () {

  const maxima = [360,2500];
  const data = [
    [
      { x:'cardio', y:230 },
      { x:'other', y:300 },
      { x:'strength', y:160 }
    ],
    [
      { x:'cardio', y:2700 },
      { x:'other', y:543 },
      { x:'strength', y:100 }
    ]
  ];

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
          //   label={'duration to calories burned per activity type\nlast 30 days'}  
          //   width={330} 
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