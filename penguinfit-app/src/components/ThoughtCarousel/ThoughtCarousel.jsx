import { useTheme } from '@emotion/react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, MobileStepper, Button, Typography, Paper, TextField, } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AppState from '../../providers/app-state.js';
import { deleteThought, editThought, getLiveThoughts } from '../../services/thoughts-service.js';
import * as style from './ThoughtCarStyles.js';


function ThoughtCarousel () {
  const theme = useTheme();
  const { appState, _setState } = useContext(AppState);
  const [activeStep, setActiveStep] = useState(0);
  const [edit, setEdit] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [thoughts, setThoughts] = useState([]);
  const maxSteps = thoughts.length;

  useEffect(() => {
    const unsub = getLiveThoughts(appState.user.username, (snapshot) => {
      setThoughts(Object.values(snapshot.val()));
    });

    return unsub;
  }, [appState.user.username]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
    
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const editHandler = (newContent, newTitle) => {
    if (newContent && newTitle) {
      messageHandler('Thought updated!');
      setEdit(!edit);
      return editThought(appState.user.username, { ...thoughts[activeStep], content: newContent, title: newTitle });
    } else if (newContent && !newTitle) {
      messageHandler('Thought updated!');
      setEdit(!edit);
      return editThought(appState.user.username, { ...thoughts[activeStep], content: newContent });
    } else if (newTitle && !newContent) {
      messageHandler('Thought updated!');
      setEdit(!edit);
      return editThought(appState.user.username, { ...thoughts[activeStep], title: newTitle });
    }

    return messageHandler('No changes were made here...');
  };

  const deleteHandler = () => {
    deleteThought(appState.user.username, thoughts[activeStep]?.id);
    if (activeStep !== 0) handleBack();
    messageHandler('Deleted!');
  };

  const messageHandler = (msg) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage('');
    }, 2600);
  };

  return (
    <Box sx={style.sideBoxStyleBlue}>
      { thoughts.length? <Paper sx={style.boxStyleWhite}>
        {!edit?
          <Typography sx={style.titleStyle} align="center" >{thoughts[activeStep]?.title}</Typography>:
          <TextField placeholder='Some text here' defaultValue={thoughts[activeStep]?.title}
            onChange={(e) => setTitle(e.target.value)}></TextField>
        }
        {edit?
          <Box sx={style.buttonBoxStyle}>
            <Button onClick={() => editHandler(textInput, title)}>DONE</Button>
            <Button onClick={() => {setEdit(!edit);}}>CANCEL</Button>
          </Box>:
          <Box sx={style.buttonBoxStyle}>
            <Button onClick={deleteHandler}>DELETE</Button>
            <Button onClick={() => {setEdit(!edit);}}>EDIT</Button>
          </Box>
        }
        <Typography sx={style.messageStyle} align="center" >{message}</Typography>
        <Box>
          {!edit?
            <Typography sx={{ ...style.bodyStyle, color: thoughts[activeStep]?.colour }}>{thoughts[activeStep]?.content}</Typography>:
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