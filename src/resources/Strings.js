export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const ScreensRouteName = {
  LOGIN_SCREEN: "LOGIN_SCREEN",
  REGISTER_SCREEN: "REGISTER_SCREEN",
  EDIT_USER_SCREEN: "EDIT_USER_SCREEN",
  MENU_SCREEN: "MENU_SCREEN",
  PETS_SCREEN: "PETS_SCREEN",
  PET_DETAILS_SCREEN: "PET_DETAILS_SCREEN",
  PET_ADD_SCREEN: "PET_ADD_SCREEN",
  PET_MEAL_SCREEN: "PET_MEAL_SCREEN",
  ADD_EDIT_MEAL_SCREEN: "ADD_EDIT_MEAL_SCREEN",
  SETTINGS: "SETTINGS",
};

export const ReducersNames = {
  User: "User",
  Pets: "Pets",
  Meals: "Meals",
  Debug: "Debug",
  Settings: "Settings",
};

const urlBase = "http://10.0.0.9:5000";

export const getUrl = (urlBase) => {
  return {
    Users: {
      GetUser: `${urlBase}/users`,
      RegisterUser: `${urlBase}/users`,
      EditUser: `${urlBase}/users`,
    },
    Pets: {
      GetPet: `${urlBase}/pets`,
      GetUserPets: `${urlBase}/pets/user`,
      DeletePet: `${urlBase}/pets`,
      InsertPet: `${urlBase}/pets`,
      FeedPet: `${urlBase}/pets/feed`,
    },
    Meal: {
      UpdateMeal: `${urlBase}/meal`,
      DeleteMeal: `${urlBase}/meal`,
      InsertMeal: `${urlBase}/meal/pet`,
      GetPetMeals: `${urlBase}/meal/pet`,
    },
  };
};

export const RestApiExtensions = {
  Users: {
    GetUser: `${urlBase}/users`,
    RegisterUser: `${urlBase}/users`,
    EditUser: `${urlBase}/users`,
  },
  Pets: {
    GetPet: `${urlBase}/pets`,
    GetUserPets: `${urlBase}/pets/user`,
    DeletePet: `${urlBase}/pets`,
    InsertPet: `${urlBase}/pets`,
    FeedPet: `${urlBase}/pets/feed`,
  },
  Meal: {
    UpdateMeal: `${urlBase}/meal`,
    DeleteMeal: `${urlBase}/meal`,
    InsertMeal: `${urlBase}/meal/pet`,
    GetPetMeals: `${urlBase}/meal/pet`,
  },
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
