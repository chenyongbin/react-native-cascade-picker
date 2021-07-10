import { ViewStyle } from "react-native";

/**
 * 遮罩属性
 */
export interface MaskProps {
  /**
   * 对齐方式
   * 1. center=居中对齐，bottom=底部对齐
   * 2. 默认居中对齐
   */
  align?: "center" | "bottom";
  /**
   * 弹窗zIndex值
   */
  zIndex?: number;
  /**
   * 背景颜色
   */
  backgroundColor?: string;
  /**
   * 自定义背景样式
   * 设置了该属性后，会覆盖前面的属性值，慎用！！！
   */
  style?: ViewStyle;
}

/**
 * 弹窗动画相关属性
 */
export interface AnimationProps {
  /**
   * 控制是显示还是隐藏
   */
  visible?: boolean;
  /**
   * 是否启动动画
   * 1. align=center时，动画效果是从屏幕中间由小变大缓慢出现
   * 2. align=bottom时，动画效果是从屏幕下方缓缓弹出
   */
  animated?: boolean;
  /**
   * 动画时间，默认是400毫秒
   */
  animatedDuration?: number;
}

/**
 * 动画结束接口
 */
export interface OnAnimationFinished {
  /**
   * 动画结束回调方法
   * @param type 当前的动画类型，show=显示，hide=隐藏
   */
  onAnimationFinished?: (type: "show" | "hide") => void;
}

/**
 * 弹窗属性
 */
export type PopupProps = MaskProps & AnimationProps;

/**
 * 弹窗配置
 */
export type PopupOptions = Omit<PopupProps, "visible">;

/**
 * 带有动画效果弹窗属性
 */
export type PopupWithAnimationProps = MaskProps & AnimationProps;

/**
 * 默认动画时间，400毫秒
 */
export const DefaultAnimationDuration = 400;
