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
        <Text style={styles.headerAttribute}>{Captions.NAME}</Text>
        <Text style={styles.headerAttribute}>{Captions.TYPE}</Text>
        <TouchableOpacity onPress={addPetPressed}>
          <Text style={styles.add}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const addPetPressed = () => {
    props.navigation.navigate({ routeName: ScreensRouteName.PET_ADD_SCREEN });
  };

  const deletePet = async (petId) => {
    try {
      await DbApi.DeletePet(petId);
      dispatch(deletePetFromStore(petId));
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
  async function moveToPetDetailsScreen(pet) {
    const rate = await DbApi.GetPetRating(pet.id); // we want pet's health rate
    props.navigation.navigate({ routeName: ScreensRouteName.PET_DETAILS_SCREEN, params: { pet, rate } });
  }

  const renderPet = (pet) => {
    return (
      <TouchableOpacity style={styles.petItem} onPress={() => moveToPetDetailsScreen(pet)}>
        <Text style={styles.listAttributeStyle}>{pet.name}</Text>
        <Text style={styles.listAttributeStyle}>{pet.type}</Text>
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
      <FlatList
        style={{ width: "100%" }}
        data={userPets}
        keyExtractor={(pet) => pet.id.toString()}
        renderItem={(pet) => renderPet(pet.item)}
        ListHeaderComponent={listHeader}
      />
    </View>
  );
};

// screen's header
PetsScreen.navigationOptions = { headerTitle: Captions.PETS };

const listAttributeStyle = { fontSize: 18, paddingHorizontal: 10, width: "30%", textAlign: "center", alignSelf: "center" };
const deleteButtonStyle = { fontSize: 30, paddingHorizontal: 20, textAlignVertical: "center", borderWidth: 1 };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 30 },
  listAttributeStyle,
  headerAttribute: { ...listAttributeStyle, color: Colors.white, fontSize: 20 },
  petItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: "center",
  },
  delete: deleteButtonStyle,
  add: {...deleteButtonStyle, borderWidth: 0, color: Colors.lawngreen},
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: "center",
    backgroundColor: Colors.grey,
    marginTop: 20,
  },
});

export default PetsScreen;
