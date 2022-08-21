// import { Avatar, Chip } from '@mui/material';
import { Stack } from '@mui/system';
import SingleFriendView from '../SingleFriendView/SingleFriendView';

export default function DisplayFriends({ friends, username }) {

  return (
    <Stack direction="column" spacing={1}>
      {friends.map(el => <SingleFriendView
        key={el.username}
        friend={el}
        user={username}
      />)}
    </Stack>
  );
}