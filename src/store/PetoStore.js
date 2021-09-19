import { createStore, combineReducers } from "redux";

import userReducer from "./reducers/UserReducer";
import petsReducer from "./reducers/PetsReducer";
import mealsReducer from "./reducers/MealsReducer";
import debugReducer from "./reducers/DebugModeReducer";
import settingsReducer from "./reducers/SettingsReducer";
import { ReducersNames } from "../resources/Strings";

const rootReducer = combineReducers({
  [ReducersNames.Debug]: debugReducer,
  [ReducersNames.User]: userReducer,
  [ReducersNames.Pets]: petsReducer,
  [ReducersNames.Meals]: mealsReducer,
  [ReducersNames.Settings]: settingsReducer,
});

// here we store components's states
const store = createStore(rootReducer);
export default store;
