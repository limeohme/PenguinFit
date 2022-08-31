import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppState from '../../../providers/app-state';
import { AppBar, IconButton, Button, Toolbar, Typography } from '@mui/material';
import DropMenu from '../DropMenu/DropMenu';

function Navbar({ classes, toggleDrawer }) {
  const { appState:{ user } } = useContext(AppState);
  
  const renderUserMenuBtn = () => {
    return(
      user
        ? <IconButton 
          color="inherit" 
          aria-label="open drawer" 
          edge="start" 
          onClick={toggleDrawer} 
          sx={classes.menuButton}
        >🐧{/* <MenuIcon /> */}</IconButton> 

        : null
    );
  };

  const renderLoginLogout = () => {
    return(
      user
        ? <DropMenu></DropMenu>
        : <Button 
          component={Link} 
          to="/login" 
          variant="contained"
          sx={{ backgroundColor:'#6633ff' }}
        >Login</Button>
    );
  };

  return (
    <AppBar position="fixed" sx={classes.appBar} elevation={0}>
      <Toolbar>
        {renderUserMenuBtn()}
        <Typography variant="h4" sx={{ mr: 'auto' }}>PenguinFit</Typography>
        {renderLoginLogout()}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
