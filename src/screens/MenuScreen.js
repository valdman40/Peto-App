import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import { ScreensRouteName } from "../resources/Strings";
import { storeUserPets } from "../store/actions/PetsActions";
import DbApi from "../DbApi";

/**
 * returns greeting message with the name given
 * @param {*} name
 */
const greetingMessage = (name) => {
  var today = new Date();
  var curHr = today.getHours();
  let message;
  if (curHr < 4) {
    message = Captions.GOOD_NIGHT;
  } else if (curHr < 12) {
    message = Captions.GOOD_MORNING;
  } else if (curHr < 18) {
    message = Captions.GOOD_AFTERNOON;
  } else {
    message = Captions.GOOD_EVNING;
  }
  return `${message} ${name}`;
};

const MenuScreen = (props) => {
  const dispatch = useDispatch();
  const [animationKey, setAnimationKey] = useState(new Date());
  const loggedUser = useSelector((state) => state.User.loggedUser);
  const moveToPets = async () => {
    try {
      const userPets = await DbApi.LoadUserPets(loggedUser.id);
      dispatch(storeUserPets(userPets));
      props.navigation.navigate({ routeName: ScreensRouteName.PETS_SCREEN });
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      setAnimationKey(new Date());
    });
  }, [props.navigation]);

  const moveToEditUserScreen = () => {
    props.navigation.navigate({ routeName: ScreensRouteName.EDIT_USER_SCREEN });
  };

  const moveToSettings = () => {
    props.navigation.navigate({ routeName: ScreensRouteName.SETTINGS });
  };

  /**
   * the behavior we want to have when user presses back button
   */
  const onBackButtonPress = () => {
    Alert.alert(`${Captions.DISCONNECT}`, `${Messages.DISCONNECT_QUESTION}`, [
      { text: `${Captions.NO}` },
      {
        text: `${Captions.YES}`,
        onPress: () => props.navigation.replace({ routeName: ScreensRouteName.LOGIN_SCREEN }),
      },
    ]);
    return true;
  };

  const buttons = [
    {
      title: Captions.COMMIT_USER_EDIT,
      ms: 100,
      icon: <FontAwesome5 name={"user-edit"} color={"rgb(0, 128, 255)"} size={30} />,
      onPress: moveToEditUserScreen,
    },
    {
      title: Captions.PETS,
      ms: 200,
      icon: <MaterialIcons name={"pets"} color={"rgb(0, 128, 255)"} size={30} />,
      onPress: moveToPets,
    },
    {
      title: Captions.DISCONNECT,
      ms: 300,
      icon: <MaterialCommunityIcons name={"exit-run"} color={"rgb(0, 128, 255)"} size={30} />,
      onPress: onBackButtonPress,
    },
    {
      title: Captions.SETTINGS,
      ms: 400,
      icon: <Ionicons name={"settings"} color={"rgb(0, 128, 255)"} size={30} />,
      onPress: moveToSettings,
    },
  ];

  const renderbutton = (button) => {
    const { title, ms, icon, onPress } = button;
    return (
      <TouchableOpacity onPress={onPress} style={styles.menuButton}>
        <Animatable.View
          animation="bounceIn"
          delay={ms}
          useNativeDriver={true}
          key={animationKey} // so it will be new animation everytime
          style={{ alignSelf: "center", alignItems: "center" }}
        >
          {icon}
          <Text style={{ textAlign: "center", fontSize: 20, margin: 10 }}>{title}</Text>
        </Animatable.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{greetingMessage(loggedUser.name)}</Text>
      <FlatList
        data={buttons}
        keyExtractor={(button) => button.title}
        renderItem={(button) => renderbutton(button.item)}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around", flex: 1 }}
      />
    </View>
  );
};

// screen's header
MenuScreen.navigationOptions = { headerTitle: Captions.MENU };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  item: {
    fontSize: 20,
  },
  moveToPets: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.accentColor,
    padding: 10,
    margin: 10,
  },
  menuButton: {
    borderWidth: 0.3,
    borderRadius: 3,
    backgroundColor: "white",
    justifyContent: "center",
    width: "45%",
    height: 150,
    margin: 7,
    padding: 20,
    flex: 1,
    fontSize: 20,
    // android
    elevation: 8,
    // ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

export default MenuScreen;
