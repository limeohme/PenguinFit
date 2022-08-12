import './App.css';
import { useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AppState from './providers/app-state';

import Home from './views/Home/Home';
import Private from './views/Private/Private';
import NotFound from './views/NotFound/NotFound';
// import Footer from './components/Footer/Footer';
// import Profile from './views/Profile/Profile';
import Login from './views/Login/Login';
import Register from './views/Register/Register';

import { getLoggedUser, getLoggedUserAuth } from './services/local-storage-service';

// import Authenticated from './hoc/Authenticated';
// import AuthenticatedAdmin from './hoc/AuthenticatedAdmin';

import { CssBaseline, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { DRAWER_WIDTH } from './common/constants.js';
import { Box } from '@mui/system';
import Profile from './views/testProfile';
import Dashboard from './views/Dashboard/Dashboard';
import Activities from './views/testActivities';
import Meals from './views/testMeals';
import Goals from './views/Goals/Goals';

const useStyles = (theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
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
  }
});

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex'
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1
//   },
//   drawer: {
//     flexShrink: 0,
//     width: DRAWER_WIDTH
//   },
//   drawerPaper: {
//     width: DRAWER_WIDTH
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('md')]: {
//       display: 'none'
//     }
//   },
//   toolbar: {
//     ...theme.mixins.toolbar,
//     [theme.breakpoints.down('sm')]: {
//       display: 'none'
//     }
//   },
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing(3)
//   }
// }));

function App() {
  const [appState, setState] = useState({
    user: getLoggedUser(),
    userAuthData: getLoggedUserAuth() || null
  });

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const classes = useStyles(theme);
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(!open);
  };

  const margin = isMdUp ? '230px' : 0;

  return (
    <BrowserRouter>
      <AppState.Provider value={{ appState, setState }}>
        {/* <Grid container> */}
        <CssBaseline />
        <Navbar classes={classes} toggleDrawer={toggleDrawer} />
        <Sidebar classes={classes} toggleDrawer={toggleDrawer} open={open} isMdUp={isMdUp} />
        <Box sx={{ ml: `${margin}` }}>
          <Toolbar />
          <Routes>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="private" element={<Private />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="activities" element={<Activities />} />
            <Route path="meals" element={<Meals />} />
            <Route path="goals" element={<Goals />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* <Routes>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="posts" element={<Authenticated><Posts /></Authenticated>} />
              <Route path="create-post" element={<Authenticated><CreatePost /></Authenticated>} />
              <Route path="posts/:postId" element={<Authenticated><PostDetailed /></Authenticated>} />
              <Route path="deleted" element={<Authenticated><DeletedPost /></Authenticated>} />
              <Route
                path="profile"
                element={
                  <Authenticated>
                    <Profile />
                  </Authenticated>
                }
              />
              <Route path="users" element={<AuthenticatedAdmin><Users /></AuthenticatedAdmin>} />
              <Route path="users/:username" element={<Authenticated><UserDetailed /></Authenticated>} />
              <Route path="*" element={<NotFound />} />
            </Routes> */}
        </Box>
        {/* <Footer /> */}
        {/* </Grid> */}
      </AppState.Provider>
    </BrowserRouter>
  );
}

export default App;
