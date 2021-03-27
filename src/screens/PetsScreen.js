import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import { ScreensRouteName } from "../resources/Strings";
import { deletePetFromStore } from "../store/actions/PetsActions";
import { Entypo } from "@expo/vector-icons";
import DbApi from "../DbApi";

const PetsScreen = (props) => {
  const userPets = useSelector((state) => state.Pets.userPets);
  const dispatch = useDispatch();

  const listHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerAttribute}>{"Name"}</Text>
        <Text style={styles.headerAttribute}>{"Type"}</Text>
        <TouchableOpacity onPress={addPetPressed}>
          <Text style={{ ...styles.delete, borderWidth: 0, color: Colors.lawngreen }}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const addPetPressed = () => {
    alert("add pet pressed");
  };

  const deletePet = async (petId) => {
    try {
      await DbApi.dispatch(deletePetFromStore(petId));
    } catch (e) {
      alert(e);
    }
  };

  const deletePressed = (petId) => {
    Alert.alert(`${Captions.DELETE}`, `${Messages.ARE_YOU_SURE_DELETE_PET}`, [
      { text: `${Captions.CANCEL}` },
      { text: `${Captions.CONFIRM}`, onPress: () => deletePet(petId) },
    ]);
  };

  /**
   * move to pet details screen
   * @param {*} petId
   */
  function moveToPetDetailsScreen(petId) {
    // in future, instead of bringing pet from userPets, we should look in db for the pet so it will be updated
    const pets = userPets.filter((pet) => petId === pet.id);
    if (pets.length > 0) {
      props.navigation.navigate({ routeName: ScreensRouteName.PET_DETAILS_SCREEN, params: { pet: pets[0] } });
    } else {
      alert("for some reason, couldn't find the petId in the list");
    }
  }

  const renderPet = (item) => {
    const pet = item.item;
    return (
      <TouchableOpacity style={styles.petItem} onPress={() => moveToPetDetailsScreen(pet.id)}>
        <Text style={styles.listAttribute}>{pet.Name}</Text>
        <Text style={styles.listAttribute}>{pet.Type}</Text>
        <TouchableOpacity
          onPress={() => deletePressed(pet.id)}
          style={{ alignSelf: "center", justifyContent: "center", width: 50, height: 50 }}
        >
          <Entypo name="trash" color={Colors.red} size={20} style={{ alignSelf: "center" }} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <FlatList
        style={{ width: "100%" }}
        data={userPets}
        keyExtractor={(pet) => pet.id.toString()}
        renderItem={renderPet}
        ListHeaderComponent={listHeader}
      />
    </View>
  );
};

// screen's header
PetsScreen.navigationOptions = { headerTitle: Captions.PETS };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 30 },
  headerAttribute: { fontSize: 20, padding: 10, paddingHorizontal: 50, color: Colors.white },
  listAttribute: { fontSize: 18, padding: 10, paddingHorizontal: 50 },
  petItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: "center",
  },
  delete: { fontSize: 30, paddingHorizontal: 20, textAlignVertical: "center", borderWidth: 1 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: "center",
    backgroundColor: Colors.grey,
  },
});

export default PetsScreen;
