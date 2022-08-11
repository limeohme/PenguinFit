import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { Box, Container } from '@mui/material';
import * as style from './StatisticsStyles.js';

function Statistics () {
  return (
    <Container sx={style.containerStyle}>

      <Box >
        <VictoryChart domainPadding={{ x: 4 }} minDomain={{ x: 0, y: -200 }}>
          <VictoryAxis dependentAxis />
          <VictoryAxis crossAxis />
          <VictoryBar
            barRatio={0.7}
            style={{
              data: { fill: '#c43a31' }
            }}
            data={[
              { x: 'Achieved5', y: 60 },
              { x: 'Not yet1', y: -140 },
              { x: 'Not yet11', y: 400 },
              { x: 'Not ye11t', y: 40 },
              { x: 'Not y11et', y: 40 },
            ]}
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
      </Box>
      <Box >
        <VictoryPie
          labelRadius={({ innerRadius }) => innerRadius + 15 }
          animate={{
            duration: 2000,
            easing: 'bounce',
            onLoad: {
              duration: 2000,
              before: () => ({ _y: -50 }),
              after: (datum) => ({ _y: datum._y })
            } }}
          colorScale={['gold', 'pink', 'navy' ]}
          innerRadius={60}
          data={[
            { x: 'Achieved', y: 60 },
            { x: 'Not yet', y: 40 },
            { x: 'Not yet', y: 40 },
            { x: 'Not yet', y: 40 },
            { x: 'Not yet', y: 40 },
          ]}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryLabel angle={5} style={{ fill: 'navy' }}/> }
        />
      </Box>
      <Box >
        <VictoryPie
          labelRadius={({ innerRadius }) => innerRadius + 15 }
          animate={{
            duration: 2000,
            easing: 'bounce',
            onLoad: {
              duration: 2000,
              before: () => ({ _y: -50 }),
              after: (datum) => ({ _y: datum._y })
            } }}
          colorScale={['gold', 'pink', 'navy' ]}
          innerRadius={60}
          data={[
            { x: 'Achieved', y: 60 },
            { x: 'Not yet', y: 40 },
          ]}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryLabel angle={5} style={{ fill: 'navy' }}/> }
        />
      </Box>
      <Box >
        <VictoryPie
          labelRadius={({ innerRadius }) => innerRadius + 15 }
          animate={{
            duration: 2000,
            easing: 'bounce',
            onLoad: {
              duration: 2000,
              before: () => ({ _y: -50 }),
              after: (datum) => ({ _y: datum._y })
            } }}
          colorScale={['gold', 'pink', 'navy' ]}
          innerRadius={60}
          data={[
            { x: 'Achieved', y: 60 },
            { x: 'Not yet', y: 40 },
          ]}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryLabel angle={5} style={{ fill: 'navy' }}/> }
        />
      </Box>
      <Box>
        <VictoryPie
          labelRadius={({ innerRadius }) => innerRadius + 15 }
          animate={{
            duration: 2000,
            easing: 'bounce',
            onLoad: {
              duration: 2000,
              before: () => ({ _y: -50 }),
              after: (datum) => ({ _y: datum._y })
            } }}
          colorScale={['gold', 'pink', 'navy' ]}
          innerRadius={60}
          data={[
            { x: 'Achieved', y: 60 },
            { x: 'Not yet', y: 40 },
          ]}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryLabel angle={5} style={{ fill: 'navy' }}/> }
        />
      </Box>
    </Container>

  );
}

export default Statistics;