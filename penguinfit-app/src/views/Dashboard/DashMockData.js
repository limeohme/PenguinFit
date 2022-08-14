const users = {
  BabyPenguin78: {
    username: 'BabyPenguin78',
    dataByDay: {
      'Sun Aug 14 2022': {
        date: 'Sun Aug 14 2022',
        cal: {
          burned: 1895,
          consumed: 2000
        },
        waterIntake: 2000,
        steps: 7854,
        totalActivityDuration: 300
      },
      'Mon Aug 15 2022': {
        date: 'Mon Aug 15 2022',
        cal: {
          burned: 1895,
          consumed: 2000
        },
        waterIntake: 2000,
        steps: 7854,
        totalActivityDuration: 80
      },
      'Tue Aug 16 2022': {
        date: 'Tue Aug 16 2022',
        cal: {
          burned: 1895,
          consumed: 2400
        },
        waterIntake: 2000,
        steps: 7854,
        totalActivityDuration: 123
      },
      'Wed Aug 17 2022': {
        date: 'Wed Aug 17 2022',
        cal: {
          burned: 895,
          consumed: 2000
        },
        waterIntake: 2000,
        steps: 7854,
        totalActivityDuration: 200
      },
      'Thu Aug 18 2022': {
        date: 'Thu Aug 18 2022',
        cal: {
          burned: 1295,
          consumed: 2000
        },
        waterIntake: 2000,
        steps: 784,
        totalActivityDuration: 350
      },
      'Thu Aug 19 2022': {
        date: 'Thu Aug 19 2022',
        cal: {
          burned: 2895,
          consumed: 2000
        },
        waterIntake: 2000,
        steps: 784,
        totalActivityDuration: 133
      },
    },
    nutrients: {
      fats: 3000,
      carbs: 4000,
      protein: 3560
    },
    goalsStatus: {
      achieved: 36,
      notYet: 6
    }
  }

};

export const getGoalsDistribution = (username) => {
  const goalsCount = users[username].goalsStatus;
  const data = [
    { x: 'achieved', y: goalsCount.achieved },
    { x: 'not yet', y: goalsCount.notYet }
  ];
  return data;
};
export const getNutrientDistribution = (username) => {
  const nutrientsCount = users[username].nutrients;
  const data = [
    { x: 'carbs', y: nutrientsCount.carbs },
    { x: 'fats', y: nutrientsCount.fats },
    { x: 'protein', y: nutrientsCount.protein },
  ];
  return data;
};

export const getCaloriesToday = (username) => {
  return users[username].dataByDay['Sun Aug 14 2022'].cal.consumed;
};

export const getWaterToday = (username) => {
  return users[username].dataByDay['Sun Aug 14 2022'].waterIntake;
};

export const getStepsToday = (username) => {
  return users[username].dataByDay['Sun Aug 14 2022'].steps;
};

export const getExerciseDurationByDate = (username) => {
  return Object.values(users[username].dataByDay).map((el) => {
    return { x: el.date.split(' ')[2], y: el.totalActivityDuration };
  });
};

export const getCalorieDifferenceByDate = (username) => {
  return Object.values(users[username].dataByDay).map((el) => {
    return { x: el.date.split(' ')[2], y: el.cal.consumed - el.cal.burned };
  });
};

export const addWater = (username) => {
  users[username].dataByDay['Sun Aug 14 2022'].waterIntake += 250;
};
