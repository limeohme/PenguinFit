// import { Avatar, Chip } from '@mui/material';
import { Stack } from '@mui/system';
import { removeUserFriend } from '../../../services/user-service';
import SingleFriendContainerView from '../../SingleViewComponent/SingleFriendView/SingleFriendView';

export default function DisplayFriends({ friends, username }) {

  return (
    <Stack direction="column" spacing={1}>
      {friends.map(el => <SingleFriendContainerView
        key={el.username}
        avatar={ el.avatarURL }
        text={ el.username}
        handleDelete={() => removeUserFriend(username, el.username)}
      />)}
    </Stack>
  );
}