import { push, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

// const dataByDay = [
//   {
//     date: 'Sat Aug 6 2022',
//     dateVal: Date.parse('Sat Aug 6 2022'),
//     cal: {
//       burned: 1895,
//       consumed: 2000
//     },
//     waterIntake: 4000,
//     steps: 7854,
//     totalActivityDuration: 90
//   },
//   {
//     date: 'Sun Aug 7 2022',
//     dateVal: Date.parse('Sun Aug 7 2022'),
//     cal: {
//       burned: 1895,
//       consumed: 1871
//     },
//     waterIntake: 5100,
//     steps: 10023,
//     totalActivityDuration: 150
//   },
//   {
//     date: 'Mon Aug 8 2022',
//     dateVal: Date.parse('Mon Aug 8 2022'),
//     cal: {
//       burned: 2200,
//       consumed: 2000
//     },
//     waterIntake: 5000,
//     steps: 6355,
//     totalActivityDuration: 65
//   },
//   {
//     date: 'Tue Aug 9 2022',
//     dateVal: Date.parse('Tue Aug 9 2022'),
//     cal: {
//       burned: 2000,
//       consumed: 1904
//     },
//     waterIntake: 4900,
//     steps: 9999,
//     totalActivityDuration: 135
//   },
//   {
//     date: 'Wed Aug 10 2022',
//     dateVal: Date.parse('Wed Aug 10 2022'),
//     cal: {
//       burned: 1995,
//       consumed: 2000
//     },
//     waterIntake: 5200,
//     steps: 11000,
//     totalActivityDuration: 210
//   },
//   {
//     date: 'Thu Aug 11 2022',
//     dateVal: Date.parse('Thu Aug 11 2022'),
//     cal: {
//       burned: 2125,
//       consumed: 1953
//     },
//     waterIntake: 2000,
//     steps: 8854,
//     totalActivityDuration: 140
//   },
//   {
//     date: 'Fri Aug 12 2022',
//     dateVal: Date.parse('Fri Aug 12 2022'),
//     cal: {
//       burned: 1895,
//       consumed: 1930
//     },
//     waterIntake: 4950,
//     steps: 8894,
//     totalActivityDuration: 140
//   },
//   {
//     date: 'Sat Aug 13 2022',
//     dateVal: Date.parse('Sat Aug 13 2022'),
//     cal: {
//       burned: 1895,
//       consumed: 2000
//     },
//     waterIntake: 4100,
//     steps: 10854,
//     totalActivityDuration: 90
//   },
//   {
//     date: 'Sun Aug 14 2022',
//     dateVal: Date.parse('Sun Aug 14 2022'),
//     cal: {
//       burned: 1895,
//       consumed: 2000
//     },
//     waterIntake: 2000,
//     steps: 7854,
//     totalActivityDuration: 110
//   },
//   {
//     date: 'Mon Aug 15 2022',
//     dateVal: Date.parse('Mon Aug 15 2022'),
//     cal: {
//       burned: 1895,
//       consumed: 2000
//     },
//     waterIntake: 2000,
//     steps: 7854,
//     totalActivityDuration: 80
//   },
//   {
//     date: 'Tue Aug 16 2022',
//     dateVal: Date.parse('Tue Aug 16 2022'),
//     cal: {
//       burned: 1895,
//       consumed: 2400
//     },
//     waterIntake: 2000,
//     steps: 8734,
//     totalActivityDuration: 123
//   },
//   {
//     date: 'Wed Aug 17 2022',
//     dateVal: Date.parse('Wed Aug 17 2022'),
//     cal: {
//       burned: 2000,
//       consumed: 2003
//     },
//     waterIntake: 5700,
//     steps: 9988,
//     totalActivityDuration: 200
//   },
//   {
//     date: 'Thu Aug 18 2022',
//     dateVal: Date.parse('Thu Aug 18 2022'),
//     cal: {
//       burned: 1892,
//       consumed: 2204
//     },
//     waterIntake: 5000,
//     steps: 9784,
//     totalActivityDuration: 65
//   },
//   {
//     date: 'Thu Aug 19 2022',
//     dateVal: Date.parse('Fri Aug 19 2022'),
//     cal: {
//       burned: 2895,
//       consumed: 2300
//     },
//     waterIntake: 6000,
//     steps: 12023,
//     totalActivityDuration: 205
//   },
// ];

const dataByDay  = [
  {
    date: 'Thu Aug 19 2022',
    dateVal: Date.parse('Fri Aug 19 2022'),
    cal: {
      burned: 2895,
      consumed: 2300
    },
    waterIntake: 6000,
    steps: 12023,
    totalActivityDuration: 205
  },
  {
    date: 'Thu Aug 20 2022',
    dateVal: Date.parse('Fri Aug 20 2022'),
    cal: {
      burned: 2895,
      consumed: 2300
    },
    waterIntake: 6000,
    steps: 12023,
    totalActivityDuration: 205
  },


];

const userNutrients = {
  fats: 3100,
  carbs: 5000,
  protein: 4560
};
const goalsStatus = {
  achieved: 36,
  notYet: 6
};


export const getGoalsDistribution = () => {
  const goalsCount = goalsStatus;
  const data = [
    { x: 'achieved', y: goalsCount.achieved },
    { x: 'not yet', y: goalsCount.notYet }
  ];
  return data;
};
export const getNutrientDistribution = () => {
  const nutrientsCount = userNutrients;
  const data = [
    { x: 'carbs', y: nutrientsCount.carbs },
    { x: 'fats', y: nutrientsCount.fats },
    { x: 'protein', y: nutrientsCount.protein },
  ];
  return data;
};

export const getCaloriesToday = () => {
  return dataByDay['Sun Aug 14 2022'].cal.consumed;
};

export const getWaterToday = () => {
  return dataByDay['Sun Aug 14 2022'].waterIntake;
};

export const getStepsToday = () => {
  return dataByDay['Sun Aug 14 2022'].steps;
};

export const getExerciseDurationByDate = () => {
  return Object.values(dataByDay).map((el) => {
    return { x: el.date.split(' ')[2], y: el.totalActivityDuration };
  });
};

export const getCalorieDifferenceByDate = () => {
  return Object.values(dataByDay).map((el) => {
    return { x: el.date.split(' ')[2], y: el.cal.consumed - el.cal.burned };
  });
};

export const addWater = () => {
  dataByDay['Sun Aug 14 2022'].waterIntake += 250;
};

export const upTheUser = (username) => {
  dataByDay.forEach((el) => {    
    push(ref(db, `users/${username}/dataByDay`), el);
  });
};