// import './App.css';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AppState from './providers/app-state';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import { getLoggedUser, getLoggedUserAuth } from './services/local-storage-service';
import Authenticated from './hoc/Authenticated';
// import AuthenticatedAdmin from './hoc/AuthenticatedAdmin';

import Home from './views/Home/Home';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Private from './views/Private/Private';
import NotFound from './views/NotFound/NotFound';

import { DRAWER_WIDTH } from './common/constants.js';
import { Box, CssBaseline, Toolbar, useMediaQuery, useTheme } from '@mui/material';

const useStyles = (theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // backgroundColor: '#6633ff',
    backgroundColor: 'transparent',
    borderBottom: '3px solid black',
    // paddingTop: '50px',
    color: 'black',
    width: '95vw',
    left: '2.5vw'
  },
  drawer: {
    flexShrink: 0,
    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  footerStyle: {
    color: 'white',
    backgroundColor: 'black',
    borderTop: '2px solid black',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '10vh',
    zIndex: theme.zIndex.drawer + 1
    // margin: '0 2em'
    // boxSizing: 'border-box',
    // padding: '0 2em'
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
  const classes = useStyles(theme);
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <BrowserRouter>
      <AppState.Provider value={{ appState, setState }}>
        <CssBaseline />
        <Navbar classes={classes} toggleDrawer={toggleDrawer} />

        <Box
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2em', alignSelf: 'center', minHeight: '90vh', minWidth: '100%', margin: '0 2em' }}
        >
          <Toolbar />
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
