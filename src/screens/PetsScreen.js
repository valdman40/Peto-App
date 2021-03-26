import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { useSelector } from "react-redux";

import Captions from "../resources/Captions";
import Colors from "../resources/Colors";
import { ScreensRouteName } from "../resources/Strings";

const renderPet = (item) => {
  const pet = item.item;
  console.log(pet);
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        padding: 3,
        borderWidth: 1,
        borderRadius: 3,
        alignSelf: "center",
      }}
    >
      <Text style={styles.ListAttribute}>{pet.Type}</Text>
      <Text style={styles.ListAttribute}>{pet.Name}</Text>
    </TouchableOpacity>
  );
};

const ListHeaderComponent = () => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        padding: 3,
        borderWidth: 1,
        borderRadius: 3,
        alignSelf: "center",
        backgroundColor: Colors.grey,
      }}
    >
      <Text style={styles.headerAttribute}>{"Type"}</Text>
      <Text style={styles.headerAttribute}>{"Name"}</Text>
    </TouchableOpacity>
  );
};

const PetsScreen = (props) => {
  const userPets = useSelector((state) => state.Pets.userPets);
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <FlatList
        style={{ width: "100%" }}
        data={userPets}
        keyExtractor={(pet) => pet.id.toString()}
        renderItem={renderPet}
        ListHeaderComponent={ListHeaderComponent}
      />
    </View>
  );
};

// screen's header
PetsScreen.navigationOptions = { headerTitle: Captions.PETS };

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
  headerAttribute: { fontSize: 20, padding: 10, paddingHorizontal: 50, color: Colors.white },
  ListAttribute: { fontSize: 18, padding: 10, paddingHorizontal: 50 },
});

export default PetsScreen;
