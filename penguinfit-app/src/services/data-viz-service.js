import { limitToLast, onValue, query, ref } from 'firebase/database';
import { db } from '../config/firebase-config';
import { activityTypes } from '../utils/activities-utils';

// const getActivitiesOfDay = async (username) => {
//   const snapshot = await getUserDataOfDay(username);

//   if (snapshot.exists()) {
//     return Object.values(snapshot.val()).activities;
//   }

//   return [];
// };

const DATA_BY_DAY_REQUEST_LIMIT = 10;

const trackedFields = {
  1: 'caloriesBurned',
  2: 'duration'
};

export const getLiveUserLastNDaysData = (username, listener, limit = DATA_BY_DAY_REQUEST_LIMIT) => {
  return onValue(query(ref(db, `users/${username}/dataByDay`), limitToLast(limit)), listener);
};

// export const getUserLastNDaysData = async (username, limit = DATA_BY_DAY_REQUEST_LIMIT) => {
//   return get(query(ref(db, `users/${username}/dataByDay`), limitToLast(limit))).then((snapshot) => {
//     console.log(snapshot.val());
//   });
// };

const getUserActivitiesFromLastNDays = (lastNDaysData) => {
  return lastNDaysData.map((day) => day.activities);
};

const getActivitiesOfType = (activities, type) => {
  return activities ? activities.filter((act) => act.activityType === type) : [];
};

const getActivitiesFieldTotal = (activities, field) => {
  return activities ? activities.reduce((totalCal, act) => totalCal + act[field], 0) : 0;
};

export const getCombinedLastNDaysActivities = (lastNDaysData) => {
  const lastNDaysActivitiesByDay = getUserActivitiesFromLastNDays(lastNDaysData);

  return lastNDaysActivitiesByDay.reduce((combined, dayActivities) => {
    if (dayActivities) {
      return [...combined, ...dayActivities];
    }

    return combined;
  }, []);
};

export const getActivitiesDataByType = (lastNDaysData, fields = trackedFields, types = activityTypes) => {
  const combinedLastNDaysActivities = getCombinedLastNDaysActivities(lastNDaysData);
  return types.reduce((sortedByType, type) => {
    const activitiesOfType = getActivitiesOfType(combinedLastNDaysActivities, type);

    return {
      ...sortedByType,
      [type]: {
        caloriesOfType: getActivitiesFieldTotal(activitiesOfType, fields[1]),
        durationOfType: getActivitiesFieldTotal(activitiesOfType, fields[2]),
        countOfType: activitiesOfType.length
      }
    };
  }, {});
};

export const getFieldByType = (dataByType, field) => {
  return Object.entries(dataByType).reduce((fieldByType, [type, fields]) => {
    return {
      ...fieldByType,
      [type]: fields[field]
    };
  }, {});
};
