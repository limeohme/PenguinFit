import { Button, CardActions, CardContent, Typography, Card } from '@mui/material';
import { getCaloriesToday, getStepsToday } from '../../views/Dashboard/DashMockData';
import * as style from './StatsCardDashStyles.js';

export default function StatsCardDash ({ type, IconComponent, water, addWater, setWater }) {

  const chooseContent = () => {
    if (type === 'cals') {
      return `${getCaloriesToday('BabyPenguin78')}`;
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
        <Typography sx={{ alignSelf: 'center', mt: '1rem' }} variant="h5" component="div">{chooseContent()}</Typography>
        <Typography variant="h7" sx={{ alignSelf: 'center', mb: '1rem' }} component="div">
          {(() => {
            if (type === 'cals') {
              return 'kcal';
            } else if (type === 'water') {
              return 'ml';
            } else if (type === 'steps') {
              return 'steps';
            }
            return 'meow';
          })()}
        </Typography>
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
