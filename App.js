/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import CascadePicker from "./src/CascadePicker";

const getTotalDaysOf = (year, month) => {
  if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) >= 0) {
    return 31;
  } else if ([4, 6, 9].indexOf(month) >= 0) {
    return 30;
  } else {
    return year % 4 == 0 ? 29 : 28;
  }
};

const getDates = (startYear = 2017, endYear = new Date().getFullYear()) => {
  let dates = [],
    year = startYear;
  while (year <= endYear) {
    let months = [],
      month = 1;
    while (month <= 12) {
      let days = [],
        day = 1,
        endDay = getTotalDaysOf(year, month);
      while (day <= endDay) {
        days.push({ text: `${day}日`, value: day });
        day++;
      }

      months.push({ text: `${month}月`, value: month, items: days });
      month++;
    }

    dates.push({ text: `${year}年`, value: year, items: months });
    year++;
  }

  return dates;
};

const App = () => {
  const [visible, setVisible] = useState(false);
  const [{ year, month, day }, setDate] = useState({
    year: 2019,
    month: 9,
    day: 14
  });
  const [dates, setDates] = useState([]);

  // initial dates on component mounted
  useEffect(() => {
    setDates(getDates());
  }, []);

  let picker = null;
  if (visible && dates && dates.length > 0) {
    picker = (
      <CascadePicker
        data={dates}
        pickedValues={[year, month, day]}
        level={3}
        onCancel={() => setVisible(false)}
        onConfirm={([year, month, day]) => {
          setDate({ year, month, day });
          setVisible(false);
        }}
      />
    );
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.date}>{`${year}年${month}月${day}日`}</Text>
          <Button title="点击选择日期" onPress={() => setVisible(true)} />
        </View>
      </View>
      {picker}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    height: "100%"
  },
  date: {
    color: "#333",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  }
});

export default App;
