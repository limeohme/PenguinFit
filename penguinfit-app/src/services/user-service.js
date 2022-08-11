import {
  get,
  ref,
  set,
} from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (userInfo) => {
  return set(ref(db, `users/${userInfo.handle}`), userInfo);
};