import { equalTo, get, limitToLast, onValue, orderByChild, query, ref, } from 'firebase/database';
import { FAKE_BMR } from '../common/constants';
import { db } from '../config/firebase-config';
import { getDateAsString } from '../utils/utils';

export const getGoalsDistribution = (user) => {
  return get(ref(db, `users/${user}/goalsStatus`))
    .then((snapshot) => {
      const goalsCount = snapshot.val();
      const data = [
        { x: 'achieved', y: goalsCount.achieved },
        { x: 'not yet', y: goalsCount.notYet }
      ];
      return data;
    }).catch(console.error);
};
export const getNutrientDistribution = (user) => {
  return get(ref(db, `users/${user}/nutrients`))
    .then((snapshot) => {
      const nutrientsCount = snapshot.val();
      const data = [
        { x: 'carbs', y: nutrientsCount.carbs },
        { x: 'fats', y: nutrientsCount.fats },
        { x: 'protein', y: nutrientsCount.protein },
      ];
      return data;
    }).catch(console.error);
  
};
  
export const getStatsToday = (user, listen) => {
  return onValue(query(ref(db, `users/${user}/dataByDay`), orderByChild('date'), equalTo(getDateAsString(new Date()))), listen);
};
  
export const getExerciseDurationByDate = (user) => {
  return get(query(ref(db, `users/${user}/dataByDay`), orderByChild('dateVal'), limitToLast(30)),)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()).map((el) => {
          return { x: el.date.split(' ')[2], y: el.totalActivityDuration };
        });
      } else {
        return [];
      }
    }).catch(console.error);
  
};
  
export const getCalorieDifferenceByDate = (user) => {
  return get(query(ref(db, `users/${user}/dataByDay`), orderByChild('dateVal'), limitToLast(30)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()).map((el) => {
          return { x: el.date.split(' ')[2], y: el.cal.consumed - el.cal.burned - FAKE_BMR };
        });
      } else {
        return [];
      }
    }).catch(console.error);
  
};


