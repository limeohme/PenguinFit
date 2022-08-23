import { Box ,Badge, Popover, Typography } from '@mui/material';
import { useState } from 'react';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

export default function NotificationsPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  const id = open ? 'notifications-popover' : undefined;
  
  return (
    <Box sx={{ mr: 1 }}>
      <Badge badgeContent={4} color="primary" onClick={(event) => handleClick(event)}>
        <NotificationsOutlinedIcon color="action" />
      </Badge>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </Box>
  );
}