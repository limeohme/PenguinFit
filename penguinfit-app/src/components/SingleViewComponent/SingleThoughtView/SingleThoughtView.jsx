import { Button, TextField, Typography, Box  } from '@mui/material';
import { useContext } from 'react';
import { useState } from 'react';
import AppState from '../../../providers/app-state';
import { deleteThought, editThought } from '../../../services/thoughts-service';
import * as style from './SingleThoughtStyles.js';

export default function SingleThoughtView ({ thought, activeStep, handleBack }) {
  const { appState, _setState } = useContext(AppState);
  const [textInput, setTextInput] = useState('');
  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState('');

  const messageHandler = (msg) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage('');
    }, 2600);
  };
  
  const editHandler = (newContent, newTitle) => {
    if (newContent && newTitle) {
      messageHandler('Thought updated!');
      setEdit(!edit);
      return editThought(appState.user.username, { ...thought, content: newContent, title: newTitle });
    } else if (newContent && !newTitle) {
      messageHandler('Thought updated!');
      setEdit(!edit);
      return editThought(appState.user.username, { ...thought, content: newContent });
    } else if (newTitle && !newContent) {
      messageHandler('Thought updated!');
      setEdit(!edit);
      return editThought(appState.user.username, { ...thought, title: newTitle });
    }

    return messageHandler('No changes were made here...');
  };

  const deleteHandler = () => {
    deleteThought(appState.user.username, thought?.id);
    if (activeStep !== 0) handleBack();
    messageHandler('Deleted!');
  };

  return (
    <>
      {!edit?
        <Typography variant='h4' sx={style.titleStyle} align="center" >{thought?.title}</Typography>:
        <TextField placeholder='Some text here' defaultValue={thought?.title}
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
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {!edit?
          <Typography sx={{ color: thought?.colour, maxWidth: '500px' }}>{thought?.content}</Typography>:
          <textarea style={style.textAreaStyle} placeholder='Some text here'
            defaultValue={thought.content} onChange={(e) => setTextInput(e.target.value)}></textarea>
        }
      </Box>
      <Typography sx={{ alignSelf: 'center', m: '1rem' }} variant='h3' >{thought?.mood}</Typography>
    </>
  );
} 