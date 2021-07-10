import React, { PureComponent } from "react";
import { View, Text } from "react-native";

import { pickerGroupItemStyles } from "./styles";
import { PickerGroupItemLike } from "./shared";

export interface PickerGroupItemProps extends PickerGroupItemLike {}

/**
 * 选择器分组项
 */
export class PickerGroupItem extends PureComponent<PickerGroupItemProps> {
  render() {
    return (
      <View style={pickerGroupItemStyles.container}>
        <Text style={pickerGroupItemStyles.text}>{this.props.title}</Text>
      </View>
    );
  }
}
