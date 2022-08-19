import {
  get,
  onValue,
  ref,
  set,
  update,
} from 'firebase/database';
import { db } from '../config/firebase-config';
import { updateUserInfo } from './local-storage-service';

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const getUserFriends = (username) => {
  return get(ref(db, `users/${username}/friends`))
    .then((snapshot) => {
      if (!snapshot.val()) {
        return [];
      }
      return snapshot.val();
    })
    .catch(console.error);
};

export const getAllUsers = () => {
  return get(ref(db, `users`));
};

export const addUserFriends = (handle, friends) => {
  get(ref(db, `users/${handle}/friends`))
    .then((snapshot) => {
      const userFriends = snapshot.val() || {};
      const newFriends = {};
      friends.forEach(el => newFriends[el] = true);

      set(ref(db, `users/${handle}/friends`), { ...userFriends, ...newFriends });
    });
};

export const removeUserFriend = (handle, friend) => {
  get(ref(db, `users/${handle}/friends`))
    .then((snapshot) => {
      const userFriends = snapshot.val();
      // eslint-disable-next-line no-unused-vars
      const { [ friend ]: remove , ...updatedFriends } = userFriends;

      set(ref(db, `users/${handle}/friends`), updatedFriends);
    });
};

export const listenToFriends = (username, listen) => { 
  return (onValue(ref(db, `users/${username}`), listen));
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
