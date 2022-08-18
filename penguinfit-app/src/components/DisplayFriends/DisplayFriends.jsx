import { Avatar, Chip } from '@mui/material';
import { Stack } from '@mui/system';
import { removeUserFriend } from '../../services/user-service';

export default function DisplayFriends({ friends, username }) {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  
  const handleDelete = (userHandle, toBeRemoved) => {
    console.info(toBeRemoved);
    removeUserFriend(userHandle, toBeRemoved);
  };
  
  return (
    <Stack direction="row" spacing={1}>
      {friends.map(el => <Chip
        label={el}
        avatar={<Avatar>{el[0]}</Avatar>}
        onClick={handleClick}
        onDelete={() => handleDelete(username ,el)}
      />)}
    </Stack>
  );
}