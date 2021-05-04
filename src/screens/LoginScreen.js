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
import Messages from "../resources/Messages";
import CacheManager, { UserCache } from "../resources/CacheManager";

const LoginScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);

  const dispatch = useDispatch();

  const loadUserFromCache = () => {
    // CacheManager.cleanCache(UserCache.name); // if we want to clear cache
    // the reason i made this function inside another loadUserFromCache
    // is for the reason this function cant be async so i bypass it
    (async () => {
      try {
        const user = await CacheManager.loadEntrieValue(UserCache.name, UserCache.types.lastLoggedUser);
        setUserName(user.username);
        setPassword(user.password);
      } catch (e) {
        console.log(e);
      }
    })();
  };

  useEffect(loadUserFromCache, []);

  /**
   * displays input with text of description
   * @param {*} input the input of the user
   * @param {*} inputSetter the setter to change the input
   * @param {*} inputDescription
   * @param {*} secret wheather the input should be hidden or not
   * @param {*} callback on submiting (V)
   */
  const inputWithText = (input, inputSetter, inputDescription, callback = () => {}, secret = false) => {
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
          onSubmitEditing={callback}
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

  /**
   * after login was successful, save the user in store and navigate to next screen
   * @param {*} user
   */
  const onSuccedLogin = (user) => {
    dispatch(saveLoggedUser(user));
    props.navigation.replace({ routeName: ScreensRouteName.MENU_SCREEN });
  };

  /**
   * move to register screen
   * @param {*} user
   */
  const onRegisterPressed = () => {
    props.navigation.navigate({ routeName: ScreensRouteName.REGISTER_SCREEN });
  };

  const LoginButton = () => {
    return (
      <View style={{ opacity: waiting ? 0.8 : 1 }} pointerEvents={waiting ? "none" : "auto"}>
        <TouchableOpacity activeOpacity={0.6} onPress={tryToLogin}>
          <View style={{ borderRadius: 30, backgroundColor: Colors.darkBlue, alignSelf: "center" }}>
            <Text style={styles.loginButton}>{Captions.LOGIN}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const RegisterButton = () => {
    return (
      <View style={{ opacity: waiting ? 0.8 : 1 }} pointerEvents={waiting ? "none" : "auto"}>
        <TouchableOpacity activeOpacity={0.6} onPress={onRegisterPressed}>
          <View style={{ backgroundColor: Colors.white, alignSelf: "center" }}>
            <Text style={styles.registerButton}>{Messages.REGISTER_MESSAGE}</Text>
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

  // if waiting, it displays timer on screen
  // otherwise it will return nothing so won't display
  const timer = () =>{
    if(waiting){
      return <ActivityIndicator size={"large"} color={Colors.blue} style={{ alignSelf: "center" }} />;
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Image
          // eslint-disable-next-line no-undef
          source={require("../../assets/tempImage.jpg")}
          style={{ width: "90%", marginVertical: 20 }}
        />
        {inputWithText(userName, setUserName, Captions.USER_NAME)}
        {inputWithText(password, setPassword, Captions.PASSWORD, tryToLogin, true)}
        {LoginButton()}
        {displayError()}
        {timer()}
        {RegisterButton()}
      </View>
    </ScrollView>
  );
};

// screen's header
LoginScreen.navigationOptions = { headerTitle: Captions.APP_NAME };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
  button: { fontSize: 30 },
  loginButton: { color: "white", fontSize: 18, textAlign: "center", margin: 10, padding: 5, paddingHorizontal: 30 },
  registerButton: {
    color: Colors.blue,
    fontSize: 16,
    textAlign: "center",
    margin: 5,
    textDecorationLine: "underline",
    padding: 20,
  },
});

export default LoginScreen;
