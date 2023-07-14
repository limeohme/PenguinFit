import { GOAL_TARGET_VALUE_MAX, GOAL_TARGET_VALUE_MIN, GOAL_TITLE_LENGTH_MAX, GOAL_TITLE_LENGTH_MIN } from '../../../common/constants';

export const errorMassages = {
  title: `title length must be from ${GOAL_TITLE_LENGTH_MIN} to ${GOAL_TITLE_LENGTH_MAX}`, 
  dueDate: null,
  type: 'choose type',
  target: 'choose target',
  targetValue: `choose form ${GOAL_TARGET_VALUE_MIN} to ${GOAL_TARGET_VALUE_MAX}`,
};

export const errorTypes = Object.keys(errorMassages);

export const errorTypesObj = errorTypes.reduce((mirrored, errT) => {
  return {
    ...mirrored,
    [errT]: errT
  };
}, {});
