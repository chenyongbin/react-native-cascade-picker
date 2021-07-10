import { ReactElement } from "react";
import RootSibling from "react-native-root-siblings";

import { PopupProps, PopupOptions, OnAnimationFinished } from "./shared";
import createPopup from "./Popup";
import createPopupWithAnimation from "./Popup.Animation";

/**
 * 弹窗
 */
interface PopupLike {
  /**
   * 销毁
   */
  destroy(): void;
}

/**
 * 弹窗类
 */
class PopupClass implements PopupLike {
  private popupSibling: RootSibling | undefined;
  private mergedProps: PopupProps & OnAnimationFinished = {};

  /**
   * 构造函数
   * @param children 弹窗内容
   * @param props 属性
   */
  constructor(private children: ReactElement, private props?: PopupProps) {
    // 合并属性
    props = Object.assign({}, props, { children });
    props.align = props.align || "center";
    props.visible = true;
    this.mergedProps = props;

    if (props.animated) {
      this.popupSibling = new RootSibling(createPopupWithAnimation(props));
    } else {
      this.popupSibling = new RootSibling(createPopup(props));
    }

    this.destroy = this.destroy.bind(this);
    this.destroySibling = this.destroySibling.bind(this);
    this.hidePopupWithAnimation = this.hidePopupWithAnimation.bind(this);
  }

  private destroySibling() {
    if (this.popupSibling) {
      this.popupSibling.destroy();
      this.popupSibling = undefined;
    }
  }

  private hidePopupWithAnimation() {
    if (this.popupSibling) {
      this.mergedProps.visible = false;
      this.mergedProps.onAnimationFinished = (type) => this.destroySibling();
      this.popupSibling.update(createPopupWithAnimation(this.mergedProps));
    }
  }

  /**
   * 销毁
   */
  destroy() {
    if (this.props && this.props.animated) {
      this.hidePopupWithAnimation();
    } else {
      this.destroySibling();
    }
  }
}

/**
 * 创建一个弹窗
 * @param children 弹窗内容
 * @param props 该弹窗的一些配置
 * @returns 弹窗实例，可通过其destroy方法关闭弹窗
 */
const Popup = (children: ReactElement, options?: PopupOptions) =>
  new PopupClass(children, options);

export { PopupLike as PopupClass, Popup };
