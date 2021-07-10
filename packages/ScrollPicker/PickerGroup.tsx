import React, { PureComponent } from "react";
import { Animated } from "react-native";

import { pickerGroupStyles } from "./styles";
import { PickerGroupLike, PickerGroupItemLike } from "./shared";
import { PickerGroupItem } from "./PickerGroupItem";

export interface PickerGroupProps extends PickerGroupLike {
  /**
   * 顶部偏移量
   */
  top: Animated.Value;
}

const defaultPickerGroupItemObject: PickerGroupItemLike = {
  title: "",
  value: "",
};

/**
 * 选择器分组
 */
export class PickerGroup extends PureComponent<PickerGroupProps> {
  render() {
    const { data, picked, top } = this.props,
      items = [...data];
    let pickedIndex = items.findIndex((d) => d.value == picked);
    pickedIndex < 0 && (pickedIndex = 0);

    /**
     * 整理子项集合
     * 1) 使其上下对称
     * 2）使选中项居中显示
     */
    while (pickedIndex < Math.ceil((items.length - 1) / 2)) {
      items.unshift(defaultPickerGroupItemObject);
      pickedIndex++;
    }
    while (pickedIndex > Math.floor((items.length - 1) / 2)) {
      items.push(defaultPickerGroupItemObject);
    }
    while (items.length < 5) {
      items.unshift(defaultPickerGroupItemObject);
      items.push(defaultPickerGroupItemObject);
      pickedIndex++;
    }

    return (
      <Animated.View style={[pickerGroupStyles.container, { top }]}>
        {items.map((item, i) => (
          <PickerGroupItem key={i} {...item} />
        ))}
      </Animated.View>
    );
  }
}
