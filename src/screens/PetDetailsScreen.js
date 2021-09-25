import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, RefreshControl, Image } from "react-native";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-native-material-dropdown-v2";
import * as Progress from "react-native-progress";
import { MaterialIcons, Feather } from "@expo/vector-icons";

import { loadPetMeals, loadPetMealsHistory } from "../store/actions/MealsActions";
import { ScreensRouteName } from "../resources/Strings";
import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import {} from "../store/actions/PetsActions";
import DbApi from "../DbApi";
import Shared from "../Shared";

const defaultPet = {
  id: 1,
  name: "Tokyo",
  type: "dog",
  user_id: 1,
  container_filled: 0.8,
  image:
    "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.6435-9/154993349_10222532609097589_2477911615807969384_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=1eR7X2lr9WMAX8XLQ0F&_nc_ht=scontent.fsdv3-1.fna&oh=a6d39308c3250bdb74b4f41ecd7f33e3&oe=61709BF7",
};

const buttonSize = 100;

const PetDetailsScreen = (props) => {
  // let pet = props.navigation.getParam("pet") || defaultPet;
  const [pet, setPet] = useState(defaultPet);
  const [feedingAmount, setFeedingAmount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
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
        <Text style={{ fontSize: 20 }}>{Captions.GRAMS}</Text>
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
          <Text style={{ fontSize: 20, color: Colors.white }}>{Captions.MEALS_PLAN}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const loadAndGoToMealsHistory = async () => {
    const mealsHistory = await DbApi.GetPetMealsHistory(pet.id);
    dispatch(loadPetMealsHistory(mealsHistory));
    props.navigation.navigate({ routeName: ScreensRouteName.PET_MEAL_HISTORY_SCREEN, params: { pet } });
  };

  const goToMealsHistoryButton = () => {
    return (
      <TouchableOpacity onPress={loadAndGoToMealsHistory} style={styles.mealsButton}>
        <View style={{ backgroundColor: Colors.blue, padding: 10, borderRadius: 3 }}>
          <Text style={{ fontSize: 20, color: Colors.white }}>{Captions.MEALS_HISTORY}</Text>
        </View>
      </TouchableOpacity>
    );
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
            <TouchableOpacity onPress={() => alert("need to implement food order")}>
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
        <Text style={{ textAlign: "center", fontSize: 20 }}>Instant feed</Text>
        <View style={styles.feedBoxInnerContainer}>
          {amountDropDown()}
          {feedButton()}
        </View>
      </View>
    );
  };

  const petImage = () => {
    if (pet.image) {
      const uri = pet.image;
      return (
        <View style={{ borderWidth: 2 }}>
          <Image style={{ width: 200, height: 200 }} source={{ uri }} />
        </View>
      );
    }
  };

  const machineId = () => {
    return (
      <View style={{ flexDirection: "row", width: "80%", justifyContent: "space-around", alignSelf: "center" }}>
        <Text style={{ fontSize: 20 }}>Machine id:</Text>
        <Text style={{ fontSize: 20 }}>{pet.machine_id}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {petImage()}
      {goToMealsHistoryButton()}
      {goToMealsButton()}
      {containerLeftBar()}
      {feedBox()}
      {machineId()}
    </ScrollView>
  );
};

// screen's header
PetDetailsScreen.navigationOptions = (navigationData) => {
  const pet = navigationData.navigation.getParam("pet") || defaultPet;
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
