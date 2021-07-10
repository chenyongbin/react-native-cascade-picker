import React, { PureComponent } from "react";
import { View,Text, TouchableOpacity } from "react-native";


import { titleBarStyles } from "./styles";
import { TitleBarLike } from "./shared";

/**
 * 默认标题栏属性
 */
export interface DefaultTitleBarProps extends TitleBarLike {}

/**
 * 默认标题栏
 */
export class DefaultTitleBar extends PureComponent<DefaultTitleBarProps> {
  render() {
    return (
      <View style={titleBarStyles.container}>
        <TouchableOpacity activeOpacity={0.7} onPress={this.props.onCancel}>
          <Text style={titleBarStyles.text}>
            {this.props.cancelText || "取消"}
          </Text>
        </TouchableOpacity>
        <View style={titleBarStyles.sapcer} />
        <TouchableOpacity activeOpacity={0.7} onPress={this.props.onOk}>
          <Text style={titleBarStyles.text_blue}>
            {this.props.okText || "确认"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
