import React, { PureComponent } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { toolbarStyles, siblingStyles } from "./styles";

/**
 * 工具条
 */
export default class ToolBar extends PureComponent {
  render() {
    return (
      <View style={toolbarStyles.container}>
        <TouchableOpacity
          style={toolbarStyles.button}
          activeOpacity={0.9}
          onPress={this.props.onCancel}
        >
          <Text style={toolbarStyles.button_text}>{this.props.cancelText}</Text>
        </TouchableOpacity>
        <View style={siblingStyles.horizontal} />
        <TouchableOpacity
          style={toolbarStyles.button}
          activeOpacity={0.9}
          onPress={this.props.onConfirm}
        >
          <Text style={toolbarStyles.button_text}>
            {this.props.confirmText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
