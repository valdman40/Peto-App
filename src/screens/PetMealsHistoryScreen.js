import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import { ScreensRouteName } from "../resources/Strings";
import { deleteMeal } from "../store/actions/MealsActions";
import { Entypo, AntDesign } from "@expo/vector-icons";
import DbApi from "../DbApi";
import MealsHistoryDisplay from "../components/MealsHistoryDisplay";

const PetMealsHistoryScreen = (props) => {
  const dispatch = useDispatch();
  const mealsHistory = useSelector((state) => state.Meals.mealsHistory);

  const history = () => {
    if (mealsHistory.length > 0) {
      return <MealsHistoryDisplay mealsSummary={mealsHistory} navigation={props.navigation} />;
    }
  };

  return <View>{history()}</View>;
};

// screen's header
PetMealsHistoryScreen.navigationOptions = (navigationData) => {
  const pet = navigationData.navigation.getParam("pet") || { name: "debugger's pet" };
  return {
    headerTitle: `${pet.name}'s History`,
    headerRight: (
      <TouchableOpacity
        style={{ backgroundColor: Colors.blue, marginRight: 15 }}
        onPress={() =>
          navigationData.navigation.navigate({ routeName: ScreensRouteName.PET_MEAL_HISTORY_GRAPH_SCREEN, params: pet })
        }
      >
        <AntDesign size={25} color={Colors.white} name={"linechart"} />
      </TouchableOpacity>
    ),
  };
};

const listAttributeStyle = {
  fontSize: 18,
  paddingHorizontal: 10,
  width: "30%",
  textAlign: "center",
  alignSelf: "center",
};
const deleteButtonStyle = { fontSize: 30, paddingHorizontal: 20, textAlignVertical: "center", borderWidth: 1 };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 30 },
  listAttributeStyle,
  headerAttribute: { ...listAttributeStyle, color: Colors.white, fontSize: 20 },
  mealItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: "center",
  },
  delete: deleteButtonStyle,
  add: { ...deleteButtonStyle, borderWidth: 0, color: Colors.lawngreen },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: "center",
    backgroundColor: Colors.grey,
    marginTop: 20,
  },
});

export default PetMealsHistoryScreen;
