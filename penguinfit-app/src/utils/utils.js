const KEYWORD_PREFIX = 'keyword-';

const adornments = {
  duration: 'min',
  distance: 'km',
  weights: 'kg',
  caloriesBurned: 'kcal'
};

export const getAdornment = (field) => {
  return adornments[field] ?? `${field}`;
};

export const getDetailWithAdornment = (detailKey, detailValue) => {
  return `${detailValue} ${getAdornment(detailKey)}`;
};

// formulas elements to go to constants?? (no magic numbers)

export const getSteps = (activity, duration) => {
  if (activity.includes('walking')) {
    return duration * 100;
  }

  return 0;
};

const getCaloriesPerMinute = (MET = 0, userWeight = 0) => {
  const result = (MET * 3.5 * userWeight) / 200;
  return result;
};

export const getActivityTotalCalBurned = (MET, userWeight, duration) => {
  const CPM = getCaloriesPerMinute(MET, userWeight);
  const result = CPM * duration;
  return result;
};

export function calculateBMIMessage(BMI) {
  if (BMI >= 18.5 && BMI <= 25) {
    return 'You are within the healthy range!';
  } else if (BMI < 18.5) {
    return 'Your BMI result suggests you are underweight.';
  } else {
    return 'Your BMI result suggests you are overweight.';
  }
}

// date-utils

export const getDateAsString = (date) => date.toDateString();

export const getTimeAsString = (date) => date.toLocaleTimeString();

export const formatDateToString = (date) => `
${date.toDateString()} ${date.toLocaleTimeString()} `;

// navigation-utils

export const mapPages = (pages = null, mapperFn = () => null) => {
  if (!pages) return null;
  return Object.entries(pages).map(([key, value], i) => mapperFn(key, value, i));
};

export const renderPublicLinks = (pages = null, mapperFn = () => null) => {
  return mapPages(pages, mapperFn);
};

export const renderUserLinks = (user = null, login = null, pages = null, mapperFn = () => null) => {
  if (!user) return login;
  return mapPages(pages, mapperFn);
};

// string formatting utils

export const toSnakeCase = (string) => {
  string = formatString(string);

  if (string.includes(' ')) {
    string = string.split(' ').join('-');
  }

  return string;
};

export function toCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export const formatString = (string) => {
  return (
    string
      .replace(/[^a-zA-Zа-яА-ЯЁё0-9 ]/gi, '')
      // .replace(/[^a-zA-Z0-9\u0400-\u04FF]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase()
  );
};
export const isCyrillic = (string) => {
  return /[а-яА-ЯЁё]/.test(string);
};

export const toKeyword = (title) => {
  title = formatString(title);

  if (title.includes(' ')) {
    title = title.split(' ').join('');
  }

  return KEYWORD_PREFIX + title;
};

export const titleKeywordsToObject = (title) => {
  title = formatString(title);

  if (title.includes(' ')) {
    const keywordsArr = title.split(' ');
    const titleFormatted = KEYWORD_PREFIX + keywordsArr.join('');

    return keywordsArr.reduce(
      (obj, keyword) => {
        keyword = KEYWORD_PREFIX + keyword;
        return {
          ...obj,
          [keyword]: true
        };
      },
      { [titleFormatted]: true }
    );
  }

  const titleAsKeyword = KEYWORD_PREFIX + title;
  return { [titleAsKeyword]: true };
};

// object utils

export const getSortedKeys = (obj) => {
  return obj ? Object.keys(obj).sort() : [];
};

export const objectContainsKey = (obj, key) => {
  return Object.keys(obj).includes(key);
};

export const tagsToObject = (tags) => {
  if (tags === '') return {};

  tags = formatString(tags);

  if (!tags.includes(' ')) {
    return { [tags]: true };
  }

  return tags.split(' ').reduce((tagsObj, tag) => {
    return {
      ...tagsObj,
      [tag]: true
    };
  }, {});
};

export const tagsToArray = (tags) => {
  if (tags === '') return [];

  tags = formatString(tags);

  if (!tags.includes(' ')) {
    return [tags];
  }

  return tags.split(' ');
};
