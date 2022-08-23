import { equalTo, get, onValue, orderByChild, query, ref, } from 'firebase/database';
import { db } from '../config/firebase-config';
import { getDateAsString } from '../utils/utils';

export const getGoalsDistribution = () => {
  return get(ref(db, `users/BabyPenguin78/goalsStatus`))
    .then((snapshot) => {
      const goalsCount = snapshot.val();
      const data = [
        { x: 'achieved', y: goalsCount.achieved },
        { x: 'not yet', y: goalsCount.notYet }
      ];
      return data;
    }).catch(console.error);
};
export const getNutrientDistribution = () => {
  return get(ref(db, `users/BabyPenguin78/nutrients`))
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
  
// export const getCaloriesToday = () => {
//   return get(ref(db, `users/BabyPenguin78/dataByDay/`))
//     .then((snapshot) => {
//       return Object.values(snapshot.val())[6].cal.consumed;
//     }).catch(console.error);
// };
  
// export const getWaterToday = () => {
//   return get(ref(db, `users/BabyPenguin78/dataByDay`))
//     .then((snapshot) => {
//       return Object.values(snapshot.val())[6].waterIntake;
//     }).catch(console.error);
  
// };
  
export const getStatsToday = (user, listen) => {
  return onValue(query(ref(db, `users/${user}/dataByDay`), orderByChild('date'), equalTo(getDateAsString(new Date()))), listen);
};
  
export const getExerciseDurationByDate = () => {
  return get(query(ref(db, `users/BabyPenguin78/dataByDay`)), orderByChild('dateVal'))
    .then((snapshot) => {
      return Object.values(snapshot.val()).map((el) => {
        return { x: el.date.split(' ')[2], y: el.totalActivityDuration };
      });
    }).catch(console.error);
  
};
  
export const getCalorieDifferenceByDate = () => {
  return get(query(ref(db, `users/BabyPenguin78/dataByDay`)), orderByChild('dateVal'))
    .then((snapshot) => {
      return Object.values(snapshot.val()).map((el) => {
        return { x: el.date.split(' ')[2], y: el.cal.consumed - el.cal.burned };
      });
    }).catch(console.error);
  
};


