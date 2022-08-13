import { useTheme } from '@emotion/react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, MobileStepper, Button, Stack, Paper } from '@mui/material';
import { useState } from 'react';
import { VictoryBar, VictoryGroup } from 'victory';


export default function FriendsComparisonStepper({ steps }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;
  
  // function sortPeople (criteria, people) {
  //   return people.sort((a,b) => (b[criteria] - a[criteria]));
  // }

  // function creteSteps(people){
  //   const exercisesCount = sortPeople('exercisesCount', people);
  //   const achievedGoals = sortPeople('achievedGoals', people);
  // }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1, m: 2 }}>
      <h3>{steps[activeStep].title}</h3>
      <Paper>
        <Stack 
          spacing={0}
        >
          <VictoryGroup
            height={200}
          >
            {steps[activeStep].results.map(el => {
              return (
                <VictoryBar
                  labels={el.name}
                  data={[el.data]}
                  animate={{
                    // duration: 2000,
                    onLoad: { duration: 1000 },
                    onExit: { duration: 1000 }

                  }}
                >

                </VictoryBar>
              );

            })}
            {/* <VictoryBar
              labels='mish'
              data={[{ x: 1, y: 1 }]}
            />
            <VictoryBar
              data={[{ x: 2, y: 2 }]}
            /> */}
          </VictoryGroup>
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