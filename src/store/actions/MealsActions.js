export const LOAD_PET_MEALS = "LOAD_PET_MEALS";
export const loadPetMeals = (meals) => {
  return { type: LOAD_PET_MEALS, meals };
};

export const STORE_NEW_MEAL = "STORE_NEW_MEAL";
export const storeNewMeal = (newMeal) => {
  return { type: STORE_NEW_MEAL, newMeal };
};

export const UPDATE_MEAL = "UPDATE_MEAL";
export const updateMeal = (meal) => {
  return { type: UPDATE_MEAL, meal };
};

export const DELETE_MEAL = "DELETE_MEAL";
export const deleteMeal = (mealId) => {
  return { type: DELETE_MEAL, mealId };
};