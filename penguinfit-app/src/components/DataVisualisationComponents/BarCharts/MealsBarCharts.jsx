import {  VictoryBar, VictoryChart, VictoryAxis, VictoryGroup, } from 'victory';


export function BarCaloriesAndCountByMealType ({ data, maxima }) {
  return (
      
    <VictoryChart domainPadding={{ x: 5 }} minDomain={{ y: 0, x: 0 }} maxDomain={{ y: 1, }}>
      <VictoryAxis style={{
        axis: { stroke: '#6633ff', padding: 0 },
        ticks: { stroke: 'grey', size: 5 },
        tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
      }}
      // Re-scale ticks by multiplying by correct maxima
      tickValues={[0.25, 0.5, 0.75, 1]}
      tickFormat={(t) => Math.floor(t * maxima[0])}
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
      <VictoryAxis style={{
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
            y={(datum) => {
              return maxima[i] > 0? datum?.y / maxima[i]: datum?.y;
            } }
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