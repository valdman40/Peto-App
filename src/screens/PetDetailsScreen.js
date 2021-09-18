import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-native-material-dropdown-v2";

import { loadPetMeals } from "../store/actions/MealsActions";
import { ScreensRouteName } from "../resources/Strings";
import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import {} from "../store/actions/PetsActions";
import DbApi from "../DbApi";
import Shared from "../Shared";

const defaultPet = {
  name: "debugger",
  id: 1,
  defaultFeedingAmount: 10,
};

const buttonSize = 200;

const PetDetailsScreen = (props) => {
  const pet = props.navigation.getParam("pet") || defaultPet;
  const [feedingAmount, setFeedingAmount] = useState(0);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const x = [];
    for (let i = 1; i <= 10; i++) {
      const value = 10 * i;
      x.push({ value });
    }
    setItems(x);
    setSelectedItem(x[0].value);
  }, []);

  const feedPet = async () => {
    let message = "";
    try {
      await DbApi.FeedPet(pet, feedingAmount);
      message = "Feeding request sent";
    } catch (e) {
      message = e.message;
    } finally {
      //
    }
    alert(message);
  };

  const feedButton = () => {
    return (
      <TouchableOpacity style={styles.circleButton} onPress={feedPet}>
        <Text style={{ fontSize: 30 }}>Feed Now</Text>
      </TouchableOpacity>
    );
  };

  const amountDropDown = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 40,
          alignItems: "center",
          width: "40%",
          alignSelf: "center",
          justifyContent: "space-around",
        }}
      >
        <Dropdown
          data={items}
          containerStyle={{ height: 70 }}
          value={feedingAmount}
          itemTextStyle={{ textAlign: "center" }}
          style={{ textAlign: "center" }}
          onChangeText={(amount) => setFeedingAmount(amount)}
        />
        <Text style={{ fontSize: 20 }}>grams</Text>
      </View>
    );
  };

  const loadAndGoToMeals = async () => {
    const feedingPlan = await DbApi.GetPetMeals(pet.id);
    feedingPlan.forEach((meal) => {
      meal.time = Shared.fromSqlTime2TimeString(meal.time);
    });
    dispatch(loadPetMeals(feedingPlan));
    props.navigation.navigate({ routeName: ScreensRouteName.PET_MEAL_SCREEN, params: { pet } });
  };

  return (
    <View style={styles.container}>
      {amountDropDown()}
      {feedButton()}
      <TouchableOpacity onPress={loadAndGoToMeals}>
        <Text style={{ fontSize: 20 }}>Meals</Text>
      </TouchableOpacity>
    </View>
  );
};

// screen's header
PetDetailsScreen.navigationOptions = (navigationData) => {
  const pet = navigationData.navigation.getParam("pet") || defaultPet;
  return { headerTitle: `${pet.name}'s ${Captions.DETAILS}` };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
  title: { fontSize: 30 },
  circleButton: {
    margin: 30,
    borderWidth: 3,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: buttonSize,
    height: buttonSize,
    backgroundColor: Colors.orange,
    borderRadius: buttonSize / 2,
    // android
    elevation: 8,
    // ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  loginButton: { color: "white", fontSize: 18, textAlign: "center", margin: 10, padding: 5, paddingHorizontal: 30 },
});

export default PetDetailsScreen;
