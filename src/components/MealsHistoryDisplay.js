import React, { Component } from "react";
import { ScrollView } from "react-native";

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
    return `${mealSummary.date} ${mealSummary.time}`;
  };

  getDateString = (dateGiven) => {
    let retval = "";
    if (dateGiven) {
      var date = new Date(dateGiven);
      retval = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
    return retval;
  };

  /**
   * the keys in this map will be displayed as properties of the same values
   * @param {*} mealSummary
   */
  rowDataDisplay = (mealSummary) => {
    const map = {};
    map["name"] = mealSummary.name;
    map["amount of feeding"] = `${mealSummary.amount_of_feeding} g`;
    map["amount have left"] = `${mealSummary.amount_have_left} g`;
    map["duration untill start"] = `${mealSummary.duration_untill_start} min`;
    map["duration"] = `${mealSummary.duration} min`;
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
