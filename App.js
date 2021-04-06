import React from "react";
import { Platform, I18nManager } from "react-native";
import AppNavigation from "./src/navigation/AppNavigation";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import Expo from "expo";

import userReducer from "./src/store/reducers/UserReducer";
import petsReducer from "./src/store/reducers/PetsReducer";
import debugReducer from "./src/store/reducers/DebugModeReducer";
import { ReducersNames } from "./src/resources/Strings";

const rootReducer = combineReducers({
  [ReducersNames.Debug]: debugReducer,
  [ReducersNames.User]: userReducer,
  [ReducersNames.Pets]: petsReducer,
});

// here we store components's states
const store = createStore(rootReducer);

// sometimes android app with left-to-right (like our phones) has problem with the direction of
// all layouts so this fixes it
function fixLTR() {
  const isRTLAndroid = Platform.OS === "android" && I18nManager.isRTL;
  if (isRTLAndroid) {
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);
    Expo.Updates.reload();
  }
}

export default function App() {
  fixLTR();
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
