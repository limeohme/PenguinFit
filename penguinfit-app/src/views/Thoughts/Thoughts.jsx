
import { Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import * as _style from './ThoughtsStyles.js';
import ThoughtCarousel from '../../components/Navigation/ThoughtCarousel/ThoughtCarousel.jsx';
import CreateNewThought from '../../components/FormsComponents/CreateNewThought/CreateNewThought.jsx';

function Thoughts () {
  const [colour, setColour] = useState('');
    
  return (
    <Grid container direction="column" justifyContent="center" gap={2} alignItems="center" sx={{ mt: '2rem', padding: '24px' }}>
      <Grid item>
        <Typography variant='h5' sx={{ pb:2 }}>New thought:</Typography>
        <Paper sx={{ backgroundColor: '#ffffff75' }}>
          <CreateNewThought colour={colour} setColour={setColour}></CreateNewThought>
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ backgroundColor: '#ffffff75' }}>
          <ThoughtCarousel colour={colour} />

        </Paper>
      </Grid> 
    </Grid>
    
  );
}

export default Thoughts;

