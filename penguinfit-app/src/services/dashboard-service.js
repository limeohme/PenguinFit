import { get, orderByChild, query, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

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
  
export const getCaloriesToday = () => {
  return get(ref(db, `users/BabyPenguin78/dataByDay/${'Sun Aug 14 2022'}/cal/consumed`))
    .then((snapshot) => {
      return snapshot.val();
    }).catch(console.error);
};
  
export const getWaterToday = () => {
  return get(ref(db, `users/BabyPenguin78/dataByDay/${'Sun Aug 14 2022'}/waterIntake`))
    .then((snapshot) => {
      return snapshot.val();
    }).catch(console.error);
  
};
  
export const getStepsToday = () => {
  return get(ref(db, `users/BabyPenguin78/dataByDay/${'Sun Aug 14 2022'}/steps`))
    .then((snapshot) => {
      return snapshot.val();
    }).catch(console.error);
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
      console.log(snapshot.val());
      return Object.values(snapshot.val()).map((el) => {
        return { x: el.date.split(' ')[2], y: el.cal.consumed - el.cal.burned };
      });
    }).catch(console.error);
  
};
