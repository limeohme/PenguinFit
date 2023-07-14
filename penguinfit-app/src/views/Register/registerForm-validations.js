// import { GOAL_TARGET_VALUE_MAX, GOAL_TARGET_VALUE_MIN, GOAL_TITLE_LENGTH_MAX, GOAL_TITLE_LENGTH_MIN } from '../../../common/constants';
import { mailRE, PASSWORD_MIN, USER_AGE_MAX, USER_AGE_MIN, USER_USERNAME_MAX, USER_USERNAME_MIN } from '../../common/constants';
import { errorMassages, errorTypesObj } from './registerForm-errors';

const validateUsername = (username, type) => {
  if (!username || username.length < USER_USERNAME_MIN || username.length > USER_USERNAME_MAX  ) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validatePassword = (password, type) => {
  if (!password || password.length < PASSWORD_MIN ) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validatePasswordCheck = (passwordCheck, password, type) => {
  if (passwordCheck !== password ) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validateAge = (age, type) => {
  if (!age || age.length < USER_AGE_MIN || age.length > USER_AGE_MAX  ) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validateEmail = (email, type) => {
  if (!email || email.toLowerCase().match(mailRE)) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validateWeight = (weight, type) => {
  if (!weight) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validateHeight = (height, type) => {
  if (!height) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validateRegisterInput = (input) => {
  const { username, password, passwordCheck, age, email, weight, height } = input;

  validateUsername(username, errorTypesObj['username']);
  validatePassword(password, errorTypesObj['password']);
  validatePasswordCheck(passwordCheck, password, errorTypesObj['passwordCheck']);
  validateAge(age, errorTypesObj['age']);
  validateEmail(email, errorTypesObj['email']);
  validateHeight(height, errorTypesObj['height']);
  validateWeight(weight, errorTypesObj['weight']);

};

export const isValidRegisterInput = (input , errorSetter, defaultErrors) => {
  try {
    validateRegisterInput(input);
    return true;
  } catch (err) {
    // console.log(err);
    errorSetter({ ...defaultErrors, [err.cause]: { msg: err.message } });
    return false;
  }
};
