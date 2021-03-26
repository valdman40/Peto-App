export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
};

export const ScreensRouteName = {
  MAIN_SCREEN: "MAIN_SCREEN",
  SECOND_SCREEN: "SECOND_SCREEN",
  PETS_SCREEN: "PETS_SCREEN",
  PET_DETAILS_SCREEN: "PET_DETAILS_SCREEN",
};

export const ReducersNames = {
  User: "User",
  Pets: "Pets",
};

/**
 * return date in the format 'yyyy-mm-ddThours_min_sec_ms'
 * @param {*} date
 */
export const getFullTimeStringExtension = (date) => {
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  let hours = date.getHours();
  hours = hours < 10 ? `0${hours}` : hours;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let seconds = date.getSeconds();
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  let ms = date.getMilliseconds();
  if (ms < 100) {
    if (ms < 10) {
      ms = `0${ms}`;
    }
    ms = `0${ms}`;
  }
  return `${date.getFullYear()}-${month}-${day}T${hours}_${minutes}_${seconds}_${ms}`;
};
