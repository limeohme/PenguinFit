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
  return onValue(query(ref(db, `meals/${user}`), orderByChild('dateVal'), limitToLast(21)), listen);
};

export const getFoodItemData = async (foodItem, grams) => {
  const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${foodItem}&nutrition-type=cooking`);
  if (!response.ok) {
    throw new Error('Invalid food item!');
  } 
  const data = await response.json();
  const foodObject = {};
  foodObject['foodItem'] = foodItem;
  foodObject['cal'] = data.parsed[0].food.nutrients.ENERC_KCAL/100 * grams;
  foodObject['nutrients'] = {};
  foodObject['nutrients']['carbs'] = data.parsed[0].food.nutrients.CHOCDF/100 * grams;
  foodObject['nutrients']['protein'] = data.parsed[0].food.nutrients.PROCNT/100 * grams;
  foodObject['nutrients']['fats'] = data.parsed[0].food.nutrients.FAT/100 * grams;

  return foodObject;
};

export const updateUserNutrients = (user, foods) => {
  const carbs = foods.reduce((acc, food) => acc += food.nutrients.carbs , 0);
  const protein = foods.reduce((acc, food) => acc += food.nutrients.protein , 0);
  const fats = foods.reduce((acc, food) => acc += food.nutrients.fats , 0);
  const up = {};
  return get(ref(db, `users/${user}/nutrients`)).then((snapshot) => {
    if (snapshot.exists()) {
      up['carbs'] = snapshot.val().carbs + carbs;
      up['protein'] = snapshot.val().protein + protein;
      up['fats'] = snapshot.val().fats + fats;

      set(ref(db, `users/${user}/nutrients/`), up)
        .catch(console.error);
    
    } else {
      up['carbs'] = carbs;
      up['protein'] = protein;
      up['fats'] = fats;
      
      set(ref(db, `users/${user}/nutrients/`), up)
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

export const getCalorieIntakeByDate = (user) => {
  return get(query(ref(db, `users/${user}/dataByDay`), orderByChild('dateVal'), limitToLast(14)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()).sort((a, b) => a.dateVal - b.dateVal).map((el) => {
          return { x: el.date.split(' ')[2], y: el.cal.consumed };
        });
      } else {
        return [];
      }
    }).catch(console.error);
  
};
