import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { sidebarPages } from '../../../common/sidebar-pages';

function Sidebar({ classes, toggleDrawer, open, isMdUp }) {
  const { pathname } = useLocation();

  return (
    <Drawer
      sx={classes.drawer}
      variant={isMdUp ? 'permanent' : 'temporary'}
      anchor="left"
      open={open}
      onClose={toggleDrawer}
    >
      <Toolbar>
        {!isMdUp? <Typography variant="h4" sx={{ mr: 'auto' }}>PenguinFit</Typography> : null}
      </Toolbar>
      <List>
        {Object.entries(sidebarPages).map(([key, value]) => (
          <ListItemButton key={key} component={NavLink} to={key} selected={pathname === `/private/${key}`} sx={classes.sideLink}>
            <ListItemText primary={value} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );

}

export default Sidebar;
