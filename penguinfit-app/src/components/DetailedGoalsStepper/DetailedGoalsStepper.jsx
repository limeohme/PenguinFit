import { useTheme } from '@emotion/react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, MobileStepper, Button, Typography, Chip, Paper, Stack, Divider } from '@mui/material';
import { useState } from 'react';
import { VictoryPie } from 'victory';


export default function DetailedGoalsStepper({ steps }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;
  
  const formatDate = (date) => {
    if(!date) return null;
    return date.toLocaleDateString('en-us', { year:'numeric', month:'short', day:'numeric' });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1, m: 2 }}>
      <h3>Your goals:</h3>
      <Paper>
        <Stack 
          spacing={1}
        >
          <Typography align="center" >{steps[activeStep].title}</Typography>
          <Chip label={'Status:' + steps[activeStep].status}/>
          <VictoryPie
            data={[
              { x: 'Achieved', y: Number(steps[activeStep].currentValue) },
              { x: 'Not there yet', y: Number(steps[activeStep].targetValue - steps[activeStep].currentValue) },
            ]}
            animate={{
              duration: 2000,
            }}
            colorScale={[ 'navy', 'black' ]}
          >
          </VictoryPie>
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
      </Paper>
    </Box>
  );
}