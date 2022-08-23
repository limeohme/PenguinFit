import { Typography } from '@mui/material';

export default function NoDataYet () {
  return (
    <>
      <Typography variant='h4' >No data here yet...</Typography>
      <img alt='Pingu' src='https://gitlab.com/limeohme/theoretical-preparation/-/raw/main/images/PinguBlush.png' 
        style={{ maxHeight: '300px', paddingTop: 5 }}/>
    </>
  );
}