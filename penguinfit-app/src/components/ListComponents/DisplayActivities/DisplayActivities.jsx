import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import SingleActivity from '../../SingleViewComponent/SingleActivity/SingleActivity';

export default function DisplayActivities({ activities, username }) {

  return activities.length

    ? <>
      <Typography variant='h5' sx={{ pb:2 }}>Recent activities:</Typography>
      <Stack direction="column-reverse" spacing={1.5}>
        { activities.map(([id, activity]) => (
          <SingleActivity
            key={id}
            activity={activity}
            username={username}
          />
        )) }
      </Stack>
    </>

    : 'No activities yet';
}