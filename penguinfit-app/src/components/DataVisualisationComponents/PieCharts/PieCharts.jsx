import { VictoryPie, VictoryLabel, VictoryLegend, VictoryTooltip } from 'victory';
import { Typography, Grid } from '@mui/material';
import * as style from './PieChartsStyles.js';
import { MEAL_TYPES } from '../../../common/constants.js';
import { formatData } from '../../../services/data-viz-service.js';

function CustomPieTooltip ({ ...props }) {
  return (
    <g>
      <VictoryLabel {...props}/>
      <VictoryTooltip
        {...props}
        x={200} y={250}
        text={({ datum }) => `${datum.y}% \n${datum.x}`}
        orientation="top"
        pointerLength={0}
        cornerRadius={50}
        flyoutWidth={100}
        flyoutHeight={100}
        flyoutStyle={{ fill: 'none', stroke: 'none' }}
        style={{ fill: 'black' }}
      />
    </g>
  );
}

CustomPieTooltip.defaultEvents = VictoryTooltip.defaultEvents;

export function PieNutrientsDistribution ({ nutrients }) {


  return (
    <Grid item xs={12} sm={12} md={6} sx={style.pieChartStyle}>
      <VictoryPie
        labelRadius={({ innerRadius }) => innerRadius + 15 }
        animate={{
          duration: 2000,
          easing: 'bounce',
          onEnter: {

          }
        }}
        style={{ data: { fillOpacity: 0.7, } }}
        colorScale={['#fed101', '#6633ff', '#0033ff90' ]}
        innerRadius={60}
        data={nutrients}
        labels={({ datum }) => datum.y > 0 ? datum.x : ''}
        labelComponent={<VictoryLabel angle={5} style={{ fill: '#000', margin: 5 }}/> }
      />
      <Typography sx={style.chartNamesStyle} variant='h7'>nutrients distribution %</Typography>
    </Grid>
  );
}

const colors = ['#a3e2f7', '#8dc4d6', '#729fad', '#3c6f80', '#2a5d6e', '#0e4152', '#042b38'];
export function PieMealsDistribution ({ meals }) {
  


  return (
    <Grid item xs={12} sm={12} md={6} sx={style.pieChartStyle}>
      <Typography variant='h5'>meals by type %</Typography>
      <VictoryPie
        labelRadius={({ innerRadius }) => innerRadius + 24 }
        animate={{
          duration: 2000,
          easing: 'bounce',
          onEnter: {

          }
        }}
        colorScale={colors}
        innerRadius={60}
        data={meals}
        labels={() => ''}
        labelComponent={<VictoryLabel angle={5} style={{ fill: '#FFF' }}/> }
      />
      <VictoryLegend x={125} y={0}
        centerTitle
        orientation="horizontal"
        itemsPerRow={3}
        gutter={16}
        style={{ labels: { fontSize: 10, } }}
        data={MEAL_TYPES.map((type, i) => {
          return {
            name: type,
            symbol: { fill: colors[i] }
          };
        })}
      />
    </Grid>
  );
}

export function PieGoalAchievement ({ goals }) {

  return (
    <Grid item xs={12} sm={12} md={6} sx={style.pieChartStyle}>
      <VictoryPie
        labelRadius={({ innerRadius }) => innerRadius + 15 }
        animate={{
          duration: 2000,
          easing: 'circle',
          onLoad: {
            duration: 2000,
            before: () => ({ _y: -50 }),
            after: (datum) => ({ _y: datum._y })
          } }}
        colorScale={['#6633ff', '#fed101', '#0033ff90' ]}
        innerRadius={60}
        style={{ data: { fillOpacity: 0.7 } }}
        data={goals}
        labels={({ datum }) => datum.y > 0? datum.x: ''}
        labelComponent={<VictoryLabel angle={5} style={{ fill: '#000' }}/> }
      />
      <Typography sx={style.chartNamesStyle} variant='h7'>goal achievement %</Typography>
    </Grid>
  );
}

const activityTypesColors = ['#6633ff', '#fed101', '#6633ff75'];
export function PieChartActivityTypes ({ countByType }) {
  
  //data in correct chart format
  const dataFormattedNumbers = formatData(countByType);

  //get total number of activities
  const totalActivitiesCount = dataFormattedNumbers.reduce((tot,obj) => tot + obj.y, 0);

  //to percentage
  const dataFormatted = dataFormattedNumbers.map((obj)=>({ 
    ...obj, 
    y: +((obj.y/totalActivitiesCount)*100).toFixed(0) 
  }));

  const pieData = dataFormatted.length? dataFormatted : [{ x: 'no data', y: '' }];
  const legendTypes = dataFormatted.map((dataObj)=>dataObj.x);

  return (
    <>
      <VictoryPie
        style={{ labels: { fill: 'white' } }}
        innerRadius={100}
        labelRadius={120}
        colorScale={activityTypesColors}
        labels={({ datum }) => `${datum.y}`}
        labelComponent={<CustomPieTooltip />}
        data={pieData}
      />
      <VictoryLegend x={10} y={0}
        centerTitle
        orientation="horizontal"
        itemsPerRow={legendTypes.length}
        gutter={30}
        height={40}
        style={{ labels: { fontSize: 20, } }}
        data={legendTypes.map((type, i) => {
          return {
            name: `# ${type}`,
            symbol: { fill: activityTypesColors[i] }
          };
        })}
      />
    </>
  );
}