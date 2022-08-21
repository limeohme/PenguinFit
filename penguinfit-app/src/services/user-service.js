import { get, onValue, ref, set, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import { updateUserInfo } from './local-storage-service';

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const getUserFriends = (handle) => {

  return get(ref(db, `users/${handle}/friends`))
    .then(snapshotFriendsHandle => {
      if (!snapshotFriendsHandle.val()) {
        return [];
      }

      const friendsHandles = snapshotFriendsHandle.val();

      return Promise.all(Object.keys(friendsHandles).map(key => {

        return get(ref(db, `users/${key}`))
          .then(snapshotFriend => {
            return snapshotFriend.val();
          });
      }));
    });
};

export const getUserFriendsByHandle = async (handles = []) => {
  return (await Promise.all(handles.map((userHandle) => getUserByHandle(userHandle)))).map((snapshot) => snapshot.val()).filter(Boolean);
};

export const getAllUsers = () => {
  return get(ref(db, `users`));
};

export const addUserFriends = (handle, friends) => {
  get(ref(db, `users/${handle}/friends`)).then((snapshot) => {
    const userFriends = snapshot.val() || {};
    const newFriends = {};
    friends.forEach((el) => (newFriends[el] = true));

    set(ref(db, `users/${handle}/friends`), { ...userFriends, ...newFriends });
  });
};

export const removeUserFriend = (handle, friend) => {
  get(ref(db, `users/${handle}/friends`)).then((snapshot) => {
    const userFriends = snapshot.val();
    // eslint-disable-next-line no-unused-vars
    const { [friend]: remove, ...updatedFriends } = userFriends;

    set(ref(db, `users/${handle}/friends`), updatedFriends);
  });
};

export const listenToFriends = (username, listen) => {
  return onValue(ref(db, `users/${username}`), listen);
};

export const createUserHandle = (userInfo) => {
  return set(ref(db, `users/${userInfo.username}`), userInfo);
};


export const updateUserInfoDB = (username, userNewInfo) => {
  if (userNewInfo.age) {
    update(ref(db), {
      [`users/${username}/age`]: userNewInfo.age
    }).catch(console.error);
  }
  if (userNewInfo.height) {
    update(ref(db), {
      [`users/${username}/height`]: userNewInfo.height
    }).catch(console.error);
  }
  if (userNewInfo.weight) {
    update(ref(db), {
      [`users/${username}/weight`]: userNewInfo.weight
    }).catch(console.error);
  }
  if (userNewInfo.phoneNumber) {
    update(ref(db), {
      [`users/${username}/phoneNumber`]: userNewInfo.phoneNumber
    }).catch(console.error);
  }
  getUserByHandle(username)
    .then((snapshot) => {
      updateUserInfo(snapshot.val());
    })
    .catch(console.error);
};

export const updateUserProfilePicture = (username, url) => {
  return update(ref(db), {
    [`users/${username}/avatarURL`]: url
  }).catch(console.error);
};
