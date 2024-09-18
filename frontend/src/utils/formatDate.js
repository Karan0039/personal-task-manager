const formateDate = (date, {time = false} = {}) => {
  let options = {};
  if (time) {
    options = {hour: 'numeric', minute: 'numeric'};
  }
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    // year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(date);
};
export {formateDate};
