import { GOAL_TARGET_VALUE_MAX, GOAL_TARGET_VALUE_MIN, GOAL_TITLE_LENGTH_MAX, GOAL_TITLE_LENGTH_MIN } from '../../../common/constants';
import { errorMassages, errorTypesObj } from './CreateGoalForm-errors';

const validateTitle = (title, type) => {
  if (title.length < GOAL_TITLE_LENGTH_MIN || title.length > GOAL_TITLE_LENGTH_MAX ) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validateType = (passed, type) => {
  if (!passed ) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validateTarget = (target, type) => {
  if (!target ) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validateTargetValue = (targetValue, type) => {
  if (Number(targetValue) < GOAL_TARGET_VALUE_MIN || Number(targetValue) > GOAL_TARGET_VALUE_MAX ) {
    throw new Error(errorMassages[type], { cause: type });
  }
};

const validateGoalInput = (input) => {
  const { title, type, target, targetValue } = input;

  validateTitle(title, errorTypesObj['title']);
  validateType(type, errorTypesObj['type']);
  validateTarget(target, errorTypesObj['target']);
  validateTargetValue(targetValue, errorTypesObj['targetValue']);



  // validateBuddy(buddy, friends, errorTypesObj['buddy']);
};

export const isValidGoalInput = (input , errorSetter, defaultErrors) => {
  try {
    validateGoalInput(input);
    return true;
  } catch (err) {
    // console.log(err);
    errorSetter({ ...defaultErrors, [err.cause]: { msg: err.message } });
    return false;
  }
};
