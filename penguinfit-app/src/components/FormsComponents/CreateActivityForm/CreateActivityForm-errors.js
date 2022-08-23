export const errorMassages = {
  activity: 'choose activity from the menu',
  duration: 'add duration',
  buddy: 'choose user from the menu or skip',
  number: 'only positive numbers'
};

export const errorTypes = Object.keys(errorMassages);

export const errorTypesObj = errorTypes.reduce((mirrored, errT) => {
  return {
    ...mirrored,
    [errT]: errT
  };
}, {});
