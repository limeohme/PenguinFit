import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import SingleActivityRequest from '../../SingleViewComponent/SingleActivityRequest/SingleActivityRequest';

export default function DisplayActivityRequests({ requests, username }) {

  return requests.length

    ? <>
      <Typography variant='h5' sx={{ pb:2 }}>Activity Requests:</Typography>
      <Stack direction="column-reverse" spacing={1.5}>
        { requests.map(req => (
          <SingleActivityRequest
            key={req.requestHandle}
            activity={req}
            username={username}
          />
        )) }
      </Stack>
    </>

    : null;
}