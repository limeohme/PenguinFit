import {
  push,
  ref,
  onChildAdded,
  query,
  orderByChild,
  limitToLast,
  update,
  get,
  set,
  equalTo,
  onValue,
} from 'firebase/database';
import { EDAMAM_APP_ID, EDAMAM_APP_KEY } from '../common/constants';

import { db } from '../config/firebase-config';
import { formatDateToString } from '../utils/utils';

export const addMealToDB = (user, meal) => {
  push(ref(db, `meals/${user}`), meal);
};

export const getRecentMeals = (user, listen) => {
  return onValue(query(ref(db, `meals/${user}`), orderByChild('dateVal'), limitToLast(7)), listen);
};

export const getFoodItemData = async (foodItem, grams) => {
  const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${foodItem}&nutrition-type=cooking`);
  if (!response.ok) {
    console.log(response.status);
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
      update(ref(db, `users/${user}/nutrients/carbs`), Object.values(snapshot.val())[0].carbs + carbs)
        .catch(console.error);
      update(ref(db, `users/${user}/nutrients/protein`), Object.values(snapshot.val())[0].protein + protein)
        .catch(console.error);
      update(ref(db, `users/${user}/nutrients/fats`), Object.values(snapshot.val())[0].fats + fats)
        .catch(console.error);
    } else {
      set(ref(db, `users/${user}/nutrients/carbs`), carbs)
        .catch(console.error);
      set(ref(db, `users/${user}/nutrients/protein`), protein)
        .catch(console.error);
      set(ref(db, `users/${user}/nutrients/fats`), fats)
        .catch(console.error);
    }
  }).catch(console.error);
};

export const updateDailyCalsGetter = (user, listen) => {
  return onChildAdded(query(ref(db, `users/${user}/dataByDay`),
    orderByChild('date'), equalTo(formatDateToString(new Date()).split(' ').slice(0, 4))), listen);
};

export const updateDailyCalsUpdater = (snapshot, user, cals) => {
  if (snapshot.exists()) {
    update(query(ref(db, `users/${user}/dataByDay`),
      orderByChild('date'), equalTo(formatDateToString(new Date()).split(' ').slice(0, 4))),
    { ...Object.values(snapshot.val())[0], cal: { ...Object.values(snapshot.val())[0].cal, consumed: cals }  });
  } else {
    set(query(ref(db, `users/${user}/dataByDay`),
      orderByChild('date'), equalTo(formatDateToString(new Date()).split(' ').slice(0, 4))),
    { ...createNewDataByDay(), cal:{ ...createNewDataByDay().cal, consumed: cals } });
  }
};

function createNewDataByDay () {
  return {
    date: formatDateToString(new Date()).split(' ').slice(0, 4),
    dateVal: Date.parse(formatDateToString(new Date()).split(' ').slice(0, 4)),
    cal: {
      burned: 0,
      consumed: 0
    },
    waterIntake: 0,
    steps: 0,
    totalActivityDuration: 0
  };
}