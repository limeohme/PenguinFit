import { get, ref, onValue, update, remove, push, limitToLast, orderByChild, query } from 'firebase/database';
import { activitiesMET } from '../common/activitiesMET';
import { ACTIVITIES_REQUEST_LIMIT } from '../common/constants';
// import { query, orderByChild, equalTo, onChildAdded, limitToLast, limitToFirst, startAfter, endBefore } from 'firebase/database';
// import { POST_REQUEST_LIMIT } from '../common/constants';
import { db } from '../config/firebase-config';
import { formatString, getActivityTotalCalBurned, getDateAsString, getTimeAsString } from '../utils/utils';

export const createActivityObject = (user = {}, input = {}) => {
  const { username, weight } = user;
  const { title, duration } = input;
  const calories = getActivityTotalCalBurned(activitiesMET[title], weight, duration);

  return {
    ...input,
    creator: username,
    calories,
    searchTitle: formatString(input.title),
    dateValue: Date.now(),
    createdOn: getDateAsString(new Date()),
    createdAt: getTimeAsString(new Date())
    // allKeywords: titleKeywordsToObject(input.title),
  };
};

export const addActivity = (username, activityObj) => {
  return push(ref(db, `activities/${username}`), activityObj);
};

export const getLiveUserActivities = (username, listen) => {
  return onValue(ref(db, `activities/${username}`), listen);
};

export const updateRelatedGoals = (user, activity) => {
  const existingTargets = activity.details.filter(Boolean);

  return Promise.all(
    existingTargets.map((target, _, targets) => {
      return console.log(targets[target]);
      //   return updateGoalTarget(user.username, activity.type, target, targets[target]);
    })
  );
};

// export const getSingleLiveUserActivity = (username) => {
//   return get(query(ref(db, `activities/${username}`), orderByChild('duration')));
// };

// export const getSingleLiveUserActivity = (username, listen) => {
//   return onChildAdded(query(ref(db, `activities/${username}`), orderByChild('duration')), listen);
// };

export const getMostRecentUserActivities = async (username, limit = ACTIVITIES_REQUEST_LIMIT) => {
  return get(query(ref(db, `activities/${username}`), orderByChild(`dateValue`), limitToLast(limit)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.entries(snapshot.val());
      }

      return [];
    })
    .catch(console.error);
};

export const getPostByHandle = (postId) => {
  return get(ref(db, `posts/${postId}`));
};

export const getSingleLivePost = (listen, postId) => {
  return onValue(ref(db, `posts/${postId}`), listen);
};

// TODO pagination

export const getAllPosts = (snapshot) => {
  if (!snapshot?.val()) return null;
  const postsAll = Object.values(snapshot.val());
  return postsAll;
};

export const getPostsCount = (snapshot) => {
  const postsCount = snapshot.size;
  return postsCount;
};

export const updatePosts = (postId, titleValue, contentValue) => {
  if (contentValue) update(ref(db, `posts/`), { [`${postId}/content`]: contentValue }).catch(console.error);
  if (titleValue) update(ref(db, `posts/`), { [`${postId}/title`]: titleValue }).catch(console.error);
};

export const updatePostLikes = (postId, likes) => {
  update(ref(db, `posts/`), { [`${postId}/likes`]: likes }).catch(console.error);
};

export const updatePostDislikes = (postId, dislikes) => {
  update(ref(db, `posts/`), { [`${postId}/dislikes`]: dislikes }).catch(console.error);
};
export const updatePostLikesCount = (postId, likesCount) => {
  update(ref(db, `posts/`), { [`${postId}/likesCount`]: likesCount }).catch(console.error);
};
export const updatePostDislikesCount = (postId, dislikesCount) => {
  update(ref(db, `posts/`), {
    [`${postId}/dislikesCount`]: dislikesCount
  }).catch(console.error);
};

export const updatePostPopularity = (postId, popularity) => {
  update(ref(db, `posts/`), { [`${postId}/popularity`]: popularity }).catch(console.error);
};

export const deletePost = (postId) => {
  const confirmAction = window.confirm('This post will be permanently deleted. Do you want to continue?');

  if (!confirmAction) return;

  remove(ref(db, `posts/${postId}`))
    .then()
    .catch(console.error);
};

// sort, search and filter posts:

// export const sortPostsBy = (sortTerm, limit = POST_REQUEST_LIMIT) => {
//   let sorted = [];

//   onChildAdded(query(ref(db, 'posts'), orderByChild(`${sortTerm}`), sortTerm === 'searchTitle' ? limitToFirst(limit) : limitToLast(limit)), (snapshot) => {
//     if (sortTerm === 'searchTitle') {
//       sorted = [...sorted, snapshot.val()];
//     } else {
//       sorted = [snapshot.val(), ...sorted];
//     }
//   });

//   return sorted;
// };

// export const filterPostsBy = (filterTerm, value, limit = POST_REQUEST_LIMIT) => {
//   let filtered = [];

//   onChildAdded(query(ref(db, 'posts'), orderByChild(`${filterTerm}`), equalTo(value), limitToFirst(limit)), (snapshot) => {
//     filtered = [snapshot.val(), ...filtered];
//   });

//   return filtered;
// };

/// UNUSED

// export const searchPostsByTitleKeyword = (title) => {
//   return get(query(ref(db, `posts`), orderByChild(`${title}`), equalTo(true)));
// };

// export const filterPostsByTag = (tagname) => {
//   return get(
//     query(ref(db, `posts`), orderByChild(`${tagname}`), equalTo(true)),
//   );
// };

// export const filterPostsByUsername = (username) => {
//   return get(
//     query(ref(db, `posts`), orderByChild(`author`), equalTo(`${username}`)),
//   );
// };

// export const filterPostsByAlphabet = (boolean) => {
//   return get(
//     query(ref(db, `posts`), orderByChild(`cyrillic`), equalTo(boolean)),
//   );
// };

export const documentToArr = (snapshot) => {
  const value = snapshot.val();
  const arr = Object.values(value);
  const last = arr[arr.length - 1];

  return { arr, last };
};

// export const getOrderedPostsBy = (dbLocation = '', criteria = '', action = '', value = null, index = '', limit = POST_REQUEST_LIMIT) => {
//   const ordered = [];
//   let queryRef;

//   const search = criteria === 'searchTitle';
//   let at, by, sameAs, start, lim;

//   at = ref(db, dbLocation);
//   by = orderByChild(criteria);
//   sameAs = equalTo(value);
//   start = search ? startAfter(index) : endBefore(index);
//   lim = search ? limitToFirst(limit) : limitToLast(limit);

//   // lim = index ? limitToFirst(limit) : limitToLast(limit);

//   index
//     ? (queryRef = action === 'filter' ? query(at, by, sameAs, start, lim) : query(at, by, start, lim))
//     : (queryRef = action === 'filter' ? query(at, by, sameAs, lim) : query(at, by, lim));

//   // return get(queryRef);
//   // return onValue(queryRef, fn);

//   onChildAdded(queryRef, (snapshot) => {
//     console.log(snapshot.val()[criteria] + snapshot.val()['createdOn'] + snapshot.val()['searchTitle']);

//     ordered.push(snapshot.val());
//   });

//   return ordered;
// };

// export const lastTry = (sortCriteria, index, limit = POST_REQUEST_LIMIT) => {
//   const sorted = [];

//   onChildAdded(query(ref(db, 'posts'), orderByChild(sortCriteria), startAfter(index), limitToFirst(limit)), (snapshot) => {
//     sorted.push(snapshot.val());
//     // sorted = [snapshot.val(), ...sorted];
//   });

//   return sorted;
// };

// export const lastTry2 = (sortCriteria, index, limit = POST_REQUEST_LIMIT) => {
//   return get(query(ref(db, 'posts'), orderByChild(sortCriteria), endBefore(index), limitToLast(limit)));
// };
