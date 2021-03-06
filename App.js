import React from "react";
import { Platform, I18nManager } from "react-native";
import AppNavigation from "./src/navigation/AppNavigation";
import { Provider } from "react-redux";
import Expo from "expo";

import PetoStore from "./src/store/PetoStore";

// sometimes android app with left-to-right (like phones from israel) has problem with the direction of
// all layouts so this fixes it
function fixLTR() {
  const isRTLAndroid = Platform.OS === "android" && I18nManager.isRTL;
  if (isRTLAndroid) {
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);
    Expo.Updates.reload();
  }
}
// console.disableYellowBox = true;

export default function App() {
  fixLTR();
  return (
    // wrap up the application with store so we'll have access to store from wherever we want inside
    <Provider store={PetoStore}>
      <AppNavigation />
    </Provider>
  );
}
