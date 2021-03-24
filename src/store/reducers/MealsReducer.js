import { MEALS, FILTERED_MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE } from "../actions/MealsActions";
const initialState = {
  meals: MEALS,
  filteredMeals: FILTERED_MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex((meal) => meal.id === action.mealId);
      if (existingIndex >= 0) {
        const updatedFavoriteMeals = [...state.favoriteMeals];
        updatedFavoriteMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavoriteMeals };
      } else {
        const newFavoriteMeal = state.meals.find((meal) => meal.id === action.mealId);
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(newFavoriteMeal),
        };
      }
      break;
    default:
      return state;
  }
};

export default mealsReducer;
