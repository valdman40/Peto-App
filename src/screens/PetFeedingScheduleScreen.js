import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import { ScreensRouteName } from "../resources/Strings";
import { deleteFeedingSchedule } from "../store/actions/FeedingScheduleActions";
import { Entypo } from "@expo/vector-icons";
import DbApi from "../DbApi";

const PetFeedingScheduleScreen = (props) => {
  const dispatch = useDispatch();
  const feedingSchedule = useSelector((state) => state.FeedingSchedule.feedingSchedule);
  const pet = props.navigation.getParam("pet") || { name: "debugger's pet", id: 1 };

  const listHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerAttribute}>{Captions.NAME}</Text>
        <Text style={styles.headerAttribute}>{Captions.AMOUNT}</Text>
        <Text style={styles.headerAttribute}>{Captions.TIME}</Text>
        <TouchableOpacity onPress={addSchedulePressed}>
          <Text style={styles.add}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const addSchedulePressed = () => {
    props.navigation.navigate({ routeName: ScreensRouteName.ADD_EDIT_FEEDING_SCHEDULE_SCREEN, params: pet });
  };

  const deleteSchedule = async (scheduleId) => {
    try {
      await DbApi.DeleteSchedule(scheduleId);
      dispatch(deleteFeedingSchedule(scheduleId));
    } catch (e) {
      alert(e);
    }
  };

  const deletePressed = (petId) => {
    Alert.alert(`${Captions.DELETE}`, `${Messages.ARE_YOU_SURE_DELETE_PET}`, [
      { text: `${Captions.CANCEL}` },
      { text: `${Captions.CONFIRM}`, onPress: () => deleteSchedule(petId) },
    ]);
  };

  function editSchedule(scheduleDetails) {
    props.navigation.navigate({
      routeName: ScreensRouteName.ADD_EDIT_FEEDING_SCHEDULE_SCREEN,
      params: { schedule: scheduleDetails },
    });
  }

  const renderFeedingSchedule = (feedingSchedule) => {
    return (
      <TouchableOpacity style={styles.scheduleItem} onPress={() => editSchedule(feedingSchedule)}>
        <Text style={styles.listAttributeStyle}>{feedingSchedule.name}</Text>
        <Text style={styles.listAttributeStyle}>{feedingSchedule.amount}</Text>
        <Text style={styles.listAttributeStyle}>{feedingSchedule.time}</Text>
        <TouchableOpacity
          onPress={() => deletePressed(feedingSchedule.id)}
          style={{ alignSelf: "center", justifyContent: "center", width: 50, height: 50 }}
        >
          <Entypo name="trash" color={Colors.red} size={20} style={{ alignSelf: "center" }} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={feedingSchedule}
        keyExtractor={(pet) => pet.id.toString()}
        renderItem={(pet) => renderFeedingSchedule(pet.item)}
        ListHeaderComponent={listHeader}
      />
    </View>
  );
};

// screen's header
PetFeedingScheduleScreen.navigationOptions = (navigationData) => {
  const pet = navigationData.navigation.getParam("pet") || { name: "debugger's pet" };
  return { headerTitle: `${pet.name}'s Feeding Schedule` };
};

const listAttributeStyle = {
  fontSize: 18,
  paddingHorizontal: 10,
  width: "30%",
  textAlign: "center",
  alignSelf: "center",
};
const deleteButtonStyle = { fontSize: 30, paddingHorizontal: 20, textAlignVertical: "center", borderWidth: 1 };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 30 },
  listAttributeStyle,
  headerAttribute: { ...listAttributeStyle, color: Colors.white, fontSize: 20 },
  scheduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: "center",
  },
  delete: deleteButtonStyle,
  add: { ...deleteButtonStyle, borderWidth: 0, color: Colors.lawngreen },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: "center",
    backgroundColor: Colors.grey,
    marginTop: 20,
  },
});

export default PetFeedingScheduleScreen;
