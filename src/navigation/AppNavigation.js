import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { ScreensRouteName } from "../resources/Strings";
import Colors from "../resources/Colors";

// screens
import MainScreen from "../screens/MainScreen";
import SecondScreen from "../screens/SecondScreen";
import PetsScreen from "../screens/PetsScreen";
import PetDetailsScreen from "../screens/PetDetailsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EditUserScreen from "../screens/EditUserScreen";
import AddPetScreen from '../screens/AddPetScreen';


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
    [ScreensRouteName.MAIN_SCREEN]: MainScreen,
    [ScreensRouteName.REGISTER_SCREEN]: RegisterScreen,
    [ScreensRouteName.EDIT_USER_SCREEN]: EditUserScreen,
    [ScreensRouteName.SECOND_SCREEN]: SecondScreen,
    [ScreensRouteName.PETS_SCREEN]: PetsScreen,
    [ScreensRouteName.PET_DETAILS_SCREEN]: PetDetailsScreen,
    [ScreensRouteName.PET_ADD_SCREEN]: AddPetScreen,
  },
  {
    initialRouteName: decideInitialMode(ScreensRouteName.MAIN_SCREEN),
    defaultNavigationOptions
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
