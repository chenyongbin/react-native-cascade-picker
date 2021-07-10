import React, { Component } from "react";
import { StyleSheet, Animated, Dimensions, Platform } from "react-native";

import Mask from "./Mask";
import {
  PopupWithAnimationProps,
  OnAnimationFinished,
  DefaultAnimationDuration,
} from "./shared";

interface PopupWithAnimationState {
  /**
   * 缩放比例
   */
  scale: Animated.Value;
  /**
   * 底部边距
   */
  marginBottom: Animated.Value;
}

const InitialScale = Platform.OS == "android" ? 0.05 : 0,
  { height: ScreenHeight } = Dimensions.get("window");

/**
 * 带动画弹窗
 */
class PopupWithAnimation extends Component<
  PopupWithAnimationProps & OnAnimationFinished,
  PopupWithAnimationState
> {
  private visibilityAnimation: Animated.CompositeAnimation | undefined;

  constructor(props: PopupWithAnimationProps) {
    super(props);

    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
    this.state = {
      scale: new Animated.Value(InitialScale),
      marginBottom: new Animated.Value(-ScreenHeight),
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  componentDidUpdate(prevProps: PopupWithAnimationProps) {
    if (prevProps.visible != this.props.visible) {
      this.startAnimation(this.props.visible);
    }
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  /**
   * 开始动画
   * @param visible 动画目标，true=不可见变为可见，false=可见变为不可见
   */
  startAnimation(visible = true) {
    const alignCenter = this.props.align == "center",
      { scale, marginBottom } = this.state;

    this.stopAnimation();
    this.visibilityAnimation = Animated.timing(
      alignCenter ? scale : marginBottom,
      {
        duration: this.props.animatedDuration || DefaultAnimationDuration,
        toValue: alignCenter ? (visible ? 1 : 0) : visible ? 0 : -ScreenHeight,
        useNativeDriver: false,
      }
    );
    this.visibilityAnimation.start(({ finished }) => {
      if (finished) {
        const { onAnimationFinished } = this.props;
        onAnimationFinished && onAnimationFinished(visible ? "show" : "hide");
      }
    });
  }

  /**
   * 结束动画
   */
  stopAnimation() {
    if (this.visibilityAnimation) {
      this.visibilityAnimation.stop();
      this.visibilityAnimation = undefined;
    }
  }

  render() {
    const animatedStyles: any[] = [],
      { align, children, ...maskProps } = this.props;

    if (align == "center") {
      animatedStyles.push(styles.animation_center, {
        transform: [{ scale: this.state.scale }],
      });
    } else {
      animatedStyles.push(styles.animation_bottom, {
        marginBottom: this.state.marginBottom,
      });
    }

    return (
      <Mask {...maskProps}>
        <Animated.View style={animatedStyles}>{children}</Animated.View>
      </Mask>
    );
  }
}

const styles = StyleSheet.create({
  animation_center: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  animation_bottom: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

/**
 * 创建带动画弹窗
 */
export default (props: PopupWithAnimationProps) => (
  <PopupWithAnimation {...props} />
);
