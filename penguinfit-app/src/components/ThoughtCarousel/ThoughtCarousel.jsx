import { useTheme } from '@emotion/react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, MobileStepper, Button, Typography, Paper, TextField, } from '@mui/material';
import { useState } from 'react';
import { editThought } from '../../services/thoughts-service.js';
import * as style from './ThoughtCarStyles.js';

// const thoughts = [
//   {
//     title: 'Another Lorem, another ipsum',
//     content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//     Pellentesque leo lorem, mattis sit amet varius ut, convallis quis felis. Morbi semper at orci nec hendrerit.
//     Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
//     Donec ligula erat, eleifend nec consequat id, semper condimentum tellus. Pellentesque bibendum ultrices orci.
//     Nulla elementum eros congue auctor pretium. Ut cursus mollis augue sit amet convallis.
//     Ut bibendum facilisis mattis. Donec malesuada justo at bibendum fermentum.`,
//     mood: '👻'
//   },
//   {
//     title: 'Another Lorem, another ipsum',
//     content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//     Pellentesque leo lorem, mattis sit amet varius ut, convallis quis felis. Morbi semper at orci nec hendrerit.
//     Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
//     Donec ligula erat, eleifend nec consequat id, semper condimentum tellus. Pellentesque bibendum ultrices orci.
//     Nulla elementum eros congue auctor pretium. Ut cursus mollis augue sit amet convallis.
//     Ut bibendum facilisis mattis. Donec malesuada justo at bibendum fermentum.`,
//     mood: '🥺'
//   },
//   {
//     title: 'Another Lorem, another ipsum',
//     content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//     Pellentesque leo lorem, mattis sit amet varius ut, convallis quis felis. Morbi semper at orci nec hendrerit.
//     Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
//     Donec ligula erat, eleifend nec consequat id, semper condimentum tellus. Pellentesque bibendum ultrices orci.
//     Nulla elementum eros congue auctor pretium. Ut cursus mollis augue sit amet convallis.
//     Ut bibendum facilisis mattis. Donec malesuada justo at bibendum fermentum.`,
//     mood: '🥰'
//   },

// ];
  
// user friends

function ThoughtCarousel ({ thoughts }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = thoughts.length;
  const [edit, setEdit] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [title, setTitle] = useState('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
    
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const editHandler = (newContent, newTitle) => {
    if (newContent && newTitle) {
      editThought({ ...thoughts[activeStep], content: newContent, title: newTitle });
      console.log('Successssss');
    } 
  };

  return (
    <Box sx={style.sideBoxStyleBlue}>
      <Paper sx={style.boxStyleWhite}>
        {!edit?
          <Typography sx={style.titleStyle} align="center" >{thoughts[activeStep]?.title}</Typography>:
          <TextField placeholder='Some text here' defaultValue={thoughts[activeStep]?.title} onChange={(e) => setTitle(e.target.value)}></TextField>
        }
        {edit?
          <Box sx={style.buttonBoxStyle}>
            <Button onClick={() => editHandler(textInput, title)}>DONE</Button>
            <Button onClick={() => {setEdit(!edit);}}>CANCEL</Button>
          </Box>:
          <Box sx={style.buttonBoxStyle}>
            <Button onClick={() => editHandler(textInput, title)}>DELETE</Button>
            <Button onClick={() => {setEdit(!edit);}}>EDIT</Button>
          </Box>
        }
        
        <Box>
          {!edit?
            <Typography sx={style.bodyStyle}>{thoughts[activeStep]?.content}</Typography>:
            <textarea style={style.textAreaStyle} placeholder='Some text here' 
              defaultValue={thoughts[activeStep].content} onChange={(e) => setTextInput(e.target.value)}></textarea>
          }
        </Box>
        <Typography sx={{ alignSelf: 'center', m: '1rem' }} variant='h3' >{thoughts[activeStep]?.mood}</Typography>
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

export default ThoughtCarousel;