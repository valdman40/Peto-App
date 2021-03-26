import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";

import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import {} from "../store/actions/PetsActions";

const PetDetailsScreen = (props) => {
  const pet = props.navigation.getParam("pet");
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>details</Text> */}
    </View>
  );
};

// screen's header
PetDetailsScreen.navigationOptions = (navigationData) => {
  const petName = navigationData.navigation.getParam("pet").Name;
  return { headerTitle: `${petName}'s ${Captions.DETAILS}` };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 30 },
});

export default PetDetailsScreen;
