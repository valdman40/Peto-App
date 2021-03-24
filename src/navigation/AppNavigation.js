import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { ScreensRouteName } from "../resources/Strings";

// screens
import MainScreen from '../screens/MainScreen';
import SecondScreen from '../screens/SecondScreen';

/**
 * creating navigation stack by telling it which screens may be inserted to the stack
 */
const AppNavigator = createStackNavigator(
  {
    [ScreensRouteName.MAIN_SCREEN]: MainScreen,
    [ScreensRouteName.SECOND_SCREEN]: SecondScreen,
  },
  {
    initialRouteName: decideInitialMode(ScreensRouteName.SECOND_SCREEN),
    header: null,
    headerMode: "none",
  }
);

// if i'm in dev mode, put whatwever i chose, else put login screen
function decideInitialMode(screenChosen) {
  let retval = ScreensRouteName.MAIN_SCREEN;
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    retval = screenChosen;
  }
  return retval;
}

export default createAppContainer(AppNavigator);
