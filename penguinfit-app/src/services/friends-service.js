import { get, ref, remove, set } from 'firebase/database';
import { db } from '../config/firebase-config';

export const sendFriendRequest = (sender, receiver) => {
  const request = createFriendRequest(sender, receiver);
  
  get(ref(db, `requests/${sender}/${receiver}`)).then((snapshot) => {
    const sentRequests = snapshot.val() || {};
    set(ref(db, `requests/${sender}/${receiver}`), { ...sentRequests, ...request });
  });

  get(ref(db, `requests/${receiver}/${sender}`)).then((snapshot) => {
    const receivedRequests = snapshot.val() || {};
    set(ref(db, `requests/${receiver}/${sender}`), { ...receivedRequests, ...request });
  });
};

export const deleteFriendRequest = (sender, receiver) => {
  remove(ref(db, `requests/${sender}/${receiver}`));
  remove(ref(db, `requests/${receiver}/${sender}`));
};

export const acceptFriendRequest = (sender, receiver) => {
  addFriend(sender, receiver);
  addFriend(receiver, sender);
  deleteFriendRequest(sender, receiver);
};

const addFriend = (handle, friend) => {
  get(ref(db, `users/${handle}/friends`)).then((snapshot) => {
    const userFriends = snapshot.val() || {};
    console.log(handle, friend , { ...userFriends, [friend]:true });
    set(ref(db, `users/${handle}/friends`), { ...userFriends, [friend]:true });
  });
};


const createFriendRequest = (sender, receiver) => {
  return{
    createdOn: Date.now(),
    sender,
    receiver,
  };
};

export const getUserRequest = (handle) => {
  return get(ref(db, `requests/${handle}`));
};