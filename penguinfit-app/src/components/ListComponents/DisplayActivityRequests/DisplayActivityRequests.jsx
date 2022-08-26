// import { Avatar, Chip } from '@mui/material';
import { Stack } from '@mui/system';
import { addActivity, declineActivityRequest } from '../../../services/activities-service';
// import { acceptFriendRequest, deleteFriendRequest } from '../../../services/friends-service';
import SingleActivityRequest from '../../SingleViewComponent/SingleActivityRequest/SingleActivityRequest';


export default function DisplayActivityRequests({ requests }) {

  // use ternary, listen in Activities.jsx
  return (
    <Stack direction="column" spacing={1.5}>
      { requests.map(el => <SingleActivityRequest
        key={el.handle}
        request={el}
        handleDelete={() => declineActivityRequest(el.sender, el.receiver)}
        handleAdd={() => addActivity(el.sender, el.receiver)}
      />) }
    </Stack>
  );
}