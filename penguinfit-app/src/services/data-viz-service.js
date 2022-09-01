import { limitToLast, onValue, query, ref } from 'firebase/database';
import { db } from '../config/firebase-config';
import { activityTypes } from '../utils/activities-utils';

const DATA_BY_DAY_REQUEST_LIMIT = 14;

const trackedFields = {
  1: 'caloriesBurned',
  2: 'duration'
};

export const getLiveUserLastNDaysData = (username, listener, limit = DATA_BY_DAY_REQUEST_LIMIT) => {
  return onValue(query(ref(db, `users/${username}/dataByDay`), limitToLast(limit)), listener);
};

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

export const getCaloriesBurnedByDay = (dataByDay) => {
  return dataByDay.map((day) => {
    const dayDate = new Date(day.date);
    return { [dayDate.getDate()]: +day.cal.burned.toFixed(0) };
  });
};

export const findMaxField = (data) => {
  return data
    ?.map((obj) => obj.y)
    .reduce((acc, val) => {
      if (val > acc) {
        acc = val;
      }

      return acc;
    }, 0);
};

export const getRoundedMax = (max = 0, round = 1) => {
  if (!Number.isNaN(round) && round > 0) {
    return Math.round(max / round) * round;
  }
  return NaN;
};

export const formatCaloriesBurnedByDay = (data) => {
  return data.map((obj) => {
    const [day, calories] = Object.entries(obj)[0];

    return {
      x: day,
      y: calories
    };
  });
};

export const formatData = (data) => {
  return Object.entries(data)
    .map(([key, value]) => {
      if (value !== 0) {
        return { x: key, y: value };
      }
      return null;
    })
    .filter(Boolean);
};
