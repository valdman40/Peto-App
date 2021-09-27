export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const ScreensRouteName = {
  LOGIN_SCREEN: "LOGIN_SCREEN",
  SETTINGS: "SETTINGS",
  REGISTER_SCREEN: "REGISTER_SCREEN",
  EDIT_USER_SCREEN: "EDIT_USER_SCREEN",
  MENU_SCREEN: "MENU_SCREEN",
  PETS_SCREEN: "PETS_SCREEN",
  PET_DETAILS_SCREEN: "PET_DETAILS_SCREEN",
  PET_ADD_SCREEN: "PET_ADD_SCREEN",
  PET_MEAL_SCREEN: "PET_MEAL_SCREEN",
  ADD_EDIT_MEAL_SCREEN: "ADD_EDIT_MEAL_SCREEN",
  PET_MEAL_HISTORY_SCREEN: "PET_MEAL_HISTORY_SCREEN",
  PET_MEAL_HISTORY_GRAPH_SCREEN: "PET_MEAL_HISTORY_GRAPH_SCREEN",
};

export const ReducersNames = {
  User: "User",
  Pets: "Pets",
  Meals: "Meals",
  Debug: "Debug",
  Settings: "Settings",
};

export const getRestApi = (urlBase) => {
  return {
    Users: {
      GetUser: `${urlBase}/users`,
      RegisterUser: `${urlBase}/users`,
      EditUser: `${urlBase}/users`,
      UpdateToken: `${urlBase}/updateToken`,
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
      GetPetMealsHistory: `${urlBase}/meal/history/pet`,
    },
  };
};