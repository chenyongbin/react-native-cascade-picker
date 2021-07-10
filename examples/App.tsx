import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  ScrollPicker,
  ScrollPickerInstance,
  ScrollPickerGroupLike,
  ScrollPickerGroupItemLike,
} from "../packages/ScrollPicker";

const ThisYear = new Date().getFullYear();

interface AppState {
  /**
   * 单组选择器选中项的值
   */
  singlePickedValues: string[];
  /**
   * 多组选择器选中项的值
   */
  mutiplePickedValues: string[];
  /**
   * 多组选择器选中项的值
   */
  mutipleCascadePickedValues: string[];
  /**
   * 自定义标题栏
   */
  customTitleBarPickedValues: string[];
}

export default class App extends Component<any, AppState> {
  private scrollPickerWithCustomTitleBar: ScrollPickerInstance | undefined;
  private lastPickedMonth: string | undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      singlePickedValues: [],
      mutiplePickedValues: [],
      mutipleCascadePickedValues: [],
      customTitleBarPickedValues: [],
    };
  }

  onPressSingle = () => {
    const start = 2015,
      end = new Date().getFullYear(),
      pickerGroupItems: ScrollPickerGroupItemLike[] = [],
      renderData: ScrollPickerGroupLike[] = [];

    for (let i = end; i >= start; i--) {
      pickerGroupItems.push({ title: `${i}年`, value: i.toString() });
    }
    renderData.push({
      data: pickerGroupItems,
      picked: this.state.singlePickedValues[0] || end.toString(),
    });

    ScrollPicker({
      renderData,
      onCancel: (...singlePickedValues: string[]) => {
        console.log("SinglePicker.onCancel", ...singlePickedValues);
      },
      onOk: (...singlePickedValues: string[]) => {
        console.log("SinglePicker.onOk", ...singlePickedValues);
        this.setState({ singlePickedValues });
      },
    });
  };

  onPressMutiple = () => {
    const renderData: ScrollPickerGroupLike[] = [],
      { mutiplePickedValues } = this.state,
      familyNames = ["陈", "张", "李", "欧阳", "赵", "蒯"],
      middleNames = [
        "丽",
        "春",
        "阳",
        "九",
        "勇",
        "翰",
        "兴",
        "兆",
        "周",
        "宁",
        "笋",
        "劳",
      ],
      lastNames = [
        "花",
        "彬",
        "强",
        "天",
        "洪",
        "离",
        "彻",
        "芬",
        "玲",
        "中",
        "丫",
        "非",
      ];
    let pickerGroupItems: ScrollPickerGroupItemLike[] = [];

    // 姓氏
    familyNames.forEach((v) => pickerGroupItems.push({ title: v, value: v }));
    renderData.push({
      data: pickerGroupItems,
      picked: mutiplePickedValues[0] || familyNames[0],
    });

    // 中间一个字
    pickerGroupItems = [];
    middleNames.forEach((v) => pickerGroupItems.push({ title: v, value: v }));
    renderData.push({
      data: pickerGroupItems,
      picked:
        (mutiplePickedValues.length > 1 ? mutiplePickedValues[1] : undefined) ||
        middleNames[0],
    });

    // 最后一个字
    pickerGroupItems = [];
    lastNames.forEach((v) => pickerGroupItems.push({ title: v, value: v }));
    renderData.push({
      data: pickerGroupItems,
      picked:
        (mutiplePickedValues.length > 2 ? mutiplePickedValues[2] : undefined) ||
        lastNames[0],
    });

    ScrollPicker({
      renderData,
      onCancel: (...mutiplePickedValues: string[]) => {
        console.log("MutiplePicker.onCancel", ...mutiplePickedValues);
      },
      onOk: (...mutiplePickedValues: string[]) => {
        console.log("MutiplePicker.onOk", ...mutiplePickedValues);
        this.setState({ mutiplePickedValues });
      },
    });
  };

  getYears = (from = 2015) => {
    const years: number[] = [];

    if (from <= ThisYear) {
      for (let i = ThisYear; i >= from; i--) {
        years.push(i);
      }
    }

    return years;
  };

  getMonths = (year = ThisYear) => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  };

  getDays = (year = ThisYear, month = 1) => {
    const days: number[] = [];

    let lastDay = 31;
    if (month == 2) {
      lastDay = year % 4 == 0 ? 29 : 28;
    } else if ([4, 6, 9, 10, 11].indexOf(month) >= 0) {
      lastDay = 30;
    }

    for (let i = 1; i <= lastDay; i++) {
      days.push(i);
    }

    return days;
  };

  renderMutipleCascadePickerData = (
    ...mutipleCascadePickedValues: string[]
  ) => {
    const renderData: ScrollPickerGroupLike[] = [],
      [stateYear, stateMonth, stateDay] = this.state.mutipleCascadePickedValues,
      [
        year = stateYear,
        month = stateMonth,
        day = stateDay,
      ] = mutipleCascadePickedValues;

    const years = this.getYears(),
      pickedYear = year || ThisYear.toString();
    renderData.push({
      picked: pickedYear,
      data: years.map((v) => ({ title: `${v}年`, value: v.toString() })),
    });

    const months = this.getMonths(Number(pickedYear)),
      pickedMonth = month || (new Date().getMonth() + 1).toString();
    renderData.push({
      picked: pickedMonth,
      data: months.map((v) => ({ title: `${v}月`, value: v.toString() })),
    });

    const days = this.getDays(Number(pickedYear), Number(pickedMonth)),
      pickedDay =
        this.lastPickedMonth && this.lastPickedMonth != month
          ? "1"
          : day || new Date().getDate().toString();

    renderData.push({
      picked: pickedDay,
      data: days.map((v) => ({ title: `${v}日`, value: v.toString() })),
    });

    this.lastPickedMonth = month;

    return renderData;
  };

  onPressMutipleCascade = () => {
    ScrollPicker({
      renderData: this.renderMutipleCascadePickerData,
      onCancel: (...mutipleCascadePickedValues: string[]) => {
        console.log(
          "MutipleCascadePicker.onCancel",
          ...mutipleCascadePickedValues
        );
      },
      onOk: (...mutipleCascadePickedValues: string[]) => {
        console.log("MutipleCascadePicker.onOk", ...mutipleCascadePickedValues);
        this.setState({ mutipleCascadePickedValues });
      },
    });
  };

  onPressDrop = (...pickedValues: string[]) => {
    console.log("CustomTitleBar.Drop", ...pickedValues);
    this.scrollPickerWithCustomTitleBar &&
      this.scrollPickerWithCustomTitleBar.destroy();
  };

  onPressSelected = (...customTitleBarPickedValues: string[]) => {
    console.log("CustomTitleBar.Selected", ...customTitleBarPickedValues);
    this.setState({ customTitleBarPickedValues });
    this.scrollPickerWithCustomTitleBar &&
      this.scrollPickerWithCustomTitleBar.destroy();
  };

  renderCustomTitleBar = (...pickedValues: string[]) => {
    return (
      <View style={titleBarStyles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.onPressDrop(...pickedValues)}
        >
          <Text style={titleBarStyles.text}>放弃</Text>
        </TouchableOpacity>
        <View style={titleBarStyles.mid}>
          <Text style={titleBarStyles.mid_text}>
            请选择一个你想穿越回去的年份
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.onPressSelected(...pickedValues)}
        >
          <Text style={titleBarStyles.text_blue}>选好了</Text>
        </TouchableOpacity>
      </View>
    );
  };

  onPressCustomTitleBar = () => {
    const start = 1915,
      end = 1980,
      pickerGroupItems: ScrollPickerGroupItemLike[] = [],
      renderData: ScrollPickerGroupLike[] = [];

    for (let i = end; i >= start; i--) {
      pickerGroupItems.push({ title: `${i}年`, value: i.toString() });
    }
    renderData.push({
      data: pickerGroupItems,
      picked: this.state.customTitleBarPickedValues[0] || end.toString(),
    });

    this.scrollPickerWithCustomTitleBar = ScrollPicker({
      renderData,
      renderTitleBar: this.renderCustomTitleBar,
      onCancel: (...customTitleBarPickedValues: string[]) => {
        console.log(
          "CustomTitleBarPicker.onCancel",
          ...customTitleBarPickedValues
        );
      },
      onOk: (...customTitleBarPickedValues: string[]) => {
        console.log("CustomTitleBarPicker.onOk", ...customTitleBarPickedValues);
        this.setState({ customTitleBarPickedValues });
      },
    });
  };

  /**
   *
   * @param title 标题
   * @param onPress 点按
   * @returns
   */
  renderButton = (title: string, onPress: () => void) => {
    return (
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btn_text}>{title}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.box}>
        <View style={styles.spacer_20} />
        <Text style={styles.text}>
          {this.state.singlePickedValues.map((v) => v).join(",")}
        </Text>
        <View style={styles.spacer_5} />

        {this.renderButton("单组选择器", this.onPressSingle)}

        <View style={styles.spacer_20} />
        <Text style={styles.text}>
          {this.state.mutiplePickedValues.map((v) => v).join("")}
        </Text>
        <View style={styles.spacer_5} />
        {this.renderButton("多组选择器", this.onPressMutiple)}

        <View style={styles.spacer_20} />
        <Text style={styles.text}>
          {this.state.mutipleCascadePickedValues.map((v) => v).join("-")}
        </Text>
        <View style={styles.spacer_5} />
        {this.renderButton("多组级联选择器", this.onPressMutipleCascade)}

        <View style={styles.spacer_20} />
        <Text style={styles.text}>
          {this.state.customTitleBarPickedValues.map((v) => v).join("")}
        </Text>
        <View style={styles.spacer_5} />
        {this.renderButton("自定义标题栏", this.onPressCustomTitleBar)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  box: {
    paddingTop: 100,
    alignItems: "center",
  },
  text: {
    color: "#333",
    fontSize: 16,
  },
  spacer_20: {
    width: "100%",
    height: 20,
  },
  spacer_5: {
    width: "100%",
    height: 5,
  },
  btn: {
    minWidth: 50,
    height: 40,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3381E3",
    borderRadius: 4,
  },
  btn_text: {
    color: "#fff",
    fontSize: 14,
  },
});

const titleBarStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  mid: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mid_text: {
    color: "#999",
    fontSize: 13,
  },
  text: {
    color: "#333",
    fontSize: 17,
  },
  text_blue: {
    color: "#3381e3",
    fontSize: 17,
  },
});
