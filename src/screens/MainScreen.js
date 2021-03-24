import React from "react";
import { StyleSheet, Text, View } from "react-native";



const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>main screen</Text>
      <Text>sof sof</Text>
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
  title:{
    fontSize: 30
  }
});

export default MainScreen;
