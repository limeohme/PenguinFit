import { typesTargets } from '../common/types-targets';
import { formatString, getActivityTotalCalBurned, getDateAsString, getDetailWithAdornment, getSortedKeys, getSteps, getTimeAsString } from './utils';

// activities data obj
const activities = {
  'resistance training': {
    type: 'strength',
    MET: 4
  },
  jogging: {
    type: 'cardio',
    MET: 7
  },
  'running: 8 km/h': {
    type: 'cardio',
    MET: 8.3
  },
  'running: 10 km/h': {
    type: 'cardio',
    MET: 10.3
  },
  'running: 15 km/h': {
    type: 'cardio',
    MET: 13
  },
  bicycling: {
    type: 'cardio',
    MET: 7.5
  },
  'swimming, light/moderate': {
    type: 'cardio',
    MET: 6
  },
  'swimming, vigorous effort': {
    type: 'cardio',
    MET: 9.8
  },
  canoeing: {
    type: 'cardio',
    MET: 5
  },
  kayaking: {
    type: 'cardio',
    MET: 5
  },
  'backpacking / hiking': {
    type: 'cardio',
    MET: 7.8
  },
  'walking - light pace, < 5 km/h': {
    type: 'cardio',
    MET: 3
  },
  'walking - moderate pace, 5 km/h': {
    type: 'cardio',
    MET: 3.5
  },
  'walking - fast pace, > 5 km/h': {
    type: 'cardio',
    MET: 5
  },
  'dog walking': {
    type: 'cardio',
    MET: 3
  },
  'cleaning (home)': {
    type: 'other',
    MET: 5
  },
  laundry: {
    type: 'other',
    MET: 4
  },
  cooking: {
    type: 'other',
    MET: 3
  },
  gardening: {
    type: 'other',
    MET: 3.5
  },
  'child care': {
    type: 'other',
    MET: 2.5
  },
  'playing with children': {
    type: 'other',
    MET: 3
  },
  sitting: {
    type: 'other',
    MET: 1.5
  },
  lying: {
    type: 'other',
    MET: 1
  },
  soccer: {
    type: 'other',
    MET: 8
  },
  basketball: {
    type: 'other',
    MET: 6.5
  },
  volleyball: {
    type: 'other',
    MET: 5
  },
  tennis: {
    type: 'other',
    MET: 7.3
  },
  badminton: {
    type: 'other',
    MET: 5.5
  },
  skiing: {
    type: 'other',
    MET: 7
  },
  gymnastics: {
    type: 'other',
    MET: 3.8
  },
  'circuit training': {
    type: 'other',
    MET: 6
  },
  'rope skipping': {
    type: 'other',
    MET: 12
  },
  pilates: {
    type: 'other',
    MET: 3
  },
  aerobics: {
    type: 'other',
    MET: 7
  },
  'water aerobics': {
    type: 'other',
    MET: 5
  },
  stretching: {
    type: 'other',
    MET: 2.3
  },
  'hatha yoga': {
    type: 'other',
    MET: 2.5
  },
  'power yoga': {
    type: 'other',
    MET: 4
  },
  ballet: {
    type: 'other',
    MET: 5
  },
  dancing: {
    type: 'other',
    MET: 7.8
  },
  'rock climbing': {
    type: 'other',
    MET: 7.5
  },
  'martial arts': {
    type: 'other',
    MET: 10
  },
  'hacky sack': {
    type: 'other',
    MET: 4
  },
  'tai chi': {
    type: 'other',
    MET: 3
  },
  skateboarding: {
    type: 'other',
    MET: 5
  },
  rollerskating: {
    type: 'other',
    MET: 7
  },
  'ice skating': {
    type: 'other',
    MET: 7
  },
  bowling: {
    type: 'other',
    MET: 3
  },
  billiards: {
    type: 'other',
    MET: 2.5
  },
  golf: {
    type: 'other',
    MET: 4.8
  },
  'sexual activity': {
    type: 'other',
    MET: 2
  },
  coding: {
    type: 'other',
    MET: 26
  },
  'soft skills session': {
    type: 'other',
    MET: 36
  }
};

const activityDetailsByType = {
  cardio: [
    {
      name: 'distance',
      type: 'number',
      label: 'Distance (optional)',
      adornment: 'km'
    }
  ],
  strength: [
    {
      name: 'weights',
      type: 'number',
      label: 'Weights (optional)',
      adornment: 'kg'
    },
    {
      name: 'sets',
      type: 'number',
      label: 'Sets (optional)',
      adornment: ''
    },
    {
      name: 'reps',
      type: 'number',
      label: 'Reps (optional)',
      adornment: ''
    }
  ],
  other: []
};

const getActivityObj = (activity) => activities[activity];
const getActivityTypes = () => Object.keys(activityDetailsByType);

export const getTargets = (activity) => {
  return typesTargets[activities[activity]?.type || 'general'];
};

const getActivityType = (activity) => {
  return getActivityObj(activity)?.type;
};

const getActivityMET = (activity) => {
  return getActivityObj(activity).MET;
};

export const sortedActivities = getSortedKeys(activities);
export const activityTypes = getActivityTypes();

export const isActivityInList = (activity) => sortedActivities.includes(activity);

export const getActivityTypeDetails = (activity) => {
  const activityType = getActivityType(activity);
  if (activityType) return activityDetailsByType[activityType];
  return [];
};

export const createActivityObject = (user = {}, input = {}) => {
  const { username, weight } = user;
  const { activity, duration, distance, weights, sets, reps, buddy } = input;

  const creator = username;
  const caloriesBurned = getActivityTotalCalBurned(getActivityMET(activity), weight, duration);
  const type = getActivityType(activity);
  const steps = getSteps(activity, duration);
  const dateValue = Date.now();
  const createdOn = getDateAsString(new Date());
  const createdAt = getTimeAsString(new Date());
  const searchActivity = formatString(activity);

  return {
    creator,
    activity,
    type,
    details: {
      caloriesBurned,
      duration,
      distance,
      weights,
      sets,
      reps,
      steps
    },
    buddy,
    dateValue,
    createdOn,
    createdAt,
    searchActivity
    // allKeywords: activityKeywordsToObject(activity),
  };
};

export const updateActivityDateAndTime = (activityObj) => {
  return {
    ...activityObj,
    createdOn: getDateAsString(new Date()),
    createdAt: getTimeAsString(new Date())
  };
};

export const createActivityRequest = (sender, activityHandle, receiver) => {
  return {
    sender,
    activityHandle,
    receiver
  };
};

export const updateRequestedActivity = (activityObj) => {
  return {
    ...activityObj,
    buddy: activityObj.creator,
    createdOn: getDateAsString(new Date()),
    createdAt: getTimeAsString(new Date()),
    requestHandle: null
  };
};

export const getActivityRequestsArray = (requestsSnapshot) => {
  const requestsData = Object.entries(requestsSnapshot.val());

  return requestsData.map(([requestHandle, request]) => {
    return { ...request, requestHandle };
  });
};

export const activityDetailsToString = (activityDetails) => {
  const detailsAsString = Object.entries(activityDetails)
    .filter(([key, value]) => {
      return key !== 'duration' && key !== 'caloriesBurned' && value !== 0;
    })
    .map(([key, value]) => {
      return getDetailWithAdornment(key, value);
    })
    .join(', ');

  if (detailsAsString) {
    return detailsAsString + ', ';
  }

  return detailsAsString;
};
