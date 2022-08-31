import { Autocomplete, Box, Button, FormHelperText, Grid, TextField } from '@mui/material';
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
      setTimeout(() =>{
        setMessage('');
      }, 2600);
    }
    
  };

  return (
    <Grid container direction='row' sx={style.wrapperContainerStyle}>
      <Grid item xs sx={style.midiContainerStyle}>
        <Box sx={style.sideBoxStyle}>
          <TextField placeholder="what's your thought called..." fullWidth value={title} onChange={(e) => setTitle(e.target.value)}></TextField>
          <FormHelperText sx={{ color: '#d81b60' }}>{message}</FormHelperText>
          <Autocomplete
            fullWidth
            disablePortal
            options={moods}
            value={mood}
            sx={{ my: '1rem' }}
            onInputChange={(_, newInputValue) => {
              setMood(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Mood" />}
          />
          <Button onClick={() => {entryHandler(title, textInput);}}>SAVE THOUGHT</Button>
        </Box>
      </Grid>
      <Grid item xs sx={style.midiContainerStyle}>
        <Button onClick={() => {setColour(colour? '':'#d81b60'); colourHandler();}}>{colour? 'REMOVE COLOUR':'COLOUR IT'}</Button>
        <TextField fullWidth multiline  minRows={8} maxRows={16} style={style.textAreaStyle} placeholder='spill some thoughts here...' 
          value={textInput} onChange={(e) => setTextInput(e.target.value)}></TextField>
      </Grid>
    </Grid>
  );

}

export default CreateNewThought;