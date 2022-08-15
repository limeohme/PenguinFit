
import {
  push,
  ref,
  update,
} from 'firebase/database';
import { db } from '../config/firebase-config';

export const createGoal = (user ,goal) => 
  push(ref(db, `goals/${user}/${goal.type}/${goal.target}`), goal)
    .then((path) => update(ref(db, `goals/${user}/${goal.type}/${goal.target}/${path.key}`), { ...goal, id:path.key }));
;