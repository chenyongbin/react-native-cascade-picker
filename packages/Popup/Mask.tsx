import React, { PureComponent } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { MaskProps } from "./shared";

/**
 * 弹窗遮罩
 */
export default class Mask extends PureComponent<MaskProps> {
  render() {
    const {
        align,
        style,
        zIndex,
        backgroundColor = "rgba(0,0,0,0.3)",
      } = this.props,
      containerStyles: ViewStyle[] = [
        styles.container,
        { zIndex, backgroundColor },
      ];

    if (align == "bottom") {
      containerStyles.push({ justifyContent: "flex-end" });
    }

    style && containerStyles.push(style);

    return <View style={containerStyles}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
