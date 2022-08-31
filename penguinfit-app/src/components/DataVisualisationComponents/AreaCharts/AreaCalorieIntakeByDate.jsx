import { VictoryChart, VictoryAxis, VictoryArea } from 'victory';

const styles = {
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
export function AreaCalorieIntakeByDate ({ data }) {
 
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
      <VictoryChart minDomain={{ y: 0 }} maxDomain={{ y: 3500 }} >
        <VictoryAxis style={{
          ...styles.yAxis
        }}
        dependentAxis />
        <VictoryAxis style={{
          ...styles.xAxis
        }} crossAxis />
        <VictoryArea
          data={data}
          interpolation="natural"
          style={styles.area}
        />
      </VictoryChart>
    </>
  );
}