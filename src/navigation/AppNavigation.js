import { createStackNavigator, createAppContainer } from "react-navigation";

/**
 * creating navigation stack by telling it which screens may be inserted to the stack
 */
const AppNavigator = createStackNavigator(
  {
    [ScreensRouteName.LOGIN_SCREEN]: LoginScreen,
  },
  {
    initialRouteName: decideInitialMode(DeveloperControl.initScreenToShow),
    header: null,
    headerMode: "none",
  }
);

// if i'm in dev mode, put whatwever i chose, else put login screen
function decideInitialMode(screenChosen) {
  let retval = ScreensRouteName.LOGIN_SCREEN;
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    retval = screenChosen;
  }
  return retval;
}

export default createAppContainer(AppNavigator);
