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

import { ScreensRouteName } from "../resources/Strings";
import DbApi from "../DbApi";
import Colors from "../resources/Colors";

const MainScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
  const inputWithText = (input, inputSetter, inputDescription, secret = false, loginAfter = false) => {
    const fun = loginAfter ? tryToLogin : () => {};
    return (
      <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between", width: "90%", padding: 10 }}>
        <TextInput
          onChangeText={(newInput) => inputSetter(newInput)}
          value={input}
          style={{ width: 200, fontSize: 25 }}
          placeholder={""}
          placeholderTextColor="grey"
          maxLength={25}
          underlineColorAndroid="#888"
          secureTextEntry={secret}
          onSubmitEditing={fun}
        />
        <Text style={{ fontSize: 20 }}>{inputDescription}</Text>
      </View>
    );
  };

  const tryToLogin = async () => {
    // DbApi.Login(userName, password)
    //   .then((userDetails) => {
    //     console.log(userDetails);
    //   })
    //   .catch((e) => console.log(e));
    try {
      setWaiting(true);
      setError("");
      const userDetails = await DbApi.Login(userName, password);
      console.log(userDetails);
      // onSuccedLogin(userDetails);
    } catch (e) {
      setError(e);
    } finally {
      setWaiting(false);
    }
  };

  const onSuccedLogin = () => {
    props.navigation.navigate({
      routeName: ScreensRouteName.SECOND_SCREEN,
      params: {},
    });
  };

  const LoginButton = () => {
    return (
      <View style={{ opacity: waiting ? 0.8 : 1 }} pointerEvents={waiting ? "none" : "auto"}>
        <TouchableOpacity activeOpacity={0.6} onPress={tryToLogin}>
          <View style={{ borderRadius: 30, backgroundColor: Colors.darkBlue, alignSelf: "center" }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                margin: 10,
                padding: 5,
                paddingHorizontal: 30,
              }}
            >
              login
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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
        {inputWithText(userName, setUserName, "user name")}
        {inputWithText(password, setPassword, "password", true, true)}
        {LoginButton()}
        {displayError()}
        {waiting && <ActivityIndicator size={"large"} color="#0000ff" style={{ alignSelf: "center" }} />}
      </View>
    </ScrollView>
  );
};

MainScreen.navigationOptions = {
  headerTitle: "Login",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  button: {
    fontSize: 30,
  },
});

export default MainScreen;
