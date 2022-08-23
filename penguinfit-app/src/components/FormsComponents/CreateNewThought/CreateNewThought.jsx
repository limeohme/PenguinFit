import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { moods } from '../../../common/moods.js';
import AppState from '../../../providers/app-state.js';
import { createThought } from '../../../services/thoughts-service.js';
import { validateThought } from '../../../utils/validations.js';
import * as style from './CreateNewThoughtStyles.js';

function CreateNewThought ({ colour, setColour }) {
  const { appState, _setState } = useContext(AppState);
  const [textInput, setTextInput] = useState('');
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('');
  const [message, setMessage] = useState('');

  const colourHandler = () => {
    !colour? setMessage('It shall be colourful!'):setMessage('It shall be plain!');

    setTimeout(() =>{
      setMessage('');
    }, 2600);
  };

  const entryHandler = (postTitle, body) => {
    try {
      validateThought(postTitle, body);
      createThought(appState.user.username, 
        { title: postTitle, content: body, author: appState.user.username, colour: colour, mood: mood  });
      setMessage('Thought saved!');
      setTitle(''); setTextInput(''); setMood('');
      setTimeout(() =>{
        setMessage('');
      }, 2600);
    } catch (e) {
      setMessage(e.message);
    }
    
  };

  return (
    <Grid container direction='column' sx={style.wrapperContainerStyle}>
      <Grid item xs sx={style.midiContainerStyle}>
        <Typography variant='h5' sx={style.pageTitleStyle}>New thought</Typography>
        <Box sx={style.sideBoxStyle}>
          <TextField placeholder="what's your thought called..." value={title} onChange={(e) => setTitle(e.target.value)}></TextField>
          <Button onClick={() => {setColour(colour? '':'#d81b60'); colourHandler();}}>{colour? 'REMOVE COLOUR':'COLOUR IT'}</Button>
          <Typography sx={style.messageStyle}>{message}</Typography>
          <textarea style={style.textAreaStyle} placeholder='spill some thoughts here...' value={textInput} onChange={(e) => setTextInput(e.target.value)}></textarea>
          <Autocomplete
            disablePortal
            options={moods}
            value={mood}
            sx={{ width: '6rem' }}
            onInputChange={(event, newInputValue) => {
              setMood(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Mood" />}
          />
          <Button onClick={() => {entryHandler(title, textInput);}}>SAVE THOUGHT</Button>
        </Box>
      </Grid>
      <Grid item xs sx={style.midiContainerStyle}>
      </Grid>
    </Grid>
  );

}

export default CreateNewThought;