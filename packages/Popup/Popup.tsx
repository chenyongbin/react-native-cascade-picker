import React, { Component } from "react";
import { MaskProps } from "./shared";
import Mask from "./Mask";

/**
 * 一般弹窗
 */
class Popup extends Component<MaskProps> {
  render() {
    const { children, ...maskProps } = this.props;
    return <Mask {...maskProps}>{children}</Mask>;
  }
}

/**
 * 创建一般弹窗
 */
export default (props: MaskProps) => <Popup {...props} />;
