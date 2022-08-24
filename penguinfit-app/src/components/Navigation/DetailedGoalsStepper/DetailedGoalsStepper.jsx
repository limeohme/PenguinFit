import { useTheme } from '@emotion/react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { MobileStepper, Button, Typography, Chip, Stack, Divider, Box } from '@mui/material';
import { useState } from 'react';
import { VictoryPie, VictoryLabel } from 'victory';


export default function DetailedGoalsStepper({ steps }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;
  
  const formatDate = (date) => {
    if(!date) return null;
    const dateToSeconds = (new Date(date));
    return dateToSeconds.toLocaleDateString('en-us', { year:'numeric', month:'short', day:'numeric' });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  return (
    <Box sx={{ minWidth:{ xs: 'auto', sm:500 }, minHeight: '100%' ,flexGrow: 1 }}>
      { steps.length > 0 ? <>
        <Stack 
          spacing={1}
        >
          <Typography align="center" >{steps[activeStep].title}</Typography>
          <Chip label={'Status:' + steps[activeStep].status}/>
          <svg viewBox="0 0 400 400">
            <VictoryPie
              innerRadius={120}
              standalone={false}
              width={400}
              height={400}
              data={[
                { x: ' ', y: Number(steps[activeStep].currentValue) },
                { x: ' ', y: Number(steps[activeStep].targetValue - steps[activeStep].currentValue) },
              ]}
              animate={{
                duration: 2000,
              }}
              colorScale={[ 'navy', 'black' ]}
            >
            </VictoryPie>
            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 20 }}
              x={200} y={200}
              text={`${Number(steps[activeStep].currentValue)}/${Number(steps[activeStep].targetValue)}`}
            />
          </svg>
          <Stack direction="row" spacing={2}   divider={<Divider orientation="vertical" flexItem />}>
            <Typography align="center" >{'Created on: ' + formatDate(steps[activeStep].createdOn)}</Typography>
            <Typography align="center" >{'Due date:' + (formatDate(steps[activeStep].dueDate) || 'Not set')}</Typography>
          </Stack>
        </Stack>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{ backgroundColor: '#ffffff75' }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </>
        : 
        <>
          <Stack>
            <Typography align="center" >Don't be a lazy penguin !</Typography>
            <Typography align="center" >Add some goals ! </Typography>

          </Stack>
        </>
      }
    </Box>
  );
}