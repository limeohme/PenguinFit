import {
  push,
  ref,
  get,
  update,
  // onChildChanged,
  onValue
} from 'firebase/database';
import { db } from '../config/firebase-config';

export const createGoal = (user, goal) =>
  push(ref(db, `goals/${user}/${goal.type}/${goal.target}`), goal).then((path) =>
    update(ref(db, `goals/${user}/${goal.type}/${goal.target}/${path.key}`), { ...goal, id: path.key })
  );

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

export const getActivityGoalsByTarget = (username, activity, target) => {
  return get(ref(db, `goals/${username}/${activity}/${target}`))
    .then((snapshot) => {
      if (!snapshot.val()) {
        return [];
      }
      return snapshot.val();
    })
    .catch(console.error);
};

export const getGeneralGoalsByTarget = (username, target) => {
  return get(ref(db, `goals/${username}/general/${target}`))
    .then((snapshot) => {
      if (!snapshot.val()) {
        return [];
      }
      return snapshot.val();
    })
    .catch(console.error);
};

export const updateActivityGoalsByTarget = (username, activity, target, newTargetValue) => {
  return getActivityGoalsByTarget(username, activity, target)
    .then((goals) => {
      const notYetGoalHandles = Object.entries(goals)
        .filter((goal) => goal[1].status !== 'achieved')
        .map(([key, goal]) => {
          return { handle: key, currentValue: goal.currentValue };
        });

      const updates = notYetGoalHandles.reduce((upd, { handle, currentValue }) => {
        const path = `${username}/${activity}/${target}/${handle}`;

        return {
          ...upd,
          [`goals/${path}/currentValue`]: currentValue + newTargetValue
        };
      }, {});

      return update(ref(db), updates);
    })
    .catch(console.error);
};

export const updateGeneralGoalsByTarget = (username, target, newTargetValue) => {
  return getGeneralGoalsByTarget(username, target)
    .then((goals) => {
      const notYetGoalHandles = Object.entries(goals)
        .filter((goal) => goal[1].status !== 'achieved')
        .map(([key, goal]) => {
          return { handle: key, currentValue: goal.currentValue };
        });

      const updates = notYetGoalHandles.reduce((upd, { handle, currentValue }) => {
        const path = `${username}/general/${target}/${handle}`;

        return {
          ...upd,
          [`goals/${path}/currentValue`]: currentValue + newTargetValue
        };
      }, {});

      return update(ref(db), updates);
    })
    .catch(console.error);
};
