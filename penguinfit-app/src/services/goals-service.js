
import {
  push,
  ref,
  get,
  update,
  // onChildChanged,
  onValue,
} from 'firebase/database';
import { db } from '../config/firebase-config';

export const createGoal = (user ,goal) => 
  push(ref(db, `goals/${user}/${goal.type}/${goal.target}`), goal)
    .then((path) => update(ref(db, `goals/${user}/${goal.type}/${goal.target}/${path.key}`), { ...goal, id:path.key }));
;

export const goalsListener = (username ,listen) => {
  return (onValue(ref(db, `goals/${username}/other`), listen));
};

export const cardioListener = (username ,listen) => {
  return (onValue(ref(db, `goals/${username}/cardio`), listen));
};

export const strengthListener = (username ,listen) => {
  return (onValue(ref(db, `goals/${username}/strength`), listen));
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