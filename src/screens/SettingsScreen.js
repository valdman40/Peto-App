import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import { setBaseUrl } from "../store/actions/SettingsActions";

const SettingsScreen = (props) => {
  alert("hi");
  const urlBase = useSelector((state) => state.Settings.urlBase);
  const dispatch = useDispatch();
  const [url, setUrl] = useState(urlBase);
  /**
   * displays input with text of description
   * @param {*} input the input of the user
   * @param {*} inputSetter the setter to change the input
   * @param {*} inputDescription
   */
  const inputWithText = (input, inputSetter, inputDescription, keyboard) => {
    let keyboardType = "default";
    if (keyboard) {
      keyboardType = keyboard;
    }
    return (
      <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between", width: "100%", padding: 10 }}>
        <Text style={{ fontSize: 20 }}>{inputDescription}</Text>
        <TextInput
          onChangeText={(newInput) => inputSetter(newInput)}
          value={input.toString()}
          style={{ width: 200, fontSize: 15 }}
          placeholder={""}
          placeholderTextColor={Colors.grey}
          maxLength={25}
          underlineColorAndroid="#888"
          keyboardType={keyboardType}
        />
      </View>
    );
  };

  const SubmitPressed = async () => {
    try {
      let message = Messages.CHANGE_SUCCESS;
      dispatch(setBaseUrl(url));
      Alert.alert(`${"alert"}`, `${message}`, [{ text: `${Captions.CONFIRM}`, onPress: () => props.navigation.pop() }]);
    } catch (e) {
      alert(e);
    }
  };

  const SubmitButton = () => {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.6} onPress={SubmitPressed}>
          <View style={{ borderRadius: 30, backgroundColor: Colors.darkBlue, alignSelf: "center" }}>
            <Text style={styles.addButton}>{Captions.SUBMIT}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
      {inputWithText(url, setUrl, Captions.REST_API_URL)}
      <View style={{ margin: 20 }}>{SubmitButton()}</View>
    </ScrollView>
  );
};

// screen's header
SettingsScreen.navigationOptions = () => {
  return { headerTitle: Captions.SETTINGS };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 10, height: "100%" },
  title: { fontSize: 30 },
  addButton: { color: "white", fontSize: 18, textAlign: "center", margin: 10, padding: 5, paddingHorizontal: 30 },
});

export default SettingsScreen;
