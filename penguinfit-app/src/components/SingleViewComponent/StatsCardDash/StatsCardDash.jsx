import { CardContent, Typography, Card } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AppState from '../../../providers/app-state.js';

import { getStatsToday } from '../../../services/dashboard-service.js';
import * as style from './StatsCardDashStyles.js';

export default function StatsCardDash ({ type, IconComponent, water }) {
  const { appState:{ user } } = useContext(AppState);
  const [cals, setCals] = useState(0);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const unsub =  getStatsToday(user.username, (snapshot) => {
      if (snapshot.exists()) {
        setSteps(Object.values(snapshot.val())[0].steps);
        setCals(Math.floor(Object.values(snapshot.val())[0].cal.consumed));
      }
    });
    return unsub;
  });


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
    </Card>
  );
}
