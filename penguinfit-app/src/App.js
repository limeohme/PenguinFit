import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AppState from './providers/app-state';

import Navbar from './components/Navigation/Navbar/Navbar';
import Footer from './components/Navigation/Footer/Footer';

import { getLoggedUser, getLoggedUserAuth } from './services/local-storage-service';
import Authenticated from './hoc/Authenticated';

import Home from './views/Home/Home';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Private from './views/Private/Private';
import NotFound from './views/NotFound/NotFound';

import { DRAWER_WIDTH } from './common/constants.js';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';

const useStyles = (theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'transparent',
    color: 'black'
  },
  drawer: {
    flexShrink: 0,
    color: 'white',
    '& .MuiDrawer-paper': { boxSizing: 'border-box', borderWidth: 0, width: DRAWER_WIDTH, backgroundColor: '#FED101', pl: 6, boxShadow: '0px 3px 10px 3px #00000025' }
  },
  menuButton: {
    marginRight: 'auto',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  outlet: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center',
    minHeight: '100vh',
    minWidth: '100%',
    margin: '0 2em'
  },

  footerStyle: {
    color: 'white',
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '15vh',
    zIndex: theme.zIndex.drawer + 1
  },
  sideLink: {
    '.Mui-selected': {
      border: '10px solid red'
    }
  }
});

function App() {
  const [appState, setState] = useState({
    user: getLoggedUser(),
    userAuthData: getLoggedUserAuth()
  });

  const [open, setOpen] = useState(false);
  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(!open);
  };

  const theme = useTheme();

  theme.palette.primary = {
    ...theme.palette.primary,
    main: '#6633ff',
    dark: '#000'
  };

  const classes = useStyles(theme);
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <BrowserRouter>
      <AppState.Provider value={{ appState, setState }}>
        <CssBaseline />
        <Navbar classes={classes} toggleDrawer={toggleDrawer} isMdUp={isMdUp} />

        <Box component="main" sx={classes.outlet}>
          <Routes>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home isMdUp={isMdUp} />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route
              path="private/*"
              element={
                <Authenticated>
                  <Private classes={classes} toggleDrawer={toggleDrawer} open={open} isMdUp={isMdUp} />
                </Authenticated>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>

        <Footer classes={classes} />
      </AppState.Provider>
    </BrowserRouter>
  );
}

export default App;
