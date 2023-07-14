import { equalTo, get, limitToLast, onValue, orderByChild, query, ref, } from 'firebase/database';
import { FAKE_BMR } from '../common/constants';
import { db } from '../config/firebase-config';
import { getDateAsString } from '../utils/utils';

export const getGoalsDistribution = (user) => {
  return get(ref(db, `users/${user}/goalsStatus`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const goalsCount = snapshot.val();
        const data = [
          { x: 'achieved', y: goalsCount.achieved },
          { x: 'not yet', y: goalsCount.notYet }
        ];
        return data;
      }
      return [{ x: 'No data', y: 10 }, { x: 'Log something', y: 50 }];
    }).catch(console.error);
};
export const getNutrientDistribution = (user) => {
  return get(ref(db, `users/${user}/nutrients`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const nutrientsCount = snapshot.val();
        const data = [
          { x: 'carbs', y: nutrientsCount.carbs },
          { x: 'fats', y: nutrientsCount.fats },
          { x: 'protein', y: nutrientsCount.protein },
        ];
        return data;
      }
      return [{ x: 'No data', y: 50 }, { x: 'Log something', y: 10 }];
    }).catch(console.error);
  
};
  
export const getStatsToday = (user, listen) => {
  return onValue(query(ref(db, `users/${user}/dataByDay`), orderByChild('date'), equalTo(getDateAsString(new Date()))), listen);
};
  
export const getExerciseDurationByDate = (user) => {
  return get(query(ref(db, `users/${user}/dataByDay`), orderByChild('dateVal'), limitToLast(14)),)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val())
          .sort((a, b) => a.dateVal - b.dateVal)
          .filter(el => Date.now() - 1209600000 > el.dateVal)
          .map((el) => {
            return { x: el.date.split(' ')[2], y: el.totalActivityDuration };
          });
      } else {
        return [{ x: 'No data yet', y: 20 }];
      }
    }).catch(console.error);
  
};
  
export const getCalorieDifferenceByDate = (user) => {
  return get(query(ref(db, `users/${user}/dataByDay`), orderByChild('dateVal'), limitToLast(14)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val())
          .sort((a, b) => a.dateVal - b.dateVal)
          .filter(el => Date.now() - 1209600000 > el.dateVal)
          .map((el) => {
            return { x: el.date.split(' ')[2], y: el.cal.consumed - el.cal.burned - FAKE_BMR };
          });
      } else {
        return [{ x: 'No data yet', y: 20 }];
      }
    }).catch(console.error);
  
};


