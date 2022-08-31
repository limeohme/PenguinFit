import { useLocation } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { sidebarPages } from '../../../common/sidebar-pages';

function Sidebar({ classes, toggleDrawer, open, isMdUp }) {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <Drawer
      sx={classes.drawer}
      variant={isMdUp ? 'permanent' : 'temporary'}
      anchor="left"
      open={open}
      onClose={toggleDrawer}
    >
      <Toolbar />
      <List>
        {Object.entries(sidebarPages).map(([key, value]) => (
          <ListItemButton button key={key} component={NavLink} to={key} selected={pathname === `/private/${key}`}>
            <ListItemText primary={value} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );

}

export default Sidebar;
