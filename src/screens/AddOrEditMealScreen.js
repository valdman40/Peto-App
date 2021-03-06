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
  CheckBox,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-material-dropdown-v2";
// import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";

import DbApi from "../DbApi";
import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import { storeNewMeal, updateMeal } from "../store/actions/MealsActions";
import Shared from "../Shared";

const AddOrEditMealScreen = (props) => {
  const pet = props.navigation.getParam("pet");
  const meal = props.navigation.getParam("meal") || { name: "", amount: 10, time: "00:00", repeat_daily: 1, id: 0 };
  const dispatch = useDispatch();
  const [name, setName] = useState(meal.name);
  const [amount, setAmount] = useState(meal.amount);
  const [time, setTime] = useState(meal.time);
  const [clockOpen, setClockOpen] = useState(false);
  const [repeat_daily, setRepeat_daily] = useState(meal.repeat_daily > 0 ? true : false);
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
          keyboardType={keyboardType}
        />
      </View>
    );
  };

  const validateInput = () => {
    if (name.length < 2) {
      throw Messages.NAME_SHORT;
    }
    if (!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time)) {
      throw Messages.NOT_VALID_TIME;
    }
    const validate = Shared.onlyLettersOrNumbers([name]);
    if (validate.valid == false) {
      throw `${validate.element} is not valid`;
    }
  };

  const SubmitPressed = async () => {
    try {
      setWaiting(true);
      setMessage("");
      setError("");
      validateInput();
      // if id isn't new, update it, otherwise insert new
      const changed_meal = { name, amount, time, repeat_daily: repeat_daily ? 1 : 0, id: meal.id };
      let message = Messages.MEAL_CHANGE_SUCCESS;
      if (changed_meal.id > 0) {
        await DbApi.UpdateMeal(changed_meal);
        dispatch(updateMeal(changed_meal));
      } else {
        message = Messages.MEAL_INSERT_SUCCESS;
        const newMeal_id = await DbApi.InsertMeal(changed_meal, pet.id);
        dispatch(storeNewMeal({ ...changed_meal, id: newMeal_id }));
      }
      // MEAL_INSERT_SUCCESS
      setMessage(message);
      Alert.alert(`${"alert"}`, `${message}`, [{ text: `${Captions.CONFIRM}`, onPress: () => props.navigation.pop() }]);
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

  const amountsOfFood = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
    { value: 60 },
    { value: 70 },
    { value: 80 },
    { value: 90 },
    { value: 100 },
  ];
  const amountDropDown = () => {
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
            data={amountsOfFood}
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

  const repeatDaily = () => {
    if (Platform.OS != "ios") {
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
          <Text style={{ fontSize: 20 }}>{Captions.REPEAT}</Text>
          <View style={{ width: "50%" }}>
            <CheckBox
              value={repeat_daily}
              onValueChange={setRepeat_daily}
              style={{ alignSelf: "flex-start" }}
              disabled={false}
            />
          </View>
        </View>
      );
    } else {
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
          <Text style={{ fontSize: 20 }}>{Captions.REPEAT}</Text>
          <View style={{ width: "50%" }}>
            <TouchableOpacity onPress={() => setRepeat_daily(!repeat_daily)}>
              <MaterialIcons
                size={25}
                color={Colors.green}
                name={repeat_daily ? "check-box" : "check-box-outline-blank"}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const inputTime = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
        <Text style={{ fontSize: 20 }}>{Captions.TIME}</Text>
        <View style={{ flex: 0.6 }}>
          <TouchableOpacity
            onPress={() => setClockOpen(true)}
            style={{ flexDirection: "row", width: "60%", justifyContent: "space-between" }}
          >
            <AntDesign size={25} color={Colors.blue} name={"clockcircle"} />
            <Text style={{ fontSize: 20 }}>{time}</Text>
            {clockOpen && Platform.OS != "ios" && (
              <DateTimePicker
                testID="dateTimePicker"
                value={Shared.generateDateFromTime(time)}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={(input) => {
                  setClockOpen(false);
                  setTime(Shared.fromDate2TimeString(input.nativeEvent.timestamp));
                }}
              />
            )}
            {clockOpen && Platform.OS == "ios" && (
              <DateTimePicker
                testID="dateTimePicker"
                style={{ width: 400 }}
                value={Shared.generateDateFromTime(time)}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={(input) => {
                  // console.log(input);
                  // setClockOpen(false);
                  // setTime(Shared.fromDate2TimeString(input.nativeEvent.timestamp));
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
      {inputWithText(name, setName, Captions.SCHEDULE_NAME)}
      {Platform.OS == "ios" && inputWithText(time, setTime, Captions.TIME)}
      {Platform.OS != "ios" && inputTime()}
      {amountDropDown()}
      {repeatDaily()}
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
