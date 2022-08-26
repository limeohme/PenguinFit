
import { Grid } from '@mui/material';
import { useState } from 'react';
import * as style from './ThoughtsStyles.js';
import ThoughtCarousel from '../../components/Navigation/ThoughtCarousel/ThoughtCarousel.jsx';
import CreateNewThought from '../../components/FormsComponents/CreateNewThought/CreateNewThought.jsx';

function Thoughts () {
  const [colour, setColour] = useState('');
    
  return (
    <Grid container direction="row" gap={40} justifyContent="center" alignItems="end" sx={{ mt: '4rem' }}>
      <Grid item  sx={style.midiContainerStyle}>
        <CreateNewThought colour={colour} setColour={setColour}></CreateNewThought>
      </Grid>
      <Grid item sx={style.midiContainerStyle}>
        <ThoughtCarousel colour={colour} />
      </Grid>
    </Grid>
    
  );
}

export default Thoughts;

