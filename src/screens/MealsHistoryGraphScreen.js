import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { LineChart } from "react-native-chart-kit";

import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import Shared from "../Shared";

const MealsHistoryGraphScreen = (props) => {
  const [dates, setDates] = useState([""]);
  const [amountGiven, setAmountGiven] = useState([0]);
  const [amountEaten, setAmountEaten] = useState([0]);
  const mealsHistory = useSelector((state) => state.Meals.mealsHistory);

  const getCleanDate = (dateString) => {
    var date = new Date(dateString.time.replace(new RegExp("-", "g"), "/"));
    date.setHours(0, 0, 0, 0);
    return date;
  };

  useEffect(() => {
    const historyCount = mealsHistory.length;
    const updateDates = [];
    const updateAmountGiven = [];
    const updateAmountEaten = [];
    if (historyCount > 0) {
      let lastDateChanged = getCleanDate(mealsHistory[historyCount - 1]);
      let currentDate = lastDateChanged;
      let amount_given = 0;
      let amount_eaten = 0;
      for (var i = historyCount - 1; i >= 0; i--) {
        currentDate = getCleanDate(mealsHistory[i]);
        amount_given += mealsHistory[i].amount_given;
        amount_eaten += mealsHistory[i].amount_eaten;
        if (currentDate > lastDateChanged) {
          updateDates.push(`${lastDateChanged.getDate()}/${lastDateChanged.getMonth() + 1}`);
          lastDateChanged = currentDate;
          updateAmountGiven.push(amount_given);
          amount_given = 0;
          updateAmountEaten.push(amount_eaten);
          amount_eaten = 0;
        }
      }
      updateDates.push(`${currentDate.getDate()}/${currentDate.getMonth() + 1}`);
      updateAmountGiven.push(amount_given);
      updateAmountEaten.push(amount_eaten);
      setDates(updateDates);
      setAmountGiven(updateAmountGiven);
      setAmountEaten(updateAmountEaten);
    }
  }, []);

  const display2Lines = () => {
    return (
      <LineChart
        bezier
        withHorizontalLabels={true}
        withVerticalLabels={true}
        data={{
          labels: dates,
          datasets: [
            {
              data: amountGiven,
              strokeWidth: 2,
              color: (opacity = 1) => `rgba(255,0,0,${opacity})`,
            },
            {
              data: amountEaten,
              strokeWidth: 2,
              color: (opacity = 1) => `rgba(0,0,102, ${opacity})`,
            },
          ],
          legend: ["Total given", "Total eaten"],
        }}
        width={Dimensions.get("window").width}
        height={300}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{}}
      />
    );
  };
  return <View>{display2Lines()}</View>;
};

// screen's header
MealsHistoryGraphScreen.navigationOptions = (navigationData) => {
  const pet = navigationData.navigation.getParam("pet") || { name: "debugger's pet" };
  return {
    headerTitle: `${pet.name}'s Meals Graph`,
  };
};

const styles = StyleSheet.create({});

export default MealsHistoryGraphScreen;
