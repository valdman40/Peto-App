import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, FlatList, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-native-material-dropdown-v2";
import * as Progress from "react-native-progress";

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
  container_filled: 0.7,
};

const buttonSize = 100;

const PetDetailsScreen = (props) => {
  // let pet = props.navigation.getParam("pet") || defaultPet;
  const [pet, setPet] = useState(defaultPet);
  const [feedingAmount, setFeedingAmount] = useState(0);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const dispatch = useDispatch();

  const reloadPetFromDB = async () => {
    // to refresh the pet's details
    const x = await DbApi.GetPet(pet.id);
    setPet(x);
  };

  useEffect(() => {
    const x = [];
    for (let i = 1; i <= 10; i++) {
      const value = 10 * i;
      x.push({ value });
    }
    setItems(x);
    setSelectedItem(x[0].value);
    setPet(props.navigation.getParam("pet") || defaultPet);
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
    try {
      setTimeout(async () => {
        await reloadPetFromDB();
      }, 20 * 1000);
    } catch (e) {
      //
    }
  };

  const feedButton = () => {
    return (
      <TouchableOpacity style={styles.circleButton} onPress={feedPet}>
        <Text style={{ fontSize: 18 }}>Feed Now</Text>
      </TouchableOpacity>
    );
  };

  const amountDropDown = () => {
    return (
      <View style={styles.amountDropDownContainer}>
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

  const goToMealsButton = () => {
    return (
      <TouchableOpacity onPress={loadAndGoToMeals} style={styles.mealsButton}>
        <View style={{ backgroundColor: Colors.blue, padding: 10, borderRadius: 3 }}>
          <Text style={{ fontSize: 20, color: Colors.white }}>{"View pet's meals plan"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const containerLeftBar = () => {
    const color = pet.container_filled < 0.3 ? Colors.red : Colors.black;
    return (
      <View
        style={{ margin: 20, flexDirection: "row", width: "80%", alignSelf: "center", justifyContent: "space-around" }}
      >
        <Text style={{ alignSelf: "center", fontSize: 20, color }}>Food Container</Text>
        <View style={{ transform: [{ rotate: "-90deg" }] }}>
          <Progress.Bar
            progress={pet.container_filled}
            width={Dimensions.get("window").width * 0.2}
            height={50}
            color={Colors.dogFoodBrown}
            borderColor={Colors.black}
          />
        </View>
      </View>
    );
  };

  const feedBox = () => {
    return (
      <View style={{ margin: 10, width: "80%", justifyContent: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>Instant feed</Text>
        <View style={styles.feedBoxInnerContainer}>
          {amountDropDown()}
          {feedButton()}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {goToMealsButton()}
      {containerLeftBar()}
      {feedBox()}
    </View>
  );
};

// screen's header
PetDetailsScreen.navigationOptions = (navigationData) => {
  const pet = navigationData.navigation.getParam("pet") || defaultPet;
  return { headerTitle: `${pet.name}'s ${Captions.DETAILS}` };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "space-around" },
  title: { fontSize: 30 },
  circleButton: {
    margin: 5,
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
  mealsButton: {
    borderWidth: 0.3,
    borderRadius: 3,
    backgroundColor: Colors.white,
    justifyContent: "center",
    // padding: 10,
    // android
    elevation: 8,
    // ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  feedBoxInnerContainer: {
    borderTopWidth: 1,
    justifyContent: "space-between",
    alignSelf: "center",
    padding: 5,
    flexDirection: "row",
  },
  amountDropDownContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    alignSelf: "center",
    justifyContent: "space-around",
  },
});

export default PetDetailsScreen;
