import {
  get,
  ref,
  set,
  update,
} from 'firebase/database';
import { db } from '../config/firebase-config';
import { updateUserInfo } from './local-storage-service';

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (userInfo) => {
  return set(ref(db, `users/${userInfo.username}`), userInfo);
};

export const updateUserInfoDB = (username, userNewInfo) => {
  if (userNewInfo.age) {
    update(ref(db), {
      [`users/${username}/age`]: userNewInfo.age,
    }).catch(console.error);
  }
  if (userNewInfo.height) {
    update(ref(db), {
      [`users/${username}/height`]: userNewInfo.height,
    }).catch(console.error);
  }
  if (userNewInfo.weight) {
    update(ref(db), {
      [`users/${username}/weight`]: userNewInfo.weight,
    }).catch(console.error);
  }
  if (userNewInfo.phoneNumber) {
    update(ref(db), {
      [`users/${username}/phoneNumber`]: userNewInfo.phoneNumber,
    }).catch(console.error);
  }
  getUserByHandle(username).then((snapshot) => {
    updateUserInfo(snapshot.val());
  }).catch(console.error);
};

export const updateUserProfilePicture = (username, url) => {
  return update(ref(db), {
    [`users/${username}/avatarURL`]: url,
  }).catch(console.error);
};
