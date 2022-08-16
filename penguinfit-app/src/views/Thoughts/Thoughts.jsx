
import { Grid } from '@mui/material';
import { useState } from 'react';
import SingleThought from '../../components/ThoughtCarousel/ThoughtCarousel.jsx';
import TextEditor from '../../components/TextEditor/TextEditor.jsx';

import * as style from './ThoughtsStyles.js';

function Thoughts () {
  const [colour, setColour] = useState('');
  
  return (
    <Grid container direction="row" sx={style.containerStyle}>
      <Grid item xs sx={style.midiContainerStyle}>
        <TextEditor colour={colour} setColour={setColour}></TextEditor>
      </Grid>
      <Grid item xs sx={style.midiContainerStyle}>
        <SingleThought/>
      </Grid>
    </Grid>
    
  );
}

export default Thoughts;

