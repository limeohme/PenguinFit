import { Box } from '@mui/system';
import { Route, Routes } from 'react-router';
import { DRAWER_WIDTH } from '../../common/constants';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import Activities from '../Activities/Activities';
import Dashboard from '../Dashboard/Dashboard';
import Goals from '../Goals/Goals';
import Meals from '../Meals/Meals';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
// import Activities from '../testActivities';
import Thoughts from '../Thoughts/Thoughts';

export default function Private({ classes, toggleDrawer, open, isMdUp }) {
  const margin = isMdUp ? `${DRAWER_WIDTH}px` : 0;

  return (
    <>
      <Sidebar classes={classes} toggleDrawer={toggleDrawer} open={open} isMdUp={isMdUp} />
      
      <Box sx={{ ml: `${margin}`, flex:1 }}>
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="activities" element={<Activities />} />
          <Route path="meals" element={<Meals />} />
          <Route path="goals" element={<Goals />} />
          <Route path="thoughts" element={<Thoughts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
}