import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { ScreensRouteName } from "../resources/Strings";
import Colors from "../resources/Colors";

// screens
import LoginScreen from "../screens/LoginScreen";
import MenuScreen from "../screens/MenuScreen";
import PetsScreen from "../screens/PetsScreen";
import PetDetailsScreen from "../screens/PetDetailsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EditUserScreen from "../screens/EditUserScreen";
import AddPetScreen from '../screens/AddPetScreen';
import PetFeedingScheduleScreen from '../screens/PetFeedingScheduleScreen';
import AddOrEditFeedingScheduleScreen from '../screens/AddOrEditFeedingScheduleScreen';


const defaultNavigationOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Colors.blue,
  },
  headerTintColor: "white",
}
/**
 * creating navigation stack by telling it which screens may be inserted to the stack
 */
const AppNavigator = createStackNavigator(
  {
    [ScreensRouteName.LOGIN_SCREEN]: LoginScreen,
    [ScreensRouteName.REGISTER_SCREEN]: RegisterScreen,
    [ScreensRouteName.EDIT_USER_SCREEN]: EditUserScreen,
    [ScreensRouteName.MENU_SCREEN]: MenuScreen,
    [ScreensRouteName.PETS_SCREEN]: PetsScreen,
    [ScreensRouteName.PET_DETAILS_SCREEN]: PetDetailsScreen,
    [ScreensRouteName.PET_ADD_SCREEN]: AddPetScreen,
    [ScreensRouteName.PET__FEEDING_SCHEDULE_SCREEN]: PetFeedingScheduleScreen,
    [ScreensRouteName.ADD_EDIT_FEEDING_SCHEDULE_SCREEN]: AddOrEditFeedingScheduleScreen,
  },
  {
    initialRouteName: decideInitialMode(ScreensRouteName.PET_DETAILS_SCREEN),
    defaultNavigationOptions
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
