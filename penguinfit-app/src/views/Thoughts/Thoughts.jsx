
import { Grid } from '@mui/material';
import { useState } from 'react';
import TextEditor from '../../components/TextEditor/TextEditor.jsx';

import * as style from './ThoughtsStyles.js';
import ThoughtCarousel from '../../components/ThoughtCarousel/ThoughtCarousel.jsx';

function Thoughts () {
  const [colour, setColour] = useState('');
    
  return (
    <Grid container direction="row" sx={style.containerStyle}>
      <Grid item xs sx={style.midiContainerStyle}>
        <TextEditor colour={colour} setColour={setColour}></TextEditor>
      </Grid>
      <Grid item xs sx={style.midiContainerStyle}>
        <ThoughtCarousel colour={colour} />
      </Grid>
    </Grid>
    
  );
}

export default Thoughts;

