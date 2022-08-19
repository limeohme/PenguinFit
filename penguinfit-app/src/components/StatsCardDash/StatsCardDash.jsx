import { CardActions, CardContent, Typography, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCaloriesToday, getStepsToday } from '../../services/dashboard-service.js';
import * as style from './StatsCardDashStyles.js';

export default function StatsCardDash ({ type, IconComponent, water, }) {

  const [cals, setCals] = useState(0);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    getCaloriesToday().then((res) => setCals(res));
    getStepsToday().then((res) => setSteps(res));
  }, []);

  const chooseContent = () => {
    if (type === 'cals') {
      return cals;
    } else if (type === 'water') {
      return water;
    } else if (type === 'steps') {
      return steps;
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
          {/* <Button size='small' onClick={() =>{ addWater('BabyPenguin78'); setWater(water + 250);}}>+</Button> */}
        </CardActions>
        : ''
      }
    </Card>
  );
}
