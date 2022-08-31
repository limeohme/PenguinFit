import { Button, Chip, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { VictoryLabel, VictoryPie } from 'victory';
import { getDisplayTarget } from '../../../common/types-targets';
import { formatDate } from '../../../utils/goals-utils';

export default function SingleDetailedGoalView({ step, handleCelebrate, handleDelete }) {

  return (
    <>
      {step &&
    
    <Stack 
      spacing={1}
    >
      <Typography align="center" variant='h5' sx={{ bgcolor: 'transparent', mt: 2 }}>{`${step.title}`}</Typography>
      <Typography align="center"  sx={{ bgcolor: 'transparent' }}>{`${step.type}`}</Typography>
      <Chip 
        label={
          step.status !== 'Not there yet' ? 
            <Button
              onClick={() => handleCelebrate(step.type, step.target, step.id)}
            >
            Add to achieved
            </Button>
            :'Status: ' + step.status
        } 
        sx={{ my: 2, bgcolor: '#6633ff10' }}/>
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
          colorScale={[ '#6633ff', '#6633ff10' ]}
        >
        </VictoryPie>
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20 }}
          x={200} y={200}
          text={step.status !== 'Not there yet' ? 'Achieved !' :
            `${Math.floor(Number(step.currentValue))}/${Number(step.targetValue)}
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
        <Button
          onClick={() => handleDelete(step.type, step.target, step.id)}
        >
              Delete
        </Button>
        
      </Stack>
    </Stack>
      }
    </>
  );

}