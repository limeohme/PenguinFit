// import './Navbar.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppState from '../../providers/app-state';
import { AppBar, IconButton, Button, Toolbar, Typography } from '@mui/material';
import DropMenu from '../DropMenu/DropMenu';
// import MenuIcon from '@mui/icons-material/Menu';

// import { APP_TITLE } from '../../common/constants';
// import { publicPages, userPages } from '../../common/pages';
// import { renderPublicLinks, renderUserLinks } from '../../utils/utils';
// import { removeUserFromStorage } from '../../services/local-storage-service';
// import { userRole } from '../../common/user-role';

function Navbar({ classes, toggleDrawer }) {
  const { appState:{ user } } = useContext(AppState);
  // maybe put open setOpen in appState

  // maybe have the IconBtn btn in a component UserMenuBtn
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

  // maybe have the login btn in a component SignIn (maybe also rename components to Login/Logout)
  const renderLoginLogout = () => {
    return(
      user
        ? <DropMenu></DropMenu>
        : <Button 
          component={Link} 
          to="/login" 
          variant="contained"
          // disableElevation
          sx={{ backgroundColor:'#6633ff' }}
        >Login</Button>
    );
  };

  // OR maybe have both functions as btn components?

  return (
    <AppBar position="fixed" sx={classes.appBar} elevation={0}>
      <Toolbar>
        {renderUserMenuBtn()}
        <Typography variant="h4" sx={{ mr: 'auto' }}>PenguinFit</Typography>
        {renderLoginLogout()}
      </Toolbar>
      {/* <Divider variant="middle" sx={{ height: '3px', backgroundColor: '#ffffff' }}></Divider> */}
    </AppBar>
  );
}

export default Navbar;
