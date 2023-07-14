import { LineSegment, VictoryArea, VictoryAxis, VictoryChart, VictoryCursorContainer, VictoryLabel } from 'victory';
import { findMaxField, getRoundedMax } from '../../../services/data-viz-service';

const caloriesBurnedByDayStyles = {
  yAxis: {
    ticks: { stroke: 'grey', size: 5 },
    tickLabels: { fontSize: 10, padding: 0, fill: '#000000' }
  },
  xAxis: {
    axis: { stroke: '#000', padding: 5 },
    ticks: { stroke: 'grey', size: 5 },
    tickLabels: { fontSize: 10 }
  },
  area: {
    data: { stroke: '#6633ff', fill: 'url(#myGradient)', strokeWidth: 1.5 }
  }
};

export function CaloriesBurnedByDay ({ caloriesBurnedByDay }) {
  
  const ticks = 5;
  const maxBurned = findMaxField(caloriesBurnedByDay);
  const maxBurnedRounded = getRoundedMax(maxBurned, 1000) || 200;
  const defaultData = caloriesBurnedByDay.length
    ? [...caloriesBurnedByDay, { x: 'tomorrow', y:maxBurned+500 }] 
    : [{ x: 'today', y:maxBurned }, { x: 'tomorrow', y:maxBurned+500 }];
  const data = caloriesBurnedByDay.length > 1? caloriesBurnedByDay : defaultData;

  return (
      
    <>
      <svg style={{ position: 'absolute', height: 0, width: 0 }}>
        <defs>
          <linearGradient id="myGradient" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#6633ff00" />
            <stop offset="20%" stopColor="#6633ff20" />
            <stop offset="30%" stopColor="#6633ff30" />
            <stop offset="40%" stopColor="#6633ff40" />
            <stop offset="50%" stopColor="#6633ff50" />
            <stop offset="60%" stopColor="#6633ff60" />
            <stop offset="70%" stopColor="#6633ff70" />
            <stop offset="100%" stopColor="#6633ff" />
          </linearGradient>
        </defs>
      </svg>

      <VictoryChart 
        // height={400}
        // width={700}
        padding={{ top: 0, bottom: 50, right: 30, left: 30 }}
        containerComponent={
          <VictoryCursorContainer
            cursorLabel={({ datum }) => `${datum.y.toFixed(2)} kcal`}
            cursorComponent={
              <LineSegment
                style={
                  { stroke: 'gray' }
                }
              />
            }
            cursorLabelComponent={
              <VictoryLabel
                style={[
                  { fontSize: 10 },
                ]}
              />}
          />
        }
      >

        <VictoryAxis 
          dependentAxis 
          tickCount={ticks}
          //   tickValues={[0, 0.25, 0.5, 0.75, 1]}
          //   tickFormat={(t) => Math.floor(t * maxima)}
          domain={{ y: [0, maxBurnedRounded || 1] }}
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