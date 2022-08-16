import { useTheme } from '@emotion/react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, MobileStepper, Button, Typography, Paper, } from '@mui/material';
import { useState } from 'react';
import * as style from './ThoughtStyles.js';

const thoughts = [
  {
    title: 'Another Lorem, another ipsum',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Pellentesque leo lorem, mattis sit amet varius ut, convallis quis felis. Morbi semper at orci nec hendrerit.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
    Donec ligula erat, eleifend nec consequat id, semper condimentum tellus. Pellentesque bibendum ultrices orci.
    Nulla elementum eros congue auctor pretium. Ut cursus mollis augue sit amet convallis.
    Ut bibendum facilisis mattis. Donec malesuada justo at bibendum fermentum.`,
    mood: '👻'
  },
  {
    title: 'Another Lorem, another ipsum',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Pellentesque leo lorem, mattis sit amet varius ut, convallis quis felis. Morbi semper at orci nec hendrerit.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
    Donec ligula erat, eleifend nec consequat id, semper condimentum tellus. Pellentesque bibendum ultrices orci.
    Nulla elementum eros congue auctor pretium. Ut cursus mollis augue sit amet convallis.
    Ut bibendum facilisis mattis. Donec malesuada justo at bibendum fermentum.`,
    mood: '🥺'
  },
  {
    title: 'Another Lorem, another ipsum',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Pellentesque leo lorem, mattis sit amet varius ut, convallis quis felis. Morbi semper at orci nec hendrerit.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
    Donec ligula erat, eleifend nec consequat id, semper condimentum tellus. Pellentesque bibendum ultrices orci.
    Nulla elementum eros congue auctor pretium. Ut cursus mollis augue sit amet convallis.
    Ut bibendum facilisis mattis. Donec malesuada justo at bibendum fermentum.`,
    mood: '🥰'
  },

];
  
// user friends

function SingleThought () {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = thoughts.length;
    
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
    
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Box sx={style.sideBoxStyleBlue}>
      <Paper sx={style.boxStyleWhite}>
        <Typography sx={style.titleStyle} align="center" >{thoughts[activeStep].title}</Typography>
        <Box>
          <Typography sx={style.bodyStyle}>{thoughts[activeStep].content}</Typography>
        </Box>
        <Typography sx={{ alignSelf: 'center', m: '1rem' }} variant='h3' >{thoughts[activeStep].mood}</Typography>
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

export default SingleThought;