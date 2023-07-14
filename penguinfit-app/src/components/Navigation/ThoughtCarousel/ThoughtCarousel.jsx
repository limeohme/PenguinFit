import { useTheme } from '@emotion/react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, MobileStepper, Button, Typography, Paper, _TextField, } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AppState from '../../../providers/app-state.js';
import { getLiveThoughts } from '../../../services/thoughts-service.js';
import SingleThoughtView from '../../SingleViewComponent/SingleThoughtView/SingleThoughtView.jsx';
import * as style from './ThoughtCarStyles.js';


function ThoughtCarousel () {
  const theme = useTheme();
  const { appState, _setState } = useContext(AppState);
  const [activeStep, setActiveStep] = useState(0);
  const [thoughts, setThoughts] = useState([]);
  const maxSteps = thoughts.length;

  useEffect(() => {
    const unsub = getLiveThoughts(appState.user.username, (snapshot) => {
      if (snapshot.exists()) setThoughts(Object.values(snapshot.val()));
    });

    return unsub;
  }, [appState.user.username]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
    
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  

  return (
    <Box sx={style.boxStyleWhite}>
      { thoughts.length? <Paper sx={style.boxStyleWhite}>
        <SingleThoughtView thought={thoughts[activeStep]} activeStep={activeStep} handleBack={handleBack}/>
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          sx={{ bgcolor: 'transparent' }}
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
      </Paper>:
        <Paper sx={style.boxStyleWhite}>
          <Box>
            <Typography sx={style.titleStyle}>There are no thoughts here yet...</Typography>
          </Box>
        </Paper>
      }
    </Box>
  );
}

export default ThoughtCarousel;