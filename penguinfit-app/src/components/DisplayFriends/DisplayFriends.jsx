import { Avatar, Chip } from '@mui/material';
import { Stack } from '@mui/system';

export default function DisplayFriends({ friends }) {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  
  return (
    <Stack direction="row" spacing={1}>
      {friends.map(el => <Chip
        label={el}
        avatar={<Avatar>{el[0]}</Avatar>}
        onClick={handleClick}
        onDelete={handleDelete}
      />)}
    </Stack>
  );
}