import React, { PureComponent } from "react";
import { View, PanResponder, PanResponderInstance } from "react-native";

import { overlayStyles, siblingStyles } from "./styles";
import { ScrollHandlersLike } from "./shared";

/**
 * 遮罩层属性
 */
export interface OverlayProps extends ScrollHandlersLike {}

/**
 * 遮罩层
 */
export class Overlay extends PureComponent<OverlayProps> {
  private responserInstance: PanResponderInstance;

  constructor(props: OverlayProps) {
    super(props);

    // 创建响应者处理器
    this.responserInstance = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: props.onScroll,
      onPanResponderRelease: props.onScrollEnd,
      onPanResponderTerminate: props.onScrollEnd,
    });
  }

  render() {
    return (
      <View
        style={overlayStyles.container}
        {...this.responserInstance.panHandlers}
      >
        <View style={[siblingStyles.vertical, overlayStyles.beyond]} />
        <View style={overlayStyles.offset2} />
        <View style={overlayStyles.offset1} />
        <View style={overlayStyles.offset0} />
        <View style={overlayStyles.offset1} />
        <View style={overlayStyles.offset2} />
        <View style={[siblingStyles.vertical, overlayStyles.beyond]} />
      </View>
    );
  }
}
