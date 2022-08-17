
import {
  push,
  ref,
  get,
  update,
  onChildChanged,
} from 'firebase/database';
import { db } from '../config/firebase-config';

export const createGoal = (user ,goal) => 
  push(ref(db, `goals/${user}/${goal.type}/${goal.target}`), goal)
    .then((path) => update(ref(db, `goals/${user}/${goal.type}/${goal.target}/${path.key}`), { ...goal, id:path.key }));
;

export const listenToOtherGoals = (username ,listen) => {
  return (onChildChanged(ref(db, `goals/${username}/other`), listen));
};

export const listenToCardioGoals = (username ,listen) => {
  return (onChildChanged(ref(db, `goals/${username}/cardio`), listen));
};

export const listenToStrengthGoals = (username ,listen) => {
  return (onChildChanged(ref(db, `goals/${username}/strength`), listen));
};
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