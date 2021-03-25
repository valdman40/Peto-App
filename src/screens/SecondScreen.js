import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const SecondScreen = () => {
  const loggedUser = useSelector((state) => state.User.loggedUser);
  console.log("loggedUser", loggedUser);
  return <View style={styles.container}></View>;
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
