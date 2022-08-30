import { Button, Chip, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { VictoryLabel, VictoryPie } from 'victory';
import { getDisplayTarget } from '../../../common/types-targets';
import { formatDate } from '../../../utils/goals-utils';

export default function SingleDetailedGoalView({ step, handleCelebrate, handleDelete }) {

  return (
    <Stack 
      spacing={1}
    >
      <Typography align="center" >{`${step.type} : ${step.title}`}</Typography>
      <Chip label={'Status:' + step.status}/>
      <svg viewBox="0 0 400 400">
        <VictoryPie
          innerRadius={120}
          cornerRadius={120}
          standalone={false}
          width={400}
          height={400}
          data={[
            { x: ' ', y: Number(step.currentValue) },
            { x: ' ', y: Number(step.targetValue - step.currentValue) },
          ]}
          animate={{
            duration: 2000,
          }}
          colorScale={[ 'navy', 'transparent' ]}
        >
        </VictoryPie>
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20 }}
          x={200} y={200}
          text={step.status !== 'Not there yet' ? 'Achieved !' :
            `${Number(step.currentValue)}/${Number(step.targetValue)}
                    ${getDisplayTarget[step.target]}`}
        />
      </svg>
      <Stack 
        direction="row" 
        justifyContent="space-around"
        alignItems="center"
        spacing={2}   
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Typography >{'Created on: ' + formatDate(step.createdOn)}</Typography>
        {step.status !== 'Not there yet' ? <Button
          onClick={() => handleCelebrate(step.type, step.target, step.id)}
        >
              Celebrate !
        </Button> 
          : <Button
            onClick={() => handleDelete(step.type, step.target, step.id)}
          >
              Delete goal
          </Button>
        }
      </Stack>
    </Stack>
  );

}