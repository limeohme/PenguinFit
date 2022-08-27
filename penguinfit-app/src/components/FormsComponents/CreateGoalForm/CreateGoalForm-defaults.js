import { errorTypes } from './CreateGoalForm-errors';

export const defaultValues = {
  title: '',
  status: 'Not there yet', 
  dueDate: null,
  createdOn: new Date(),
  type: 'general',
  target: '',
  targetValue: '',
  currentValue: 0,
  achievedOn: '',
  
};

export const defaultErrors = errorTypes.reduce((defObj, errT) => {
  return {
    ...defObj,
    [errT]: null
  };
}, {});
