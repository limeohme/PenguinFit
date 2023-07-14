import { KeyboardDoubleArrowDown } from '@mui/icons-material';
import { Avatar, Box, Button, Menu, MenuItem, MenuList } from '@mui/material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppState from '../../../providers/app-state';
import SignOut from '../SignOut/SignOut';


function DropMenu () {
  const [anchor, setAnchor] = useState(null);
  const { appState: { user } } = useContext(AppState);
  const open = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  return (
    <Box>
      <Button
        id="drop-menu-button"
        aria-controls={open ? 'drop-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        size="large"
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardDoubleArrowDown />}
      >{user?<Avatar alt={user.username} src={user.avatarURL}></Avatar>: ''}</Button>
      <Menu
        
        id='drop-menu'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'drop-menu-button',
        }}
        anchorEl={anchor}
        open={open}
        onClick={handleClose}
        sx={{ maxHeight: 1,
          width: 1, top: 0, left: 0 }}
      > <MenuList  sx={{ width: '6rem' }}>
          <MenuItem component={Link} to='home'>Home</MenuItem>
          <MenuItem component={Link} to='private/dashboard'>Dash</MenuItem>
          <MenuItem component={Link} to='private/profile'>Profile</MenuItem>
          <MenuItem><SignOut/></MenuItem>
        </MenuList>
      </Menu>
    </Box>
    
  );
}

export default DropMenu;