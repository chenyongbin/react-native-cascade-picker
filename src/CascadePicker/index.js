import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions
} from "react-native";
import ToolBar from "./ToolBar";
import Overlay from "./Overlay";
import Picker from "./Picker";
import { mainStyles, siblingStyles } from "./styles";

const PICKER_ITEM_HEIGHT = 30,
  SCRREN_WIDTH = Dimensions.get("window").width;

/**
 * 级联选择器
 */
export default class CascadePicker extends Component {
  constructor(props) {
    super(props);

    // 创建响应者处理器
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: this.onPanResponderBegin,
      onPanResponderRelease: this.onPanResponderEnd,
      onPanResponderTerminate: this.onPanResponderEnd
    });

    // 初始化响应者参数
    this._panResponderParams = {
      pickerCount: 0,
      pickerIndex: 0,
      pickerWidth: 0,
      pickers: []
    };
    // 初始化选择器子项高度
    this.pickerItemHeight = PICKER_ITEM_HEIGHT;

    // 初始化state
    this.state = { pickedValues: props.pickedValues };
    for (let i = 0; i < props.level; i++) {
      this.state[`top${i}`] = new Animated.Value(0);
    }
  }

  /**
   * 响应开始时
   */
  onPanResponderBegin = (evt, gestureState) => {
    let { x0, dy } = gestureState,
      { pickerWidth, pickerCount } = this._panResponderParams,
      index = Math.floor(x0 / pickerWidth);
    index == pickerCount && index--;
    this._panResponderParams.pickerIndex = index;

    Animated.event([null, { dy: this.state[`top${index}`] }])(null, { dy });
  };

  /**
   * 响应结束时
   */
  onPanResponderEnd = (evt, gestureState) => {
    let { pickerIndex, pickers } = this._panResponderParams,
      { pickedValues } = this.state,
      { pickedIndex, values } = pickers[pickerIndex],
      offsetIndex = Math.round(gestureState.dy / this.pickerItemHeight);

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
    let {
        data,
        level,
        cancelText = "取消",
        onCancel,
        confirmText = "确定",
        pickerItemHeight = this.pickerItemHeight
      } = this.props,
      { pickedValues } = this.state,
      levelIndex = 0,
      pickers = [],
      overlay = null;

    // 组装Picker
    while (levelIndex < level && levelIndex < pickedValues.length) {
      let pickedValue = pickedValues[levelIndex],
        pickedIndex = data.findIndex(d => d.value == pickedValue);

      pickedIndex < 0 && pickedIndex == 0;
      pickers.push(
        <Picker
          key={levelIndex}
          items={data}
          pickedIndex={pickedIndex}
          itemHeight={pickerItemHeight}
          top={this.state[`top${levelIndex}`]}
        />
      );
      this._panResponderParams.pickers[levelIndex] = {
        pickedIndex,
        values: data.map(d => d.value)
      };

      data = (data.filter(d => d.value == pickedValue)[0] || {}).items;
      if (!data || data.length == 0) {
        break;
      }

      levelIndex++;
    }

    if (pickers.length > 0) {
      this.pickerItemHeight = pickerItemHeight;
      // 计算选择器数量和宽度
      this._panResponderParams.pickerCount = pickers.length;
      this._panResponderParams.pickerWidth = SCRREN_WIDTH / pickers.length;
      // 渲染遮罩
      overlay = (
        <Overlay
          itemHeight={pickerItemHeight}
          panHandlers={this._panResponder.panHandlers}
        />
      );
    }

    return (
      <View style={mainStyles.container}>
        <TouchableOpacity style={siblingStyles.vertical} onPress={onCancel} />
        <View style={mainStyles.popbox}>
          <ToolBar
            {...{
              cancelText,
              onCancel,
              confirmText,
              onConfirm: this.onConfirm
            }}
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
