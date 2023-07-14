import { db } from '../config/firebase-config';
import { get, ref, onValue, remove, push, query, limitToLast } from 'firebase/database';
import { updateGoalsByTarget } from './goals-service';
import { toSnakeCase } from '../utils/utils';
import { updateUserActivitiesDataByDay } from './user-service';
import { createActivityRequest } from '../utils/activities-utils';

const ACTIVITIES_REQUEST_LIMIT = 7;

export const getMostRecentUserActivities = async (username, limit = ACTIVITIES_REQUEST_LIMIT) => {
  return get(query(ref(db, `activities/${username}`), limitToLast(limit)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.entries(snapshot.val());
      }

      return [];
    })
    .catch(console.error);
};

export const getLiveUserActivities = (username, listen) => {
  return onValue(ref(db, `activities/${username}`), listen);
};

export const getUserActivityByHandle = (username, handle) => {
  return get(ref(db, `activities/${username}/${handle}`))
    .then((snapshot) => {
      return snapshot.val();
    })
    .catch(console.error);
};

export const getUserActivitiesFromRequests = (requestsArr) => {
  return Promise.all(
    requestsArr.map((requestObj) => {
      return getUserActivityByHandle(requestObj.sender, requestObj.activityHandle).then((activityObj) => {
        return { ...activityObj, requestHandle: requestObj.requestHandle, sender: requestObj.sender };
      });
    })
  ).catch(console.error);
};

export const sendActivityRequest = (sender, activityHandle, receiver) => {
  const activityRequest = createActivityRequest(sender, activityHandle, receiver);
  return push(ref(db, `users/${receiver}/activityRequests`), activityRequest);
};

export const deleteActivityRequest = (requestHandle, receiver) => {
  return remove(ref(db, `users/${receiver}/activityRequests/${requestHandle}`));
};

export const getLiveActivityRequests = (username, listen) => {
  return onValue(ref(db, `users/${username}/activityRequests`), listen);
};

const addActivity = (username, activityObj) => {
  return push(ref(db, `activities/${username}`), activityObj)
    .then((res) => res.key)
    .catch(console.error);
};

const updateRelatedGoals = (username, activityObj) => {
  return get(ref(db, `goals/${username}`))
    .then((snapshot) => {
      // check if any goals exist
      if (snapshot.exists()) {
        console.log('GOALS EXIST');

        const targetsWithValue = Object.entries(activityObj.details).filter((det) => det[1] !== 0);

        return Promise.all(
          targetsWithValue.map(([target, newTargetValue]) => {
            // format goals names for DB
            const activityNameFormatted = toSnakeCase(activityObj.activity);

            // add ${newTargetValue} to the currentValue of all goals targeting ${target}
            return updateGoalsByTarget(username, activityNameFormatted, target, newTargetValue);
          })
        );
      }

      console.log('NO GOALS EXIST');
      return null;
    })
    .catch(console.error);
};

export const addAndUpdateActivityInfo = (username, activityObj) => {
  return addActivity(username, activityObj)
    .then((activityHandle) => {
      const activityData = {
        ...activityObj.details,
        activityType: activityObj.type,
        activityHandle
      };
      return updateUserActivitiesDataByDay(username, activityData).then(() => {
        return updateRelatedGoals(username, activityObj).then(() => {
          return activityHandle;
        });
      });
    })
    .catch(console.error);
};
