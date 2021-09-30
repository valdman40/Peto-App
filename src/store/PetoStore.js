import { createStore, combineReducers } from "redux";

import userReducer from "./reducers/UserReducer";
import petsReducer from "./reducers/PetsReducer";
import mealsReducer from "./reducers/MealsReducer";
import debugReducer from "./reducers/DebugModeReducer";
import settingsReducer from "./reducers/SettingsReducer";
import { ReducersNames } from "../resources/Strings";

// combine all reducers into 1 combined reducer
const rootReducer = combineReducers({
  [ReducersNames.Debug]: debugReducer,
  [ReducersNames.User]: userReducer,
  [ReducersNames.Pets]: petsReducer,
  [ReducersNames.Meals]: mealsReducer,
  [ReducersNames.Settings]: settingsReducer,
});

// create a store which holds the combined reducer
const store = createStore(rootReducer);
export default store;
