import React from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import userReducer from "./src/store/reducers/UserReducer";
import petsReducer from "./src/store/reducers/PetsReducer";
import { ReducersNames } from "./src/resources/Strings";

const rootReducer = combineReducers({
  [ReducersNames.User]: userReducer,
  [ReducersNames.Pets]: petsReducer,
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
