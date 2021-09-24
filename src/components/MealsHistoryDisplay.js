import React, { Component } from "react";
import { ScrollView } from "react-native";
import Shared from "../Shared";

import Yad2DataDisplay from "./Yad2DataDisplay";
export default class MealsHistoryDisplay extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * what happens when press on file
   * @param {*} file
   */
  onFilePress = (file) => {};

  /**
   * get the key for certain meal Summary
   * @param {*} mealSummary
   */
  getMealSummaryTitle = (mealSummary) => {
    return `${Shared.fromSqlDate2DateString(mealSummary.time)} ${Shared.fromSqlDate2TimeString(mealSummary.time)}`;
  };

  getDateString = (dateGiven) => {
    let retval = "";
    if (dateGiven) {
      var date = new Date(dateGiven);
      retval = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
    return retval;
  };

  getTimeDifference = (start, end) => {
    const startDate = Shared.generateDateFromTime(start);
    const endDate = Shared.generateDateFromTime(end);
    var diffMs = endDate - startDate; // milliseconds between now & Christmas
    // var diffDays = Math.floor(diffMs / 86400000); // days
    // var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return diffMins;
  };

  /**
   * {
    "amount_eaten": 15,
    "amount_given": 30,
    "name": "test",
    "pet_finished_eating": "15:55:29",
    "pet_id": 1,
    "pet_started_eating": "15:55:29",
    "time": "NaN:NaN"
}
   * the keys in this map will be displayed as properties of the same values
   * @param {*} mealSummary
   */
  rowDataDisplay = (mealSummary) => {
    const map = {};
    map["name"] = mealSummary.name;
    map["Amount given"] = `${mealSummary.amount_given} g`;
    map["Amount eaten"] = `${mealSummary.amount_eaten} g`;
    map["Time started"] = `${mealSummary.pet_started_eating} min`;
    map["Time Finished"] = `${mealSummary.pet_finished_eating} min`;
    map["duration"] = `${this.getTimeDifference(mealSummary.pet_started_eating, mealSummary.pet_finished_eating)} min`;
    return map;
  };

  render() {
    return (
      <ScrollView>
        <Yad2DataDisplay
          data={this.props.mealsSummary}
          initialNumToRender={this.props.mealsSummary.length}
          rowDataDisplay={this.rowDataDisplay}
          getTitle={this.getMealSummaryTitle}
          onFilePress={this.onFilePress}
        />
      </ScrollView>
    );
  }
}
