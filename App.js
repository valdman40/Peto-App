import React from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import mealsReducer from "./src/store/reducers/MealsReducer";
import userReducer from "./src/store/reducers/UserReducer";
import { ReducersNames } from "./src/resources/Strings";

const rootReducer = combineReducers({
  [ReducersNames.Meals]: mealsReducer,
  [ReducersNames.User]: userReducer,
});

// here we store components's states
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
