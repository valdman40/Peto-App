import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import DbApi from "../DbApi";
import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import { storeNewPet } from "../store/actions/PetsActions";
import Shared from "../Shared";

const AddPetScreen = () => {
  const loggedUser = useSelector((state) => state.User.loggedUser);
  const dispatch = useDispatch();
  const [petName, setPetName] = useState("");
  const [type, setType] = useState("");
  const [machineId, setMachineId] = useState("");
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
          style={{
            width: 200,
            fontSize: 25,
            borderBottomColor: "grey",
            borderBottomWidth: Platform.OS == "ios" ? 1 : 0,
          }}
          placeholder={""}
          placeholderTextColor={Colors.grey}
          maxLength={25}
          underlineColorAndroid="#888"
        />
      </View>
    );
  };

  const validateInput = () => {
    // if (!Shared.onlyLettersOrNumbers(petName)) {
    //   throw "not valid name";
    // }
    // if (petName.length < 2) {
    //   throw Messages.PETNAME_SHORT;
    // }
    // if (!Shared.onlyLettersOrNumbers(type)) {
    //   throw "not valid type";
    // }
    // if (type.length < 2) {
    //   throw Messages.PETTYPE_SHORT;
    // }
    // if (!Shared.onlyLettersOrNumbers(machineId)) {
    //   throw "not valid machineId";
    // }
    // if (machineId.length < 2) {
    //   throw Messages.PETMACHINEID_SHORT;
    // }
    const validate = Shared.onlyLettersOrNumbers([petName, type, machineId]);
    if (validate.valid == false) {
      throw `${validate.element} is not valid`;
    }
  };

  const addPetPressed = async () => {
    try {
      setWaiting(true);
      setMessage("");
      setError("");
      validateInput();
      const newPet = await DbApi.InsertPet(petName, type, loggedUser.id, machineId);
      dispatch(storeNewPet(newPet));
      setMessage(Messages.REGISTER_PET_SUCCESS);
    } catch (e) {
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
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
      {inputWithText(petName, setPetName, Captions.PET_NAME)}
      {inputWithText(type, setType, Captions.PET_TYPE)}
      {inputWithText(machineId, setMachineId, Captions.MACHINE_ID)}
      <View style={{ margin: 20 }}>{AddPetButton()}</View>
      {displayMessage()}
      {waiting && <ActivityIndicator size={"large"} color={Colors.blue} style={{ alignSelf: "center" }} />}
    </ScrollView>
  );
};

// screen's header
AddPetScreen.navigationOptions = () => {
  return { headerTitle: Captions.ADD_PET };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 10, height: "100%" },
  title: { fontSize: 30 },
  addButton: { color: "white", fontSize: 18, textAlign: "center", margin: 10, padding: 5, paddingHorizontal: 30 },
});

export default AddPetScreen;
