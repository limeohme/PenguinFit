import { db } from '../config/firebase-config';
import { get, push, set, update, ref, query, onValue, orderByChild, equalTo } from 'firebase/database';
import { getDateAsString } from '../utils/utils';
import { updateUserInfo } from './local-storage-service';
import { createNewDataByDay } from './meals-service';

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const getUserFriends = (handle) => {
  return get(ref(db, `users/${handle}/friends`)).then((snapshotFriendsHandle) => {
    if (!snapshotFriendsHandle.val()) {
      return [];
    }

    const friendsHandles = snapshotFriendsHandle.val();

    return Promise.all(
      Object.keys(friendsHandles).map((key) => {
        return get(ref(db, `users/${key}`)).then((snapshotFriend) => {
          return snapshotFriend.val();
        });
      })
    );
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

// user/dataByDay service

export const getUserDataOfDay = (username) => {
  const today = getDateAsString(new Date());
  return get(query(ref(db, `users/${username}/dataByDay`), orderByChild('date'), equalTo(today)));
};

const setUserDataOfDay = (username, data) => {
  const filledData = fillActivityData(data);

  return push(ref(db, `users/${username}/dataByDay`), filledData);
};

const fillActivityData = (data) => {
  const blankDataObj = createNewDataByDay();

  const { caloriesBurned, duration, activityType, activityHandle } = data;
  const stepsMade = data.steps ? data.steps : 0;

  return {
    ...blankDataObj,
    cal: {
      ...blankDataObj.cal,
      burned: caloriesBurned
    },
    totalActivityDuration: duration,
    steps: stepsMade,
    activities: [{ caloriesBurned, duration, activityHandle, activityType }]
  };
};

const updateTodaysActivitiesData = (username, data, dateHandle, prevData) => {
  const {
    totalActivityDuration,
    cal: { burned },
    steps
  } = prevData;

  const { caloriesBurned, duration } = data;
  const stepsMade = data.steps ? data.steps : 0;

  const path = `users/${username}/dataByDay/${dateHandle}/`;

  const updates = {
    [path + `totalActivityDuration`]: totalActivityDuration + duration,
    [path + `cal/burned`]: burned + caloriesBurned,
    [path + `steps`]: steps + stepsMade
  };

  return update(ref(db), updates);
};

const updateTodaysActivities = (username, newActivityData, dateHandle, prevActivities) => {
  const { caloriesBurned, duration, activityType, activityHandle } = newActivityData;
  const data = { caloriesBurned, duration, activityType, activityHandle };

  if (prevActivities?.length) {
    return update(ref(db), {
      [`users/${username}/dataByDay/${dateHandle}/activities`]: [...prevActivities, data]
    });
  }

  return set(ref(db, `users/${username}/dataByDay/${dateHandle}/activities`), [data]);
};

export const updateUserActivitiesDataByDay = (username, data) => {
  return getUserDataOfDay(username)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const [dateHandle, prevData] = Object.entries(snapshot.val())[0];

        return updateTodaysActivitiesData(username, data, dateHandle, prevData).then(() => {
          return updateTodaysActivities(username, data, dateHandle, prevData.activities);
        });
      }

      return setUserDataOfDay(username, data);
    })
    .catch(console.error);
};

const getUserGoalsStatus = (username) => {
  return get(ref(db, `users/${username}/goalsStatus`))
    .then((snapshot) => {
      return snapshot.val() || 0;
    })
    .catch(console.error);
};

export const updateUserGoalsStatus = (username) => {
  return getUserGoalsStatus(username)
    .then((goalsStatus) => {
      const updates = {
        [`users/${username}/goalsStatus/achieved`]: ++goalsStatus.achieved,
        [`users/${username}/goalsStatus/notYet`]: --goalsStatus.notYet
      };

      return update(ref(db), updates);
    })
    .catch(console.error);
};

export const incrementUserGoalsStatus = (username, status) => {
  get (ref(db, `users/${username}/goalsStatus/${status}`))
    .then((snapshot) => {
      let currentCount = snapshot.val() || 0;
      set (ref(db, `users/${username}/goalsStatus/${status}`), ++currentCount);
    })
    .catch(console.error);
};

// export const decrementUserGoalsStatus = (username, status) => {
//   get (ref(db, `users/${username}/goalsStatus/${status}`))
//     .then((snapshot) => {
//       let currentCount = snapshot.val() || 0;
//       set (ref(db, `users/${username}/goalsStatus/${status}`), --currentCount);
//     })
//     .catch(console.error);
// };