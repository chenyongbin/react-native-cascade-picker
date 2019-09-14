import React, { PureComponent } from "react";
import { View, PanResponder } from "react-native";
import { overlayStyles, siblingStyles } from "./styles";

/**
 * 遮罩
 */
export default class Overlay extends PureComponent {
  render() {
    let { itemHeight, panHandlers } = this.props,
      itemStyle = Object.assign({}, overlayStyles.item, { height: itemHeight });

    return (
      <View style={overlayStyles.container} {...panHandlers}>
        <View style={[siblingStyles.vertical, overlayStyles.siblingY]} />
        <View style={[overlayStyles.offset2, itemStyle]} />
        <View style={[overlayStyles.offset1, itemStyle]} />
        <View style={[overlayStyles.offset0, itemStyle]} />
        <View style={[overlayStyles.offset1, itemStyle]} />
        <View style={[overlayStyles.offset2, itemStyle]} />
        <View style={[siblingStyles.vertical, overlayStyles.siblingY]} />
      </View>
    );
  }
}
