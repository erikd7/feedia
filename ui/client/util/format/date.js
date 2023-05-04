const yearRegex = /(\d{4})/g;

export const getYearFromDate = dateString => {
  const matches = dateString.match(yearRegex);

  if (matches && matches.length > 0) {
    return parseInt(matches[0]);
  } else {
    return dateString;
  }
};
