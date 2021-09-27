import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import Captions from "../resources/Captions";
import Messages from "../resources/Messages";
import Colors from "../resources/Colors";
import Shared from "../Shared";

const MealsHistoryGraphScreen = (props) => {
  const [dates, setDates] = useState([""]);
  const [amountGiven, setAmountGiven] = useState([0]);
  const [amountEaten, setAmountEaten] = useState([0]);
  const mealsHistory = useSelector((state) => state.Meals.mealsHistory);
  // const mealsHistory = [
  //   {
  //     amount_eaten: 3,
  //     amount_given: 10,
  //     name: "instant Feed",
  //     pet_finished_eating: "23:49:40",
  //     pet_id: 1,
  //     pet_started_eating: "23:49:33",
  //     time: "2021-09-26 23:48:29",
  //   },
  //   {
  //     amount_eaten: 8,
  //     amount_given: 10,
  //     name: "instant Feed",
  //     pet_finished_eating: "23:52:42",
  //     pet_id: 1,
  //     pet_started_eating: "23:50:36",
  //     time: "2021-09-26 23:48:29",
  //   },
  //   {
  //     amount_eaten: 10,
  //     amount_given: 10,
  //     name: "instant Feed",
  //     pet_finished_eating: "23:47:43",
  //     pet_id: 1,
  //     pet_started_eating: "23:47:24",
  //     time: "2021-09-26 23:46:20",
  //   },
  //   {
  //     amount_eaten: 6,
  //     amount_given: 10,
  //     name: "instant Feed",
  //     pet_finished_eating: "23:44:35",
  //     pet_id: 1,
  //     pet_started_eating: "23:44:32",
  //     time: "2021-09-26 23:43:29",
  //   },
  //   {
  //     amount_eaten: 15,
  //     amount_given: 30,
  //     name: "test",
  //     pet_finished_eating: "13:31:24",
  //     pet_id: 1,
  //     pet_started_eating: "13:31:23",
  //     time: "2021-09-26 13:31:23",
  //   },
  //   {
  //     amount_eaten: 15,
  //     amount_given: 30,
  //     name: "test",
  //     pet_finished_eating: "13:31:18",
  //     pet_id: 1,
  //     pet_started_eating: "13:31:17",
  //     time: "2021-09-26 13:31:17",
  //   },
  //   {
  //     amount_eaten: -2,
  //     amount_given: 10,
  //     name: "instant Feed",
  //     pet_finished_eating: "12:05:16",
  //     pet_id: 1,
  //     pet_started_eating: "12:04:13",
  //     time: "2021-09-26 12:03:10",
  //   },
  //   {
  //     amount_eaten: 55,
  //     amount_given: 50,
  //     name: "instant Feed",
  //     pet_finished_eating: "16:10:52",
  //     pet_id: 1,
  //     pet_started_eating: "16:10:27",
  //     time: "2021-09-25 16:10:13",
  //   },
  //   {
  //     amount_eaten: 55,
  //     amount_given: 50,
  //     name: "instant Feed",
  //     pet_finished_eating: "16:11:29",
  //     pet_id: 1,
  //     pet_started_eating: "16:11:16",
  //     time: "2021-09-25 16:10:13",
  //   },
  //   {
  //     amount_eaten: 1371,
  //     amount_given: 30,
  //     name: "instant Feed",
  //     pet_finished_eating: "14:38:41",
  //     pet_id: 1,
  //     pet_started_eating: "14:37:37",
  //     time: "2021-09-25 14:36:33",
  //   },
  //   {
  //     amount_eaten: 1434,
  //     amount_given: 80,
  //     name: "instant Feed",
  //     pet_finished_eating: "19:57:20",
  //     pet_id: 1,
  //     pet_started_eating: "19:56:18",
  //     time: "2021-09-24 19:55:13",
  //   },
  //   {
  //     amount_eaten: 2482,
  //     amount_given: 100,
  //     name: "instant Feed",
  //     pet_finished_eating: "19:45:56",
  //     pet_id: 1,
  //     pet_started_eating: "19:45:34",
  //     time: "2021-09-24 19:45:25",
  //   },
  //   {
  //     amount_eaten: 2448,
  //     amount_given: 100,
  //     name: "instant Feed",
  //     pet_finished_eating: "19:46:37",
  //     pet_id: 1,
  //     pet_started_eating: "19:46:28",
  //     time: "2021-09-24 19:45:25",
  //   },
  //   {
  //     amount_eaten: 2504,
  //     amount_given: 100,
  //     name: "instant Feed",
  //     pet_finished_eating: "19:48:33",
  //     pet_id: 1,
  //     pet_started_eating: "19:47:30",
  //     time: "2021-09-24 19:45:25",
  //   },
  //   {
  //     amount_eaten: 7,
  //     amount_given: 10,
  //     name: "instant Feed",
  //     pet_finished_eating: "19:28:00",
  //     pet_id: 1,
  //     pet_started_eating: "19:26:55",
  //     time: "2021-09-24 19:25:51",
  //   },
  //   {
  //     amount_eaten: 9,
  //     amount_given: 10,
  //     name: "instant Feed",
  //     pet_finished_eating: "19:10:32",
  //     pet_id: 1,
  //     pet_started_eating: "19:09:30",
  //     time: "2021-09-24 19:08:27",
  //   },
  //   {
  //     amount_eaten: 12,
  //     amount_given: 10,
  //     name: "instant Feed",
  //     pet_finished_eating: "19:08:12",
  //     pet_id: 1,
  //     pet_started_eating: "19:07:10",
  //     time: "2021-09-24 19:06:06",
  //   },
  //   {
  //     amount_eaten: 37,
  //     amount_given: 20,
  //     name: "instant Feed",
  //     pet_finished_eating: "15:50:05",
  //     pet_id: 1,
  //     pet_started_eating: "15:49:03",
  //     time: "2021-09-24 15:47:59",
  //   },
  //   {
  //     amount_eaten: 53,
  //     amount_given: 30,
  //     name: "instant Feed",
  //     pet_finished_eating: "15:47:23",
  //     pet_id: 1,
  //     pet_started_eating: "15:46:21",
  //     time: "2021-09-24 15:45:18",
  //   },
  //   {
  //     amount_eaten: 40,
  //     amount_given: 30,
  //     name: "instant Feed",
  //     pet_finished_eating: "15:44:54",
  //     pet_id: 1,
  //     pet_started_eating: "15:43:52",
  //     time: "2021-09-24 15:41:46",
  //   },
  //   {
  //     amount_eaten: 13,
  //     amount_given: 20,
  //     name: "instant Feed",
  //     pet_finished_eating: "19:35:59",
  //     pet_id: 1,
  //     pet_started_eating: "19:34:57",
  //     time: "2021-09-22 19:33:53",
  //   },
  //   {
  //     amount_eaten: 20,
  //     amount_given: 30,
  //     name: "once3",
  //     pet_finished_eating: "18:40:12",
  //     pet_id: 1,
  //     pet_started_eating: "18:39:10",
  //     time: "2021-09-22 18:38:01",
  //   },
  //   {
  //     amount_eaten: 29,
  //     amount_given: 40,
  //     name: "instant Feed",
  //     pet_finished_eating: "18:34:06",
  //     pet_id: 1,
  //     pet_started_eating: "18:33:04",
  //     time: "2021-09-22 18:32:01",
  //   },
  //   {
  //     amount_eaten: 20,
  //     amount_given: 40,
  //     name: "repeat",
  //     pet_finished_eating: "18:08:16",
  //     pet_id: 1,
  //     pet_started_eating: "18:08:16",
  //     time: "2021-09-22 18:05:01",
  //   },
  //   {
  //     amount_eaten: 22,
  //     amount_given: 40,
  //     name: "instant Feed",
  //     pet_finished_eating: "17:59:22",
  //     pet_id: 1,
  //     pet_started_eating: "17:59:22",
  //     time: "2021-09-22 17:56:14",
  //   },
  //   {
  //     amount_eaten: 29,
  //     amount_given: 30,
  //     name: "instant Feed",
  //     pet_finished_eating: "17:50:52",
  //     pet_id: 1,
  //     pet_started_eating: "17:50:52",
  //     time: "2021-09-22 17:50:16",
  //   },
  //   {
  //     amount_eaten: 15,
  //     amount_given: 30,
  //     name: "test",
  //     pet_finished_eating: "15:55:29",
  //     pet_id: 1,
  //     pet_started_eating: "15:55:29",
  //     time: "2021-09-22 15:55:29",
  //   },
  // ];

  useEffect(() => {
    const historyCount = mealsHistory.length;
    const updateDates = [];
    const updateAmountGiven = [];
    const updateAmountEaten = [];
    if (historyCount > 0) {
      let lastDateChanged = new Date(mealsHistory[historyCount - 1].time);
      let amount_given = 0;
      let amount_eaten = 0;
      for (var i = historyCount - 1; i >= 0; i--) {
        const currentDate = new Date(mealsHistory[i].time);
        amount_given += mealsHistory[i].amount_given;
        amount_eaten += mealsHistory[i].amount_eaten;
        if (currentDate.getDay() != lastDateChanged.getDay()) {
          updateDates.push(`${currentDate.getDate()}/${currentDate.getMonth() + 1}`);
          lastDateChanged = currentDate;
          updateAmountGiven.push(amount_given);
          amount_given = 0;
          updateAmountEaten.push(amount_eaten);
          amount_eaten = 0;
        }
      }
      setDates(updateDates);
      setAmountGiven(updateAmountGiven);
      setAmountEaten(updateAmountEaten);
    }
  }, []);
  /**
 amount_eaten: 3
amount_given: 10
name: "instant Feed"
pet_finished_eating: "23:49:40"
pet_id: 1
pet_started_eating: "23:49:33"
time: "2021-09-26 23:48:29"
 */

  const line2 = () => {
    return (
      <LineChart
        bezier
        withHorizontalLabels={true}
        withVerticalLabels={true}
        data={{
          // labels: ["20.7", "21.7", "22.7", "23.7", "24.7", "25.7"],
          labels: ["5/8", "6/8", "0/8"],
          datasets: [
            {
              data: [260, 490, 110], //[30, 30, 30],
              strokeWidth: 2,
              color: (opacity = 1) => `rgba(255,0,0,${opacity})`,
            },
            {
              data: [188, 10357, 108], //[20, 15, 13],
              strokeWidth: 2,
              color: (opacity = 1) => `rgba(0,0,102, ${opacity})`,
            },
          ],
          legend: ["Total Fed", "Total eaten"],
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

  const Myline2 = () => {
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
  return <View>{Myline2()}</View>;
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
