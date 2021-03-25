import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";

import Captions from "../resources/Captions";

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

const SecondScreen = () => {
  const loggedUser = useSelector((state) => state.User.loggedUser);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{greetingMessage(loggedUser.Name)}</Text>
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
