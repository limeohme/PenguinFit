import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import AppState from '../../providers/app-state.js';
import { createThought } from '../../services/thoughts-service.js';
import * as style from './TextEditorStyles.js';


function TextEditor ({ colour, setColour }) {
  const { appState, _setState } = useContext(AppState);
  const [textInput, setTextInput] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const colourHandler = () => {
    !colour? setMessage('It shall be colourful!'):setMessage('It shall be plain!');

    setTimeout(() =>{
      setMessage('');
    }, 2600);
  };

  const entryHandler = (postTitle, body) => {
    if (postTitle && body) createThought(appState.user.username, 
      { title: postTitle, content: body, author: appState.user.username, colour: colour, mood: '👻'  });
    setMessage('Thought saved!');

    setTimeout(() =>{
      setMessage('');
    }, 2600);
  };

  return (
    <Grid container direction='column' sx={style.wrapperContainerStyle}>
      <Grid item xs sx={style.midiContainerStyle}>
        <Box sx={style.sideBoxStyleGreen}>
          <TextField placeholder="what's your thought called..." value={title} onChange={(e) => setTitle(e.target.value)}></TextField>
          <Button onClick={() => {setColour(colour? '':'purple'); colourHandler();}}>{colour? 'REMOVE COLOUR':'COLOUR IT'}</Button>
          <Typography sx={style.messageStyle}>{message}</Typography>
          <textarea style={style.textAreaStyle} placeholder='spill some thoughts here...' value={textInput} onChange={(e) => setTextInput(e.target.value)}></textarea>
          <Button onClick={() => {entryHandler(title, textInput); setTitle(''); setTextInput('');}}>SAVE THOUGHT</Button>
        </Box>
      </Grid>
      <Grid item xs sx={style.midiContainerStyle}>
      </Grid>
    </Grid>
  );

}

export default TextEditor;