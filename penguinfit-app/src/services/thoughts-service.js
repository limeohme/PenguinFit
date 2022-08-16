import { push, ref, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createThought = (user, thought) => {
  push(ref(db, `thoughts/${user}`), thought)
    .then((res) => update(ref(db, `thoughts/${user}/${res.key}`), { ...thought, id: res.key }))
    .catch(console.error);
}
;