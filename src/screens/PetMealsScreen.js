import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import { ScreensRouteName } from "../resources/Strings";
import { deleteMeal } from "../store/actions/MealsActions";
import { Entypo } from "@expo/vector-icons";
import DbApi from "../DbApi";

const PetMealsScreen = (props) => {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.Meals.meals);
  const pet = props.navigation.getParam("pet") || { name: "debugger's pet", id: 1 };
  const listHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerAttribute}>{Captions.NAME}</Text>
        <Text style={styles.headerAttribute}>{Captions.AMOUNT}</Text>
        <Text style={styles.headerAttribute}>{Captions.TIME}</Text>
        <TouchableOpacity onPress={addMealPressed}>
          <Text style={styles.add}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const addMealPressed = () => {
    props.navigation.navigate({ routeName: ScreensRouteName.ADD_EDIT_MEAL_SCREEN, params: pet });
  };

  const deleteMeal_ = async (mealId) => {
    try {
      await DbApi.DeleteSchedule(mealId);
      dispatch(deleteMeal(mealId));
    } catch (e) {
      alert(e);
    }
  };

  const deletePressed = (id) => {
    Alert.alert(`${Captions.DELETE}`, `${Messages.ARE_YOU_SURE_DELETE_MEAL}`, [
      { text: `${Captions.CANCEL}` },
      { text: `${Captions.CONFIRM}`, onPress: () => deleteMeal_(id) },
    ]);
  };

  function editMeal(meal) {
    props.navigation.navigate({
      routeName: ScreensRouteName.ADD_EDIT_MEAL_SCREEN,
      params: { meal },
    });
  }

  const renderMeal = (meal) => {
    const backgroundColor = meal.repeat_daily ? Colors.white : "rgba(52, 52, 52, 0.1)";
    let attributeStyle = listAttributeStyle;
    const color = meal.repeat_daily ? "black" : "grey";
    attributeStyle = { ...attributeStyle, color };
    return (
      <TouchableOpacity style={{ ...styles.mealItem, backgroundColor }} onPress={() => editMeal(meal)}>
        <Text style={attributeStyle}>{meal.name}</Text>
        <Text style={attributeStyle}>{meal.amount}</Text>
        <Text style={attributeStyle}>{meal.time}</Text>
        <TouchableOpacity
          onPress={() => deletePressed(meal.id)}
          style={{ alignSelf: "center", justifyContent: "center", width: 50, height: 50 }}
        >
          <Entypo name="trash" color={Colors.red} size={20} style={{ alignSelf: "center" }} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={meals}
        keyExtractor={(meal) => meal.id.toString()}
        renderItem={(meal) => renderMeal(meal.item)}
        ListHeaderComponent={listHeader}
      />
    </View>
  );
};

// screen's header
PetMealsScreen.navigationOptions = (navigationData) => {
  const pet = navigationData.navigation.getParam("pet") || { name: "debugger's pet" };
  return { headerTitle: `${pet.name}'s Feeding Schedule` };
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

export default PetMealsScreen;
