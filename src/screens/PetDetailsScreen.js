import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, FlatList } from "react-native";
import { useDispatch } from "react-redux";

import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import {} from "../store/actions/PetsActions";
import DbApi from "../DbApi";

const defaultPet = {
  name: "debugger",
  id: 1,
  feedingTimes: [
    { time: "01:00", id: 1 },
    { time: "02:00", id: 2 },
    { time: "04:00", id: 3 },
  ],
};

const buttonSize = 200;

const PetDetailsScreen = (props) => {
  const pet = props.navigation.getParam("pet") || defaultPet;
  const [waiting, setWaiting] = useState(false);
  const [feedingTimes, setFeedingTimes] = useState([]);
  useEffect(() => {
    const feedingTimesAfterManipulation = [];
    let i = 0;
    pet.feedingTimes.forEach((feeding) => {
      feedingTimesAfterManipulation.push({ ...feeding, index: i });
      i += 1;
    });
    setFeedingTimes(feedingTimesAfterManipulation);
  }, [pet]);
  const dispatch = useDispatch();

  const feedPet = async () => {
    let message = "";
    try {
      await DbApi.FeedPet(pet);
      message = "Feeding request sent";
    } catch (e) {
      message = e.message;
    } finally {
      //
    }
    alert(message);
  };

  /**
   * displays input with text of description
   * @param {*} input the input of the user
   * @param {*} inputSetter the setter to change the input
   * @param {*} inputDescription
   */
  const inputWithText = (input, inputSetter, inputDescription, index) => {
    return (
      <View
        style={{
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          padding: 10,
          alignSelf: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>{inputDescription}</Text>
        <TextInput
          onChangeText={(newInput) => inputSetter(newInput)}
          value={input}
          style={{ width: 200, fontSize: 25 }}
          placeholder={""}
          placeholderTextColor={Colors.grey}
          maxLength={25}
          underlineColorAndroid="#888"
          textAlign={"center"}
        />
      </View>
    );
  };

  const feedButton = () => {
    return (
      <TouchableOpacity style={styles.circleButton} onPress={feedPet}>
        <Text style={{ fontSize: 30 }}>Feed Now</Text>
      </TouchableOpacity>
    );
  };

  const renderFeedingTime = (feeding) => {
    return inputWithText(feeding.time, setFeedingTimes, feeding.id, feeding.index);
  };

  const feedingTimesDisplay = () => {
    return (
      <FlatList
        data={feedingTimes}
        keyExtractor={(feeding) => feeding.id.toString()}
        renderItem={(feeding) => renderFeedingTime(feeding.item)}
      />
    );
  };

  const saveChanges = () => {
    alert("save");
  };

  const SaveChangesButton = () => {
    return (
      <View style={{ opacity: waiting ? 0.8 : 1 }} pointerEvents={waiting ? "none" : "auto"}>
        <TouchableOpacity activeOpacity={0.6} onPress={saveChanges}>
          <View style={{ borderRadius: 30, backgroundColor: Colors.darkBlue, alignSelf: "center" }}>
            <Text style={styles.loginButton}>{Captions.COMMIT_USER_EDIT}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {feedingTimesDisplay()}
      {SaveChangesButton()}
      {feedButton()}
    </View>
  );
};

// screen's header
PetDetailsScreen.navigationOptions = (navigationData) => {
  const pet = navigationData.navigation.getParam("pet") || defaultPet;
  return { headerTitle: `${pet.name}'s ${Captions.DETAILS}` };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 30 },
  circleButton: {
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
