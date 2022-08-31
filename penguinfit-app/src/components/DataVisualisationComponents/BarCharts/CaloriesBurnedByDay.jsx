import { VictoryArea, VictoryAxis, VictoryChart } from 'victory';

const caloriesBurnedByDayStyles = {
  yAxis: {
    ticks: { stroke: 'grey', size: 5 },
    tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
  },
  xAxis: {
    axis: { stroke: '#000', padding: 5 },
    ticks: { stroke: 'grey', size: 5 },
    //   tickLabels: { fontSize: 8 }
  },
  area: {
    data: { stroke: '#6633ff', fill: 'url(#myGradient)', strokeWidth: 1.5 }
  }
};

export function CaloriesBurnedByDay () {

  const maxima = 2000;
  const ticks = 3;

  const data = [
    { x: '1', y: 1246 },
    { x: '2', y: 126 },
    { x: '3', y: 1400 },
    { x: '4', y: 768 },
    { x: '5', y: 912 },
    { x: '6', y: 503 },
    { x: '7', y: 678 },
    { x: '8', y: 835 },
    { x: '9', y: 917 },
    { x: '10', y: 324 },
    { x: '11', y: 98 },
    { x: '12', y: 245 },
    { x: '13', y: 678 },
    { x: '14', y: 150 },
  ];

  return (
      
    <>
      <VictoryChart 
        // height={360}
        width={700}
      >

        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient id="myGradient" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#6633ff00" />
              <stop offset="20%" stopColor="#6633ff20" />
              <stop offset="30%" stopColor="#6633ff30" />
              <stop offset="40%" stopColor="#6633ff40" />
              <stop offset="50%" stopColor="#6633ff50" />
              <stop offset="60%" stopColor="#6633ff60" />
              <stop offset="70%" stopColor="#6633ff70" />
              {/* <stop offset="80%" stopColor="#6633ff80" /> */}
              <stop offset="100%" stopColor="#6633ff" />
            </linearGradient>
          </defs>
        </svg>

        <VictoryAxis 
          dependentAxis 
          tickCount={ticks}
          domain={{ y: [0, maxima] }}
          style={caloriesBurnedByDayStyles.yAxis}
        />

        <VictoryAxis 
          crossAxis 
          style={caloriesBurnedByDayStyles.xAxis} 
        />

        <VictoryArea
          data={data}
          interpolation="natural"
          style={caloriesBurnedByDayStyles.area}
        />

      </VictoryChart>
    </>
  
  );
}