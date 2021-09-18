import {
  LOAD_PET_MEALS,
  STORE_NEW_MEAL,
  DELETE_MEAL,
  UPDATE_MEAL,
} from "../actions/MealsActions";

// const initSched = [
//   { meal_name: "meal1", amount: 100, meal_time: "01:00", id: 1, pet_id: 1 },\
// ];
const initMeals = [];

const initialState = {
  meals: initMeals,
};

const mealsReducer = (state = initialState, action) => {
  const { meals } = state;
  switch (action.type) {
    case LOAD_PET_MEALS:
      return {
        ...state,
        meals: action.meals,
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
      const newPetSchedule = meals.filter((schedule) => schedule.id != action.scheduleId);
      return {
        ...state,
        meals: newPetSchedule,
      };
    default:
      return state;
  }
};

export default mealsReducer;
