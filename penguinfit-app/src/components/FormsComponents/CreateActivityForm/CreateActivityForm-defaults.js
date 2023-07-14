import { errorTypes } from './CreateActivityForm-errors';

export const defaultValues = {
  activity: null,
  duration: 0,
  distance: 0,
  weights: 0,
  sets: 0,
  reps: 0,
  buddy: ''
};

export const defaultErrors = errorTypes.reduce((defObj, errT) => {
  return {
    ...defObj,
    [errT]: null
  };
}, {});
