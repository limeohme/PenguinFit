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

export const getGoalsByTarget = (username, type, target) => {
  return get(ref(db, `goals/${username}/${type}/${target}`))
    .then((snapshot) => {
      if (!snapshot.val()) {
        return [];
      }
      return snapshot.val();
    })
    .catch(console.error);
};

export const updateGoalsByTarget = (username, type, target, newTargetValue) => {
  return getGoalsByTarget(username, type, target)
    .then((goals) => {
      // if (!goals.length) return null;

      const notYetGoalHandles = Object.entries(goals)
        .filter((goal) => goal[1].status !== 'achieved')
        .map(([key, goal]) => {
          return { handle: key, currentValue: goal.currentValue };
        });

      // console.log('notYetGoalHandles');
      // console.log(notYetGoalHandles);

      const updates = notYetGoalHandles.reduce((upd, { handle, currentValue }) => {
        const path = `${username}/${type}/${target}/${handle}`;

        return {
          ...upd,
          [`goals/${path}/currentValue`]: currentValue + newTargetValue
        };
      }, {});

      // console.log('updates');
      // console.log(updates);

      return update(ref(db), updates);
    })
    .catch(console.error);
};

// const updates = {};
//   updates['/posts/' + newPostKey] = postData;
//   updates['/user-posts/' + uid + '/' + newPostKey] = postData;
