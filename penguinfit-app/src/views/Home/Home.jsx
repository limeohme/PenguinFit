import { Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home({ isMdUp }) {
  const padding = isMdUp? 10 : 0;

  return(
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      // rowSpacing = {3}
      sx={{ flex: 1, boxSizing: 'border-box', padding: '0 2em', mt: '4rem' }}
    >
      <Grid item xs={12} sm={5}  sx={{ pl: padding, display: 'flex', flexDirection: 'column' }}>

        <Typography variant="h6" sx={{ width: '100%',  }}>
          Stay Fit,<br/>
          Track your progress,
        </Typography>
        <Typography variant="h4" sx={{ width: '100%', color: '#6633ff', mt: 2 }}>
          Become a Master Penguin!
        </Typography>
        <Typography sx={{ width: '100%', mt: 2 }}>
        In our app you can:<br></br>
         ◾ set goals, based on the type of activities you do<br></br>
         ◾ log activities to achieve these goals<br></br>
         ◾ log your meals<br></br>
        We will visualize your progress and behavior to help you become the best penguin you can be!<br></br>
        One small step for a man but a big step for penguins!
        </Typography>
        <Button variant="contained" size="large" component={Link} to='/register'
          sx={{ maxWidth: 'fit-content', backgroundColor:'#6633ff', mt: 4 }}>
          GET STARTED
        </Button>

      </Grid>

      <Grid item xs={12} sm={7}>
        
        <Card sx={{ maxHeight: '75vh', backgroundColor: 'transparent', p:5 }} elevation={0}>
          <CardMedia
            component="img"
            height={isMdUp? '360px' : '100%'}
            image={require('../../images/PenguinNoBack.png')}
            alt="penguin"
            sx={{ objectFit: 'scale-down' }}
          />
        </Card>
        
      </Grid>
      
    </Grid>
  );
}
