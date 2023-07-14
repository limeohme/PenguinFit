import { Card, CardMedia } from '@mui/material';

export default function NotFound() {
  return (
    <Card sx={{ backgroundColor: 'transparent', p: 2 }} elevation={0}>
      <CardMedia
        component="img"
        height={'600vh'}
        image={require('../../images/404Pingu.png')}
        alt="penguin"
        sx={{ objectFit: 'scale-down', my: '4rem' }}
      />
    </Card>
  );
}
