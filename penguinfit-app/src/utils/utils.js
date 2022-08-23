import { KEYWORD_PREFIX } from '../common/constants';

//BEWARE! NEW FUNCTIONS
// divide utils on topics

export const objectContainsKey = (obj, key) => {
  return Object.keys(obj).includes(key);
};

export const getSortedKeys = (obj) => {
  return Object.keys(obj).sort();
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

export const formatDateToString = (date) => `
${date.toDateString()} ${date.toLocaleTimeString()} `;

export const getDateAsString = (date) => date.toDateString();

export const getTimeAsString = (date) => date.toLocaleTimeString();

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

// string formatting

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

export const toSnakeCase = (string) => {
  string = formatString(string);

  if (string.includes(' ')) {
    string = string.split(' ').join('-');
  }

  return string;
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
