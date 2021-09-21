import {
  LOAD_PET_MEALS,
  STORE_NEW_MEAL,
  DELETE_MEAL,
  UPDATE_MEAL,
  LOAD_PET_MEALS_HISTORY,
} from "../actions/MealsActions";

// const initSched = [
//   { meal_name: "meal1", amount: 100, meal_time: "01:00", id: 1, pet_id: 1 },\
// ];
const initMeals = [];
const initMealsHistory = [];

const initialState = {
  meals: initMeals,
  mealsHistory: initMealsHistory,
};

const mealsReducer = (state = initialState, action) => {
  const { meals } = state;
  switch (action.type) {
    case LOAD_PET_MEALS:
      return {
        ...state,
        meals: action.meals,
      };
    case LOAD_PET_MEALS_HISTORY:
      return {
        ...state,
        mealsHistory: action.mealsHistory,
      };
    case STORE_NEW_MEAL:
      return {
        ...state,
        meals: meals.concat(action.newMeal),
      };
    case UPDATE_MEAL:
      var index = meals
        .map(function (x) {
          return x.id;
        })
        .indexOf(action.meal.id);
      const updatedmeals = meals;
      if (index !== -1) {
        updatedmeals[index] = action.meal;
      }
      return {
        ...state,
        meals: [...updatedmeals],
      };
    case DELETE_MEAL:
      const petNewMeals = meals.filter((meal) => meal.id != action.mealId);
      return {
        ...state,
        meals: petNewMeals,
      };
    default:
      return state;
  }
};

export default mealsReducer;
