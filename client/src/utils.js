export const initDateObject = (date) => {
  // takes an ISO 8601 as argument // eg. 2012-04-23T18:25:43.511Z
  const year = parseInt(date.slice(0, 4));
  const month = parseInt(date.slice(5, 7));
  const day = parseInt(date.slice(8, 10));
  const hrs = parseInt(date.slice(11, 13));
  const mins = parseInt(date.slice(14, 16));
  const secs = parseInt(date.slice(17, 19));
  const newDateObject = new Date(date);
  return newDateObject;
};

//  // takes 2 date objects as arguments
export const compareDates = (date1, date2) => {
  const difference = date1.getTime() - date2.getTime();
  console.log(date1);
  console.log(date2);
};
