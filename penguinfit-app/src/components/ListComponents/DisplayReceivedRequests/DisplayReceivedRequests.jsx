// import { Avatar, Chip } from '@mui/material';
import { Stack } from '@mui/system';
import { acceptFriendRequest, deleteFriendRequest } from '../../../services/friends-service';
import SingleFriendContainerView from '../../SingleViewComponent/SingleFriendView/SingleFriendView';

export default function DisplayReceivedRequests({ requests }) {
  return (
    <Stack direction="column" spacing={1}>
      { requests.map(el => <SingleFriendContainerView
        key={el.sender}
        avatar={ el.sender[0] }
        text={ el.sender}
        handleDelete={() => deleteFriendRequest(el.sender, el.receiver)}
        handleAdd={() => acceptFriendRequest(el.sender, el.receiver)}
      />) }
    </Stack>
  );
}