import {
  push,
  ref,
  get,
  update,
  set,
  // onChildChanged,
  remove,
  onValue
} from 'firebase/database';
import { db } from '../config/firebase-config';
import { toCamelCase, toSnakeCase } from '../utils/utils';
import { incrementUserGoalsStatus, updateUserGoalsStatus } from './user-service';

export const createGoal = (user, goal) => {
  goal.type = toSnakeCase(goal.type);
  goal.target = toCamelCase(goal.target);
  //creates initial random id for react key
  goal.id = String(Math.random());
  incrementUserGoalsStatus(user, 'notYet');
  return push(ref(db, `goals/${user}/${goal.type}/${goal.target}`), goal).then((path) =>
    update(ref(db, `goals/${user}/${goal.type}/${goal.target}/${path.key}`), { ...goal, id: path.key })
  );
};

export const deleteGoal = (username, type, target, id) => {
  remove(ref(db, `goals/${username}/${type}/${target}/${id}`));

  // get(ref(db, `goals/${username}/${type}/${target}`))
  //   .then(snapshot => {
  //     const userGoals = snapshot.val();
  //     // eslint-disable-next-line no-unused-vars
  //     const { [id]:remove, updatedGoals } = userGoals;
  //     set(ref(db, `goals/${username}/${type}/${target}`), updatedGoals || null);
  //   });
};

export const updateGoalStatus = (username, type, target, id, status) => {
  set(ref(db, `goals/${username}/${type}/${target}/${id}/status`), status );
};

export const goalsListener = (username, listen) => {
  return onValue(ref(db, `goals/${username}`), listen);
};

// export const fromSnapshot = (goals, snapshot) => {
//   const updated = { [snapshot.key]: snapshot.val() };
//   return { ...goals, ...updated };
// };

export const getUserGoals = (username) => {
  return get(ref(db, `goals/${username}`))
    .then((snapshot) => {
      if (!snapshot.val()) {
        return [];
      }
      return snapshot.val();
    })
    .catch(console.error);
};

// add query for status - not there yet
export const getGoalTypeByTarget = (username, target, type = 'general') => {
  return get(ref(db, `goals/${username}/${type}/${target}`))
    .then((snapshot) => {
      if (!snapshot.val()) {
        return null;
      }
      return snapshot.val();
    })
    .catch(console.error);
};

export const updateGoalTypeByTarget = (username, target, newTargetValue, type = 'general') => {
  return getGoalTypeByTarget(username, target, type)
    .then((goals) => {
      if (goals) {
        // maybe a better name - especially if we filter on DB
        const notYetGoalHandles = Object.entries(goals)
          .filter((goal) => goal[1].status === 'Not there yet')
          .map(([key, goal]) => {
            return { handle: key, currentValue: goal.currentValue, targetValue: goal.targetValue };
          });

        const updates = notYetGoalHandles.reduce((upd, { handle, currentValue, targetValue }) => {
          const path = `goals/${username}/${type}/${target}/${handle}`;

          const increasedValue = currentValue + newTargetValue;

          upd = {
            ...upd,
            [`${path}/currentValue`]: currentValue + newTargetValue
          };

          if (increasedValue >= parseInt(targetValue)) {
            upd = {
              ...upd,
              [`${path}/status`]: 'achieved',
              [`${path}/achievedOn`]: Date.now(),
            };

            updateUserGoalsStatus(username).catch(console.error);
          }

          return upd;
        }, {});

        return update(ref(db), updates).then(() => {
          const successMsg = `updated goals at '...${type}/${target}'`;
          console.log(successMsg);
          return successMsg;
        });
      }

      const noGoalsMsg = `no goals at '...${type}/${target}' yet`;
      console.log(noGoalsMsg);
      return noGoalsMsg;
    })
    .catch(console.error);
};

export const updateGoalsByTarget = (username, activity, target, newTargetValue) => {
  console.log('initiate updates');

  return Promise.all([updateGoalTypeByTarget(username, target, newTargetValue), updateGoalTypeByTarget(username, target, newTargetValue, activity)]).catch(console.error);
};
