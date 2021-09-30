import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { LineChart, BarChart } from "react-native-chart-kit";

import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import Shared from "../Shared";

const MealsHistoryGraphScreen = (props) => {
  const [dates, setDates] = useState([""]);
  const [amountGiven, setAmountGiven] = useState([0]);
  const [amountEaten, setAmountEaten] = useState([0]);
  const [healthRates, setHealthRates] = useState([0]);

  const getCleanDate = (dateString) => {
    var date = new Date(dateString.replace(new RegExp("-", "g"), "/"));
    date.setHours(0, 0, 0, 0);
    return date;
  };

  useEffect(() => {
    const graphStats = props.navigation.getParam("graphStats");
    const updateDates = [];
    const updateAmountGiven = [];
    const updateAmountEaten = [];
    const UpdateHealthRates = [];
    graphStats.forEach((element) => {
      const cleanDate = getCleanDate(element.date);
      updateDates.push(`${cleanDate.getDate()}/${cleanDate.getMonth() + 1}`);
      UpdateHealthRates.push(element.rate);
      updateAmountEaten.push(element.amount_eaten);
      updateAmountGiven.push(element.amount_given);
    });
    setDates(updateDates);
    setAmountGiven(updateAmountGiven);
    setAmountEaten(updateAmountEaten);
    setHealthRates(UpdateHealthRates);
  }, []);

  const chartsConfig = {
    backgroundColor: "#1cc910",
    backgroundGradientFrom: "#eff3ff",
    backgroundGradientTo: "#efefef",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
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
          legend: [`${Captions.GIVEN}`, `${Captions.EATEN}`],
        }}
        width={Dimensions.get("window").width}
        height={300}
        chartConfig={chartsConfig}
        style={{}}
      />
    );
  };

  const displayHealth = () => {
    return (
      <LineChart
        bezier
        withHorizontalLabels={true}
        withVerticalLabels={true}
        data={{
          labels: dates,
          datasets: [
            {
              data: healthRates,
              strokeWidth: 2,
              color: (opacity = 1) => `rgba(0,255,128, ${opacity})`,
            },
          ],
          legend: [`${Captions.HEALTH}`],
        }}
        width={Dimensions.get("window").width}
        height={200}
        chartConfig={chartsConfig}
      />
    );
  };
  return (
    <View>
      {display2Lines()}
      {displayHealth()}
    </View>
  );
};

// screen's header
MealsHistoryGraphScreen.navigationOptions = (navigationData) => {
  const pet = navigationData.navigation.getParam("pet");
  return {
    headerTitle: `${pet.name}'s ${Captions.MEALS_GRAPH}`,
  };
};

export default MealsHistoryGraphScreen;
