import {
  push,
  ref,
  query,
  orderByChild,
  update,
  get,
  set,
  equalTo,
  onValue,
  limitToLast,
} from 'firebase/database';
import { EDAMAM_APP_ID, EDAMAM_APP_KEY, MEAL_TYPES } from '../common/constants';

import { db } from '../config/firebase-config';
import { getDateAsString } from '../utils/utils';

export const addMealToDB = (user, meal) => {
  push(ref(db, `meals/${user}`), meal);
};

export const getRecentMeals = (user, listen) => {
  return onValue(query(ref(db, `meals/${user}`), orderByChild('dateVal'), limitToLast(7)), listen);
};

export const getFoodItemData = async (foodItem, grams) => {
  const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${foodItem}&nutrition-type=cooking`);
  if (!response.ok) {
    throw new Error('Invalid food item!');
  } 
  const data = await response.json();
  const foodObject = {};
  foodObject['foodItem'] = foodItem;
  foodObject['cal'] = +data.parsed[0].food.nutrients.ENERC_KCAL/+data.hints[0].measures[0].weight * grams;
  foodObject['nutrients'] = {};
  foodObject['nutrients']['carbs'] = data.parsed[0].food.nutrients.CHOCDF;
  foodObject['nutrients']['protein'] = data.parsed[0].food.nutrients.PROCNT;
  foodObject['nutrients']['fats'] = data.parsed[0].food.nutrients.FAT;

  return foodObject;
};

export const updateUserNutrients = (user, protein, carbs, fats) => {
  return get(ref(db, `users/${user}/nutrients`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      update(ref(db, `users/${user}/nutrients`), { ...snapshot.val(), carbs: snapshot.val().carbs + +carbs })
        .catch(console.error);
      update(ref(db, `users/${user}/nutrients`), { ...snapshot.val(), protein: snapshot.val().protein + +protein } )
        .catch(console.error);
      update(ref(db, `users/${user}/nutrients`), { ...snapshot.val(), fats: snapshot.val().fats + +fats })
        .catch(console.error);
    } else {
      set(ref(db, `users/${user}/nutrients/carbs`), +carbs)
        .catch(console.error);
      set(ref(db, `users/${user}/nutrients/protein`), +protein)
        .catch(console.error);
      set(ref(db, `users/${user}/nutrients/fats`), +fats)
        .catch(console.error);
    }
  }).catch(console.error);
};

export const updateDailyCalsGetter = (user, listen) => {
  const date = getDateAsString(new Date());
  return get(query(ref(db, `users/${user}/dataByDay`),
    orderByChild('date'), equalTo(date)), listen);
};

export const updateDailyCalsUpdater = (snapshot, user, cals) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    const key = Object.keys(snapshot.val())[0];
    return update(ref(db, `users/${user}/dataByDay/${String(key)}`),
      { ...Object.values(snapshot.val())[0], cal: { ...Object.values(snapshot.val())[0].cal, consumed: Object.values(snapshot.val())[0].cal.consumed + cals }  });
  } else {
    return push(ref(db, `users/${user}/dataByDay`), { ...createNewDataByDay(), cal:{ ...createNewDataByDay().cal, consumed: cals } });
  }
};

export const updateDailyWaterGetter = (user, listen) => {
  const date = getDateAsString(new Date());
  return get(query(ref(db, `users/${user}/dataByDay`),
    orderByChild('date'), equalTo(date)), listen);
};

export const updateDailyWaterUpdater = (snapshot, user) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    const key = Object.keys(snapshot.val())[0];
    return update(ref(db, `users/${user}/dataByDay/${String(key)}`),
      { ...Object.values(snapshot.val())[0], waterIntake: Object.values(snapshot.val())[0].waterIntake + 250 });
  } else {
    return push(ref(db, `users/${user}/dataByDay`), { ...createNewDataByDay(), waterIntake: 250 });
  }
};


export function createNewDataByDay () {
  const theDate = getDateAsString(new Date());
  return {
    date: theDate,
    dateVal: Date.parse(theDate),
    cal: {
      burned: 0,
      consumed: 0
    },
    waterIntake: 0,
    steps: 0,
    totalActivityDuration: 0
  };
}

// chart funcs

// export const getMealByType = (user, type) => {
//   return get(ref(db, `meals/${user}/`))
//     .then((snapshot) => {
//       if (snapshot.exists()){
//         const data = Object.values(snapshot.val())
//           .filter(el => el.type === type)
//           .map(el => el.foods)
//           .map((el) => {
//             return el.reduce((acc, meal) => {
//               if (acc['protein']){
//                 acc.protein += meal.nutrients.protein;
//               } else {
//                 acc['protein'] = meal.nutrients.protein;
//               }
//               if (acc['fats']){
//                 acc.fats += meal.nutrients.fats;
//               } else {
//                 acc['fats'] = meal.nutrients.fats;
//               }
//               if (acc['carbs']){
//                 acc.carbs += meal.nutrients.carbs;
//               } else {
//                 acc['carbs'] = meal.nutrients.carbs;
//               }
//               return acc;
//             }, {});
//           });
//         return data.map((el) => Object.entries(el).map(([name, val]) => ({ y: name, x: +val })));
//       }
//       return []; 
//     }).catch(console.error);
// };

export const getMealCalsByType = (meals, type) => {
  const data = meals
    .filter(el => el.type === type)
    .map(el => el.cal);
  return data.reduce((acc, el) => acc += el/data.length, 0);
};

export const getMealByType = (meals, type) => {
  const data = meals
    .filter(el => el.type === type);
  return data.length;
};
