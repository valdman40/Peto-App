import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-native-material-dropdown-v2";

import DbApi from "../DbApi";
import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import { storeNewMeal, updateMeal } from "../store/actions/MealsActions";

const AddOrEditMealScreen = (props) => {
  const pet = props.navigation.getParam("pet") || { name: "debugger's pet", id: 1 };
  const meal = props.navigation.getParam("meal") || { name: "", amount: 0, time: "00:00", id: 0 };
  const dispatch = useDispatch();
  const [name, setName] = useState(meal.name);
  const [amount, setAmount] = useState(meal.amount);
  const [time, setTime] = useState(meal.time);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
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
          style={{ width: 200, fontSize: 25 }}
          placeholder={""}
          placeholderTextColor={Colors.grey}
          maxLength={25}
          underlineColorAndroid="#888"
          keyboardType={keyboardType}
        />
      </View>
    );
  };

  const validateInput = () => {
    if (name.length < 2) {
      throw Messages.MEAL_NAME_SHORT;
    }
    if (!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time)) {
      throw Messages.NOT_VALID_TIME;
    }
  };

  const SubmitPressed = async () => {
    try {
      setWaiting(true);
      setMessage("");
      setError("");
      validateInput();
      // if id isn't new, update it, otherwise insert new
      if (meal.id > 0) {
        const updatedMeal = { name, amount, time, type: true, id: meal.id };
        await DbApi.UpdateMeal(updatedMeal);
        dispatch(updateMeal(updatedMeal));
      } else {
        const sched = await DbApi.InsertSchedule(name, amount, time, true, pet.id);
        dispatch(storeNewMeal(sched));
      }
      setMessage(Messages.MEAL_CHANGE_SUCCESS);
      Alert.alert(`${"alert"}`, `${Messages.MEAL_CHANGE_SUCCESS}`, [
        { text: `${Captions.CONFIRM}`, onPress: () => props.navigation.pop() },
      ]);
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

  const SubmitButton = () => {
    return (
      <View style={{ opacity: waiting ? 0.8 : 1 }} pointerEvents={waiting ? "none" : "auto"}>
        <TouchableOpacity activeOpacity={0.6} onPress={SubmitPressed}>
          <View style={{ borderRadius: 30, backgroundColor: Colors.darkBlue, alignSelf: "center" }}>
            <Text style={styles.addButton}>{Captions.SUBMIT}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const amountDropDown = () => {
    const items = [];
    for (let i = 1; i <= 10; i++) {
      const value = 10 * i;
      items.push({ value });
    }
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          alignItems: "center",
          width: "95%",
          alignSelf: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 20 }}>{Captions.AMOUNT}</Text>
        <View
          style={{
            width: "50%",
            flexDirection: "row",
            alignSelf: "center",
            alignContent: "center",
          }}
        >
          <Dropdown
            data={items}
            containerStyle={{ height: 70 }}
            value={amount}
            itemTextStyle={{ textAlign: "center" }}
            style={{ textAlign: "center" }}
            onChangeText={(amount) => setAmount(amount)}
          />
          <Text style={{ fontSize: 20, alignSelf: "center", margin: 10 }}>grams</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
      {inputWithText(name, setName, Captions.SCHEDULE_NAME)}
      {/* {inputWithText(amount, setAmount, Captions.AMOUNT, "numeric")} */}
      {inputWithText(time, setTime, Captions.TIME, "numeric")}
      {amountDropDown()}
      <View style={{ margin: 20 }}>{SubmitButton()}</View>
      {displayMessage()}
      {waiting && <ActivityIndicator size={"large"} color={Colors.blue} style={{ alignSelf: "center" }} />}
    </ScrollView>
  );
};

// screen's header
AddOrEditMealScreen.navigationOptions = () => {
  return { headerTitle: Captions.ADD_PET };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 10, height: "100%" },
  title: { fontSize: 30 },
  addButton: { color: "white", fontSize: 18, textAlign: "center", margin: 10, padding: 5, paddingHorizontal: 30 },
});

export default AddOrEditMealScreen;