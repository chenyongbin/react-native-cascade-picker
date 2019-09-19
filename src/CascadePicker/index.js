import React, { Component } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import ToolBar from "./ToolBar";
import Overlay from "./Overlay";
import Picker from "./Picker";
import { mainStyles, siblingStyles } from "./styles";

/**
 * 级联选择器
 */
export default class CascadePicker extends Component {
  constructor(props) {
    super(props);

    this.pickerParams = [];

    // 初始化state
    this.state = { pickedValues: props.pickedValues };
    for (let i = 0; i < props.pickedValues.length; i++) {
      this.state[`top${i}`] = new Animated.Value(0);
    }
  }

  onMove = (pickerIndex, offsetY) => {
    Animated.event([null, { offsetY: this.state[`top${pickerIndex}`] }])(null, {
      offsetY
    });
  };

  onMoveEnd = (pickerIndex, offsetIndex) => {
    let { pickedValues } = this.state,
      { pickedIndex, values } = this.pickerParams[pickerIndex];

    pickedIndex -= offsetIndex;
    if (pickedIndex < 0) {
      pickedIndex = 0;
    } else if (pickedIndex > values.length - 1) {
      pickedIndex = values.length - 1;
    }

    pickedValues[pickerIndex] = values[pickedIndex];

    this.setState({ pickedValues });
    Animated.timing(this.state[`top${pickerIndex}`], {
      toValue: 0,
      duration: 10
    }).start();
  };

  onConfirm = () => {
    this.props.onConfirm && this.props.onConfirm(this.state.pickedValues);
  };

  render() {
    let { data, itemHeight = 30 } = this.props,
      { pickedValues } = this.state,
      pickers = [],
      overlay = null;

    // 组装Picker
    for (let index = 0; index < pickedValues.length; index++) {
      let pickedValue = pickedValues[index],
        pickedIndex = data.findIndex(d => d.value == pickedValue);

      pickedIndex < 0 && pickedIndex == 0;
      pickers.push(
        <Picker
          key={index}
          items={data}
          top={this.state[`top${index}`]}
          {...{ pickedIndex, itemHeight }}
        />
      );

      this.pickerParams[index] = {
        pickedIndex,
        values: data.map(d => d.value)
      };

      data = (data.filter(d => d.value == pickedValue)[0] || {}).items;
      if (!data || data.length == 0) {
        break;
      }
    }

    if (pickers.length > 0) {
      // 渲染遮罩
      overlay = (
        <Overlay
          pickerCount={pickers.length}
          itemHeight={itemHeight}
          onMove={this.onMove}
          onMoveEnd={this.onMoveEnd}
        />
      );
    }

    return (
      <View style={mainStyles.container}>
        <TouchableOpacity
          style={siblingStyles.vertical}
          onPress={this.props.onCancel}
        />
        <View style={mainStyles.popbox}>
          <ToolBar
            cancelText={this.props.cancelText || "取消"}
            onCancel={this.props.onCancel}
            confirmText={this.props.confirmText || "确认"}
            onConfirm={this.onConfirm}
          />
          <View style={mainStyles.box}>
            {pickers}
            {overlay}
          </View>
        </View>
      </View>
    );
  }
}
