import React, { Component } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from "react-native";

export default class Yad2DataDisplay extends Component {
  constructor(props) {
    super(props);
  }

  renderPropertyVal = (key, value, lastElement) => {
    let borderBottomWidth = lastElement ? 0 : 1;
    return (
      <View style={{ ...styles.propertyValContainer, borderBottomWidth }}>
        <View style={{ flex: 0.7 }}>
          <Text style={styles.valueContainer}>{value}</Text>
        </View>
        <View style={styles.keyContainer}>
          <Text style={{ margin: 1, alignSelf: "flex-start", fontSize: 15 }}>{key}</Text>
        </View>
      </View>
    );
  };

  renderRow = (rowData, title, onPress) => {
    const allProperties = [];
    let count = 0;
    const len = Object.keys(rowData).length;
    for (const [key, value] of Object.entries(rowData)) {
      allProperties.push(this.renderPropertyVal(key, value, count + 1 === len));
      count++;
    }

    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.shadowContainer}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleTextStyle}>{title}</Text>
            </View>
            <View>{allProperties.map((cellData) => cellData)}</View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ width: "95%", alignSelf: "center" }}>
        <ScrollView style={{}}>
          {/* {this.props.data.map((row) => {
            return this.renderRow(this.props.rowDataDisplay(row), this.props.getTitle(row), () =>
              this.props.onFilePress(row)
            );
          })} */}
          <FlatList
            {...this.props}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(row) =>
              this.renderRow(this.props.rowDataDisplay(row.item), this.props.getTitle(row.item), () =>
                this.props.onFilePress(row.item)
              )
            }
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  propertyValContainer: {
    flexDirection: "row-reverse",
    padding: 3,
    borderBottomColor: "rgba(128, 128, 128, 0.1)",
    justifyContent: "space-between",
  },
  keyContainer: { flex: 0.7, borderColor: "grey", marginLeft: 5, marginRight: 15 },
  valueContainer: { marginRight: 6, marginLeft: 3, textAlign: "left", fontSize: 15 },
  titleTextStyle: { textAlign: "center", margin: 4, color: "white", fontSize: 20, fontWeight: "bold" },
  titleContainer: { backgroundColor: "rgba(0, 128, 255, 0.7)" },
  shadowContainer: {
    elevation: 2,
    backgroundColor: "white",
    borderColor: "rgba(128, 128, 128, 0.1)",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  container: {
    backgroundColor: "rgba(160, 160, 160, 0.07)",
    borderRadius: 5,
    borderColor: "rgba(160, 160, 160, 1)",
    borderWidth: 1,
  },
});
