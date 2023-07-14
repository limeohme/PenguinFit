export const goalTypes = {
  general: 'general',
  byActivity: 'byActivity'
};

const extractGoals = (obj) => {
  if (!obj) return [];
  return Object.values(obj).map((el) => Object.values(el));
};

export const getSteps = (obj) => {
  if (!obj) return { celebrated: [], other: [] };
  return divideSteps([...Object.values(obj).map((el) => extractGoals(el))].flat(2));
};

const divideSteps = (arr) => {
  const other = [];
  const celebrated = [];
  arr.forEach((el) => {
    if (el.status === 'celebrated') {
      celebrated.push(el);
      return;
    }
    other.push(el);
  });

  return { celebrated: sortGoals(celebrated), other: sortGoals(other) };
};

const sortGoals = (goalsArr) => {
  return goalsArr.sort((a, b) => b.createdOn - a.createdOn);
};
export const formatDate = (date) => {
  if (!date) return null;
  const dateToSeconds = new Date(date);
  return dateToSeconds.toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const activateConfetti = (set) => {
  set(true);
  setTimeout(() => {
    set(false);
  }, 6000);
};

export const parseDate = (date) => new Date(date).toLocaleDateString('en-uk', { year: 'numeric', month: 'short', day: 'numeric' });

export const millisecondsToDHM = (ms) => {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 10000));
  const minutesms = ms % (60 * 1000);
  const sec = Math.floor(minutesms / 1000);
  return `${days} days, ${hours} hrs, ${minutes} min, ${sec} sec`;
};
