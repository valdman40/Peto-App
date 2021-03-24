import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";

const renderItem = (item) => {
  return <Text style={styles.item}>{item.item}</Text>;
};

const SecondScreen = (props) => {
    const availableMeals = useSelector((state) => state.Meals.filteredMeals);
    console.log(availableMeals);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>second screen</Text>
      <FlatList data={availableMeals} renderItem={renderItem} keyExtractor={(item) => item.toString()} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
  item: {
    fontSize: 20,
  },
});

export default SecondScreen;
