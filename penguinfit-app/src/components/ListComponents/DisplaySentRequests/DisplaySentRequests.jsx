// import { Avatar, Chip } from '@mui/material';
import { Stack } from '@mui/system';
import { deleteFriendRequest } from '../../../services/friends-service';
import SingleFriendContainerView from '../../SingleViewComponent/SingleFriendView/SingleFriendView';

export default function DisplaySentRequests({ requests }) {
  return (
    <Stack direction="column" spacing={1}>
      { requests.map(el => <SingleFriendContainerView
        key={el.receiver}
        avatar={ el.receiver[0] }
        text={ el.receiver}
        handleDelete={() => deleteFriendRequest(el.sender, el.receiver)}
      />) }
    </Stack>
  );
}