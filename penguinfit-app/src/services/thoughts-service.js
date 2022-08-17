import { get, onValue, push, ref, remove, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createThought = (user, thought) => {
  push(ref(db, `thoughts/${user}`), thought)
    .then((res) => update(ref(db, `thoughts/${user}/${res.key}`), { ...thought, id: res.key }))
    .catch(console.error);
};

export const getThought = (user, thoughtId) => {
  get(ref(db, `thoughts/${user}/${thoughtId}`))
    .then((snapshot) => {
      return snapshot.val();
    })
    .catch(console.error);
};
export const getLiveThoughts = (user, listen) => {
  return onValue(ref(db, `thoughts/${user}`), listen);
};

export const editThought = (user, newThought) => {
  update(ref(db, `thoughts/${user}/${newThought.id}`), { ...newThought })
    .catch(console.error);
};

export const deleteThought = (user, thoughtId) => {
  remove(ref(db, `thoughts/${user}/${thoughtId}`))
    .catch(console.error);
};