import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { getCaloriesToday, getStepsToday } from '../../views/Dashboard/DashMockData';
import * as style from './StatsCardDashStyles.js';

export default function StatsCardDash ({ type, IconComponent, water, addWater, setWater }) {

  const chooseContent = () => {
    if (type === 'cals') {
      return `${getCaloriesToday('BabyPenguin78')} kcal`;
    } else if (type === 'water') {
      return water;
    } else if (type === 'steps') {
      return getStepsToday('BabyPenguin78');
    }
    return '';
  };
  return (
    <Card sx={style.cardsStyle}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
        <IconComponent sx={style.iconsStyle} />
        <Typography sx={{ alignSelf: 'center', my: '1rem' }} variant="h5" component="div">{chooseContent()}</Typography>
      </CardContent>
      {type === 'water'? 
        <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
          <Button size='small' onClick={() =>{ addWater('BabyPenguin78'); setWater(water + 250);}}>+</Button>
        </CardActions>
        : ''
      }
    </Card>
  );
}
