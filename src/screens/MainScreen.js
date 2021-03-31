import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";

import { ScreensRouteName } from "../resources/Strings";
import DbApi from "../DbApi";
import Colors from "../resources/Colors";
import { saveLoggedUser } from "../store/actions/UserActions";
import Captions from "../resources/Captions";

const MainScreen = (props) => {
  const [userName, setUserName] = useState("Roy");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);

  const dispatch = useDispatch();

  /**
   * displays input with text of description
   * @param {*} input the input of the user
   * @param {*} inputSetter the setter to change the input
   * @param {*} inputDescription
   * @param {*} secret wheather the input should be hidden or not
   * @param {*} loginAfter if true, will try to login after pressing "v" on keyboard
   */
  const inputWithText = (input, inputSetter, inputDescription, secret = false, loginAfter = false) => {
    const fun = loginAfter ? tryToLogin : () => {};
    return (
      <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between", width: "90%", padding: 10 }}>
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
          onSubmitEditing={fun}
        />
      </View>
    );
  };

  // try to login using username + password given
  const tryToLogin = async () => {
    try {
      setWaiting(true);
      setError("");
      const user = await DbApi.Login(userName, password);
      onSuccedLogin(user);
    } catch (e) {
      setError(e);
    } finally {
      setWaiting(false);
    }
  };

    // try to login using username + password given
    const tryTest = async () => {
      try {
        const value = await DbApi.Test();
        alert(JSON.stringify(value));
      } catch (e) {
        setError(e);
      } 
    };

  /**
   * after login was successful, save the user in store and navigate to next screen
   * @param {*} user
   */
  const onSuccedLogin = (user) => {
    dispatch(saveLoggedUser(user));
    props.navigation.navigate({ routeName: ScreensRouteName.SECOND_SCREEN });
  };

  const LoginButton = () => {
    return (
      <View style={{ opacity: waiting ? 0.8 : 1 }} pointerEvents={waiting ? "none" : "auto"}>
        <TouchableOpacity activeOpacity={0.6} onPress={tryToLogin}>
          <View style={{ borderRadius: 30, backgroundColor: Colors.darkBlue, alignSelf: "center" }}>
            <Text style={styles.loginButton}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const TestButton = () => {
    return (
      <View style={{ opacity: waiting ? 0.8 : 1 }} pointerEvents={waiting ? "none" : "auto"}>
        <TouchableOpacity activeOpacity={0.6} onPress={tryTest}>
          <View style={{ borderRadius: 30, backgroundColor: Colors.darkBlue, alignSelf: "center" }}>
            <Text style={styles.loginButton}>Test</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // display the error if there is one
  const displayError = () => {
    let retval = null;
    if (error.length > 0) {
      retval = (
        <View style={{ margin: 10, alignSelf: "center" }}>
          <Text style={{ color: Colors.red, fontSize: 20 }}>{error}</Text>
        </View>
      );
    }
    return retval;
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Image
          // eslint-disable-next-line no-undef
          source={require("../../assets/tempImage.jpg")}
          style={{ width: "90%", marginVertical: 20 }}
        />
        {inputWithText(userName, setUserName, Captions.USER_NAME)}
        {inputWithText(password, setPassword, Captions.PASSWORD, true, true)}
        {LoginButton()}
        {TestButton()}
        {displayError()}
        {waiting && <ActivityIndicator size={"large"} color={Colors.blue} style={{ alignSelf: "center" }} />}
      </View>
    </ScrollView>
  );
};

// screen's header
MainScreen.navigationOptions = { headerTitle: Captions.APP_NAME };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
  button: { fontSize: 30 },
  loginButton: { color: "white", fontSize: 18, textAlign: "center", margin: 10, padding: 5, paddingHorizontal: 30 },
});

export default MainScreen;
