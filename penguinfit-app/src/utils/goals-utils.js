export const goalTypes = {
  general:'general',
  byActivity:'byActivity',
};


const extractGoals = (obj) => {
  if(!obj) return [];
  return Object.values(obj).map(el => Object.values(el) );
};


export const getSteps = (obj) => {
  if(!obj) return { celebrated:[], other:[] };
  return divideSteps ([...Object.values(obj).map(el => extractGoals(el))].flat(2));
};

const divideSteps = (arr) => {
  const other = [];
  const celebrated = [];
  arr.forEach(el => {
    if(el.status === 'celebrated'){
      celebrated.push(el);
      return;
    }
    other.push(el);
  });
  return { celebrated, other };
};

export const formatDate = (date) => {
  if(!date) return null;
  const dateToSeconds = (new Date(date));
  return dateToSeconds.toLocaleDateString('en-us', { year:'numeric', month:'short', day:'numeric' });
};

export const activateConfetti = (set) => {
  set(true);
  setTimeout(() => {
    set(false);
  }, 6000);
};