import { errorTypes } from './registerForm-errors';

export const defaultValues = {
  username: '',
  password: '',
  passwordCheck: '',
  age: '',
  email: '',
  weight: '',
  height: '',
  phoneNumber: '',
  activityStatus: 1,
  BMI: '',
  goalsStatus:{
    achieved:0,
    notYet:0,
  }
};

export const defaultErrors = errorTypes.reduce((defObj, errT) => {
  return {
    ...defObj,
    [errT]: null
  };
}, {});
