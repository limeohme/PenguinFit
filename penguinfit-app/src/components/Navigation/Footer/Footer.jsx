// import './Footer.css';
import { Grid, Typography } from '@mui/material';

const styleLinks = { color: '#FED101', textDecoration: 'none' };
function Footer({ classes }) {
  return (
    <Grid container direction="column" sx={classes.footerStyle} justifyContent="space-between" alignItems="center">
      
      <Grid container item alignItems="center">
        <Typography variant="h6" sx={{ pl:2, fontSize: 15 }}>
          made by B L M 🤪
          <span className="divider">|</span> powered by{' '}
          <a href="https://firebase.google.com/" style={styleLinks}>Firebase</a>, enhanced with{' '}
          <a href="https://avatars.dicebear.com/" style={styleLinks}>DiceBear</a> and{' '}
          <a href="https://www.edamam.com/" style={styleLinks}>Edamam</a>
        </Typography>
      </Grid>

      <Grid container item alignItems="center">
        <Typography variant="h6" sx={{ pl:2, fontSize: 15 }}>
          <a href="https://www.telerikacademy.com/" style={styleLinks}>Telerik Academy</a> JS A37 2022
        </Typography>
      </Grid>
      
      
      
    </Grid>
  );
  // return (
  //   <footer>
  //     <div className="made">
  //       made by <a href="#">B</a> <a href="#">L</a> <a href="#">M</a> 🤪
  //     </div>
  //     <div className="powered">
  //       <span className="divider">|</span> powered by{' '}
  //       <a href="https://firebase.google.com/">Firebase</a>, enhanced with{' '}
  //       <a href="https://avatars.dicebear.com/">DiceBear</a>
  //     </div>
  //     <div className="for">
  //       <span className="divider">|</span> for{' '}
  //       <a href="https://www.telerikacademy.com/">Telerik Academy</a> JS A37
  //       2022
  //     </div>
  //   </footer>
  // );
}

export default Footer;
