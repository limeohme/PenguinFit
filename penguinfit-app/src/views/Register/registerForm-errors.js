import { PASSWORD_MIN, USER_AGE_MAX, USER_AGE_MIN, USER_USERNAME_MAX, USER_USERNAME_MIN } from '../../common/constants';

export const errorMassages = {
  username: `add must be from ${USER_USERNAME_MIN} to ${USER_USERNAME_MAX} characters`,
  password: `password must be at least ${PASSWORD_MIN}`,
  passwordCheck: `passwords don't match`,
  age: `add must be from ${USER_AGE_MIN} to ${USER_AGE_MAX}`,
  email: 'email is not valid',
  weight: 'add weight',
  height: 'add height',
};

export const errorTypes = Object.keys(errorMassages);

export const errorTypesObj = errorTypes.reduce((mirrored, errT) => {
  return {
    ...mirrored,
    [errT]: errT
  };
}, {});
