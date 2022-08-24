import { isActivityInList } from '../../../utils/activities-utils';
import { errorMassages, errorTypesObj } from './CreateActivityForm-errors';

const validateActivity = (activity, type) => {
  if (!isActivityInList(activity)) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validateDuration = (duration, type) => {
  if (!duration || duration === 0) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validateBuddy = (buddy, friendList, type) => {
  if (buddy) {
    if (!friendList.includes(buddy)) {
      throw new Error(errorMassages[type], { cause: type });
    }
  }
};

const validateActivityInput = (input, friends) => {
  const { activity, duration, buddy } = input;

  validateActivity(activity, errorTypesObj['activity']);
  validateDuration(duration, errorTypesObj['duration']);
  validateBuddy(buddy, friends, errorTypesObj['buddy']);
};

export const isValidActivityInput = (input, friendsArr, errorSetter, defaultErrors) => {
  try {
    validateActivityInput(input, friendsArr);
    return true;
  } catch (err) {
    // console.log(err);
    errorSetter({ ...defaultErrors, [err.cause]: { msg: err.message } });
    return false;
  }
};
