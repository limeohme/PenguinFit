// import './Navbar.css';
// import { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import AppState from '../../providers/app-state';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { sidebarPages } from '../../../common/sidebar-pages';
// import MenuIcon from '@mui/icons-material/Menu';

function Sidebar({ classes, toggleDrawer, open, isMdUp }) {

  return (
    <Drawer
      sx={classes.drawer}
      variant={isMdUp ? 'permanent' : 'temporary'}
      anchor="left"
      open={open}
      onClose={toggleDrawer}
    >
      <Toolbar />
      {/* <Divider /> */}
      <List>
        {Object.entries(sidebarPages).map(([key, value]) => (
          <ListItem button key={key} component={NavLink} to={key}>
            <ListItemText primary={value} />
          </ListItem>
        ))}
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>

      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );

}

export default Sidebar;
