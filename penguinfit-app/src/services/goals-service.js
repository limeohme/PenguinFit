import {
  push,
  ref,
  get,
  update,
  // onChildChanged,
  onValue
} from 'firebase/database';
import { db } from '../config/firebase-config';
import { toSnakeCase } from '../utils/utils';

export const createGoal = (user, goal) => {
  const goalTypeFormatted = toSnakeCase(goal.type);

  return push(ref(db, `goals/${user}/${goalTypeFormatted}/${goal.target}`), goal).then((path) =>
    update(ref(db, `goals/${user}/${goalTypeFormatted}/${goal.target}/${path.key}`), { ...goal, id: path.key })
  );
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
      // console.log('goals');
      // console.log(goals);
      if (goals) {
        // maybe a better name - especially if we filter on DB
        const notYetGoalHandles = Object.entries(goals)
          .filter((goal) => goal[1].status === 'Not there yet')
          .map(([key, goal]) => {
            return { handle: key, currentValue: goal.currentValue };
          });

        const updates = notYetGoalHandles.reduce((upd, { handle, currentValue }) => {
          const path = `goals/${username}/${type}/${target}/${handle}`;

          // console.log('currentValue');
          // console.log(+currentValue);

          // console.log('changed value');
          // console.log(+currentValue + newTargetValue);

          return {
            ...upd,
            [`${path}/currentValue`]: currentValue + newTargetValue
          };
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
