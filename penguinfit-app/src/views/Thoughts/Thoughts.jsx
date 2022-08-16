
import { Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import TextEditor from '../../components/TextEditor/TextEditor.jsx';

import * as style from './ThoughtsStyles.js';
import AppState from '../../providers/app-state.js';
import { getLiveThoughts } from '../../services/thoughts-service.js';
import ThoughtCarousel from '../../components/ThoughtCarousel/ThoughtCarousel.jsx';

function Thoughts () {
  const { appState, _setState } = useContext(AppState);
  const [colour, setColour] = useState('');
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    const unsub = getLiveThoughts(appState.user.username, (snapshot) => {
      setThoughts(Object.values(snapshot.val()));
    });

    return unsub;
  }, []);
  
  return (
    <Grid container direction="row" sx={style.containerStyle}>
      <Grid item xs sx={style.midiContainerStyle}>
        <TextEditor colour={colour} setColour={setColour}></TextEditor>
      </Grid>
      <Grid item xs sx={style.midiContainerStyle}>
        <ThoughtCarousel thoughts={thoughts}/>
      </Grid>
    </Grid>
    
  );
}

export default Thoughts;

