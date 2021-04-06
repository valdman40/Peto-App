import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Captions from "../resources/Captions";
import Colors from "../resources/Colors";
import { ScreensRouteName } from "../resources/Strings";
import { storeUserPets } from "../store/actions/PetsActions";
import DbApi from "../DbApi";

/**
 * returns greeting message with the name given
 * @param {*} name
 */
const greetingMessage = (name) => {
  var today = new Date();
  var curHr = today.getHours();
  let message;
  if (curHr < 4) {
    message = Captions.GOOD_NIGHT;
  } else if (curHr < 12) {
    message = Captions.GOOD_MORNING;
  } else if (curHr < 18) {
    message = Captions.GOOD_AFTERNOON;
  } else {
    message = Captions.GOOD_EVNING;
  }
  return `${message} ${name}`;
};

const SecondScreen = (props) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.User.loggedUser);
  const moveToPets = async () => {
    try {
      const userPets = await DbApi.LoadUserPets(loggedUser.id);
      dispatch(storeUserPets(userPets));
      props.navigation.navigate({ routeName: ScreensRouteName.PETS_SCREEN });
    } catch (e) {
      alert(e);
    }
  };

  console.log(loggedUser)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{greetingMessage(loggedUser.name)}</Text>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: Colors.accentColor,
          padding: 10,
          margin: 10,
        }}
        onPress={moveToPets}
      >
        <Text style={{ fontSize: 20 }}>move to pets screen</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
  item: {
    fontSize: 20,
  },
});

export default SecondScreen;
