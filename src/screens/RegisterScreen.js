import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";

import DbApi from "../DbApi";
import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import Shared from "../Shared";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
  /**
   * displays input with text of description
   * @param {*} input the input of the user
   * @param {*} inputSetter the setter to change the input
   * @param {*} inputDescription
   * @param {*} secret wheather the input should be hidden or not
   * @param {*} loginAfter if true, will try to login after pressing "v" on keyboard
   */
  const inputWithText = (input, inputSetter, inputDescription, secret = false) => {
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
          secureTextEntry={secret}
        />
      </View>
    );
  };

  const validateUserInput = () => {
    if (name.length < 2) {
      throw Messages.NAME_SHORT;
    }
    if (userName.length < 4) {
      throw Messages.USERNAME_SHORT;
    }
    if (password.length < 4) {
      throw Messages.PASSWORD_SHORT;
    }
    if (password !== confirmPassword) {
      throw Messages.PASSWORDS_DONT_MATCH;
    }

    const validate = Shared.onlyLettersOrNumbers([userName, name]);
    if (validate.valid == false) {
      throw `${validate.element} is not valid`;
    }
  };

  const registerPressed = async () => {
    try {
      setWaiting(true);
      setMessage("");
      setError("");
      validateUserInput();
      await DbApi.RegisterUser(userName, password, name);
      setMessage(Messages.REGISTER_SUCCESS);
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

  const RegisterButton = () => {
    return (
      <View style={{ opacity: waiting ? 0.8 : 1 }} pointerEvents={waiting ? "none" : "auto"}>
        <TouchableOpacity activeOpacity={0.6} onPress={registerPressed}>
          <View style={{ borderRadius: 30, backgroundColor: Colors.darkBlue, alignSelf: "center" }}>
            <Text style={styles.loginButton}>{Captions.REGISTER}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {inputWithText(name, setName, Captions.NAME)}
      {inputWithText(userName, setUserName, Captions.USER_NAME)}
      {inputWithText(password, setPassword, Captions.PASSWORD, true)}
      {inputWithText(confirmPassword, setConfirmPassword, Captions.CONFIRM_PASSWORD, true)}
      <View style={{ margin: 20 }}>{RegisterButton()}</View>
      {displayMessage()}
      {waiting && <ActivityIndicator size={"large"} color={Colors.blue} style={{ alignSelf: "center" }} />}
    </View>
  );
};

// screen's header
RegisterScreen.navigationOptions = () => {
  return { headerTitle: Captions.REGISTER };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 10 },
  title: { fontSize: 30 },
  loginButton: { color: "white", fontSize: 18, textAlign: "center", margin: 10, padding: 5, paddingHorizontal: 30 },
});

export default RegisterScreen;
