import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
  Image,
  Linking,
} from "react-native";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-native-material-dropdown-v2";
import * as Progress from "react-native-progress";
import { MaterialIcons, Feather, Entypo } from "@expo/vector-icons";

import { loadPetMeals, loadPetMealsHistory } from "../store/actions/MealsActions";
import { ScreensRouteName } from "../resources/Strings";
import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import DbApi from "../DbApi";
import Shared from "../Shared";

const buttonSize = 100;

const PetDetailsScreen = (props) => {
  // let pet = props.navigation.getParam("pet");
  const [pet, setPet] = useState({});
  const [feedingAmount, setFeedingAmount] = useState(10);
  const [healthRate, setHealthRate] = useState(5);
  const [refreshing, setRefreshing] = useState(false);
  // const [selectedItem, setSelectedItem] = useState({});
  const [disableFeedNow, setDisableFeedNow] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await reloadPetFromDB();
    } catch (e) {
      // never mind if failed..
    }
    setRefreshing(false);
  };

  const reloadPetFromDB = async () => {
    // to refresh the pet's details
    const petFromDb = await DbApi.GetPet(pet.id);
    setPet(petFromDb);
  };

  const amountsOfFood = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
    { value: 60 },
    { value: 70 },
    { value: 80 },
    { value: 90 },
    { value: 100 },
  ];

  const ratings = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];

  useEffect(() => {
    const petFromParams = props.navigation.getParam("pet");
    const rateFromParams = props.navigation.getParam("rate");
    setPet(petFromParams);
    setHealthRate(rateFromParams);
  }, []);

  const feedPet = async () => {
    let message = "";
    try {
      setDisableFeedNow(true);
      await DbApi.FeedPet(pet, feedingAmount);
      message = "Feeding request sent";
      setTimeout(() => {
        setDisableFeedNow(false);
      }, 5000);
    } catch (e) {
      setDisableFeedNow(false);
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
      <TouchableOpacity style={{ ...styles.circleButton }} onPress={feedPet} disabled={disableFeedNow}>
        <Text style={{ fontSize: 18 }}>{Captions.FEED_NOW}</Text>
      </TouchableOpacity>
    );
  };

  const amountDropDown = (items, value, setter, caption) => {
    return (
      <View style={styles.amountDropDownContainer}>
        <Dropdown
          data={items}
          containerStyle={{ height: 70 }}
          value={value}
          itemTextStyle={{ textAlign: "center" }}
          style={{ textAlign: "center" }}
          onChangeText={(value) => setter(value)}
        />
        <Text style={{ fontSize: 20, margin: 10 }}>{caption}</Text>
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
        <View style={{ padding: 10, borderRadius: 3 }}>
          <Text style={{ fontSize: 20, color: Colors.white }}>{Captions.MEALS_PLAN}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const loadAndGoToMealsHistory = async () => {
    try {
      const mealsHistory = await DbApi.GetPetMealsHistory(pet.id);
      dispatch(loadPetMealsHistory(mealsHistory));
      props.navigation.navigate({ routeName: ScreensRouteName.PET_MEAL_HISTORY_SCREEN, params: { pet } });
    } catch (e) {
      alert(e);
    }
  };

  const goToMealsHistoryButton = () => {
    return (
      <TouchableOpacity onPress={loadAndGoToMealsHistory} style={styles.mealsButton}>
        <View style={{ padding: 10, borderRadius: 3 }}>
          <Text style={{ fontSize: 20, color: Colors.white }}>{Captions.MEALS_HISTORY}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const goToFoodStore = () => {
    const url = "https://www.kolbopet.co.il/category/dogs/dryfoodfordogs/";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const containerLeftBar = () => {
    const lowOnFood = pet.container_filled <= 0.3;
    const color = lowOnFood ? Colors.red : Colors.black;
    return (
      <View
        style={{ margin: 20, flexDirection: "row", width: "80%", alignSelf: "center", justifyContent: "space-around" }}
      >
        <View>
          <Text style={{ alignSelf: "center", fontSize: 20, color }}>{Captions.FOOD_CONTAINER}</Text>
          {lowOnFood && (
            <TouchableOpacity onPress={goToFoodStore}>
              {
                <Text style={{ alignSelf: "center", fontSize: 20, color: Colors.lawngreen }}>
                  {Captions.ORDER_HERE}
                </Text>
              }
            </TouchableOpacity>
          )}
        </View>
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
        <Text style={{ textAlign: "center", fontSize: 20 }}>{Captions.INSTANT_FEED}</Text>
        <View style={styles.feedBoxInnerContainer}>
          {amountDropDown(amountsOfFood, feedingAmount, setFeedingAmount, Captions.GRAMS)}
          {feedButton()}
        </View>
      </View>
    );
  };

  const petImage = () => {
    const imageSize = 130;
    if (pet.image) {
      const uri = pet.image;
      return (
        <View style={{ borderWidth: 2, margin: 5 }}>
          <Image style={{ width: imageSize, height: imageSize }} source={{ uri }} />
        </View>
      );
    }
  };

  const saveRating = async () => {
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    try {
      await DbApi.SavePetRating(pet.id, date, healthRate);
      alert(Captions.SAVED);
    } catch (e) {
      alert(e);
    }
  };

  const petHelathRate = () => {
    return (
      <View style={{ margin: 5 }}>
        <Text style={{ fontSize: 18, margin: 10 }}>How is {pet.name} today?</Text>
        <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: "center", alignItems: "center" }}>
          {amountDropDown(ratings, healthRate, setHealthRate, "")}
          <TouchableOpacity onPress={saveRating}>
            <Entypo size={40} color={Colors.black} name={"save"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const petImageHealth = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        {petImage()}
        {petHelathRate()}
      </View>
    );
  };

  const machineId = () => {
    return (
      <View style={{ flexDirection: "row", width: "80%", justifyContent: "space-around", alignSelf: "center" }}>
        <Text style={{ fontSize: 20 }}>{Captions.MACHINE_ID}:</Text>
        <Text style={{ fontSize: 20 }}>{pet.machine_id}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {petImageHealth()}
      {feedBox()}
      {goToMealsHistoryButton()}
      {goToMealsButton()}
      {containerLeftBar()}
      {machineId()}
    </ScrollView>
  );
};

// screen's header
PetDetailsScreen.navigationOptions = (navigationData) => {
  const pet = navigationData.navigation.getParam("pet");
  return {
    headerTitle: `${pet.name}'s ${Captions.DETAILS}`,
    headerLeft: (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ backgroundColor: Colors.blue, marginLeft: 15 }}
          onPress={() => {
            navigationData.navigation.pop();
          }}
        >
          <Feather size={25} color={Colors.white} name={"arrow-left"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: Colors.blue, marginLeft: 15 }}
          onPress={() => {
            alert("can't yet add image, you can send image from facebook to application manager to put it in");
          }}
        >
          <MaterialIcons size={25} color={Colors.white} name={"add-photo-alternate"} />
        </TouchableOpacity>
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    height: Dimensions.get("window").height,
  },
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
    width: Dimensions.get("window").width * 0.5,
    alignItems: "center",
    borderWidth: 0.3,
    borderRadius: 3,
    backgroundColor: Colors.blue,
    justifyContent: "center",
    margin: 5,
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
    alignSelf: "center",
    justifyContent: "space-around",
  },
});

export default PetDetailsScreen;
