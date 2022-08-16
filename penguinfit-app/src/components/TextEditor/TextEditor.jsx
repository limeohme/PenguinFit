import { Box, Button, Grid, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import AppState from '../../providers/app-state.js';
import { createThought } from '../../services/thoughts-service.js';
import * as style from './TextEditor.js';


function TextEditor ({ colour, setColour }) {
  const { appState, _setState } = useContext(AppState);
  const [textInput, setTextInput] = useState('');
  const [title, setTitle] = useState('');
  
  const entryHandler = (postTitle, body) => {
    if (postTitle && body) createThought(appState.user.username, { title: postTitle, content: body, author: appState.user.username });
  };
  return (
    <Grid container direction='column' sx={style.wrapperContainerStyle}>
      <Grid item xs sx={style.midiContainerStyle}>
        <Box sx={style.sideBoxStyleGreen}>
          <TextField placeholder='Some text here' value={title} onChange={(e) => setTitle(e.target.value)}></TextField>
          <Button onClick={() => setColour(colour? '':'purple')}>COLOUR IT</Button>
          <textarea style={style.textAreaStyle} placeholder='Some text here' value={textInput} onChange={(e) => setTextInput(e.target.value)}></textarea>
          <Button onClick={() => entryHandler(title, textInput)}>SAVE THOUGHT</Button>
        </Box>
      </Grid>
      <Grid item xs sx={style.midiContainerStyle}>
      </Grid>
    </Grid>
  );

}

export default TextEditor;