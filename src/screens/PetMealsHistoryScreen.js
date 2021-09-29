import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../resources/Colors";
import { ScreensRouteName } from "../resources/Strings";
import { AntDesign } from "@expo/vector-icons";
import MealsHistoryDisplay from "../components/MealsHistoryDisplay";
import DbApi from "../DbApi";

const PetMealsHistoryScreen = (props) => {
  const mealsHistory = useSelector((state) => state.Meals.mealsHistory);

  const history = () => {
    if (mealsHistory.length > 0) {
      return <MealsHistoryDisplay mealsSummary={mealsHistory} navigation={props.navigation} />;
    }
  };

  return <View>{history()}</View>;
};

const buildAndGoToGraph = async (props, pet) => {
  const graphStats = await DbApi.GetPetHealthGraph(pet.id);
  props.navigation.navigate({
    routeName: ScreensRouteName.PET_MEAL_HISTORY_GRAPH_SCREEN,
    params: { pet, graphStats },
  });
};

// screen's header
PetMealsHistoryScreen.navigationOptions = (navigationData) => {
  const pet = navigationData.navigation.getParam("pet") || { name: "debugger's pet" };
  return {
    headerTitle: `${pet.name}'s History`,
    headerRight: (
      <TouchableOpacity
        style={{ backgroundColor: Colors.blue, marginRight: 15 }}
        onPress={async () => {
          buildAndGoToGraph(navigationData, pet);
        }}
      >
        <AntDesign size={25} color={Colors.white} name={"linechart"} />
      </TouchableOpacity>
    ),
  };
};

export default PetMealsHistoryScreen;
