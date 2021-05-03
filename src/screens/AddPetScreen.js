import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import DbApi from "../DbApi";
import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import { storeNewPet } from "../store/actions/PetsActions";

const AddPetScreen = () => {
  const loggedUser = useSelector((state) => state.User.loggedUser);
  const dispatch = useDispatch();
  const [petName, setPetName] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
  /**
   * displays input with text of description
   * @param {*} input the input of the user
   * @param {*} inputSetter the setter to change the input
   * @param {*} inputDescription
   */
  const inputWithText = (input, inputSetter, inputDescription) => {
    return (
      <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between", width: "100%", padding: 10 }}>
        <Text style={{ fontSize: 20 }}>{inputDescription}</Text>
        <TextInput
          onChangeText={(newInput) => inputSetter(newInput)}
          value={input}
          style={{ width: 200, fontSize: 25 }}
          placeholder={""}
          placeholderTextColor={Colors.grey}
          maxLength={25}
          underlineColorAndroid="#888"
        />
      </View>
    );
  };

  const validateInput = () => {
    if (petName.length < 2) {
      throw Messages.PETNAME_SHORT;
    }
  };

  const addPetPressed = async () => {
    try {
      setWaiting(true);
      setMessage("");
      setError("");
      validateInput();
      const newPet = await DbApi.InsertPet(petName, type, loggedUser.id);
      console.log(newPet);
      dispatch(storeNewPet(newPet));
      setMessage(Messages.REGISTER_PET_SUCCESS);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setWaiting(false);
    }
  };

  // display the error if there is one
  const displayMessage = () => {
    const output = error.length > 0 ? error : message;
    const color = error.length > 0 ? Colors.red : Colors.green;
    let retval = null;
    if (message.length + error.length > 0) {
      retval = (
        <View style={{ margin: 10, alignSelf: "center" }}>
          <Text style={{ color, fontSize: 20 }}>{output}</Text>
        </View>
      );
    }
    return retval;
  };

  const AddPetButton = () => {
    return (
      <View style={{ opacity: waiting ? 0.8 : 1 }} pointerEvents={waiting ? "none" : "auto"}>
        <TouchableOpacity activeOpacity={0.6} onPress={addPetPressed}>
          <View style={{ borderRadius: 30, backgroundColor: Colors.darkBlue, alignSelf: "center" }}>
            <Text style={styles.addButton}>{Captions.ADD_PET}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {inputWithText(petName, setPetName, Captions.PET_NAME)}
      {inputWithText(type, setType, Captions.PET_TYPE)}
      <View style={{ margin: 20 }}>{AddPetButton()}</View>
      {displayMessage()}
      {waiting && <ActivityIndicator size={"large"} color={Colors.blue} style={{ alignSelf: "center" }} />}
    </View>
  );
};

// screen's header
AddPetScreen.navigationOptions = () => {
  return { headerTitle: Captions.ADD_PET };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 10 },
  title: { fontSize: 30 },
  addButton: { color: "white", fontSize: 18, textAlign: "center", margin: 10, padding: 5, paddingHorizontal: 30 },
});

export default AddPetScreen;
