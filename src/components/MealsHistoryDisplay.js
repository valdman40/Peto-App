import React, { Component } from "react";
import { ScrollView } from "react-native";
import Shared from "../Shared";
import Yad2DataDisplay from "./Yad2DataDisplay";

// displays history by my choosing of elements, easy to change
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

  /**
   * returns minutes between start to end
   * @param {*} start
   * @param {*} end
   * @returns
   */
  getMinutesDifference = (start, end) => {
    const startDate = Shared.generateDateFromTime(start);
    const endDate = Shared.generateDateFromTime(end);
    var diffMs = endDate - startDate;
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return diffMins;
  };

  /**
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
    map["duration"] = `${this.getMinutesDifference(
      mealSummary.pet_started_eating,
      mealSummary.pet_finished_eating
    )} min`;
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
