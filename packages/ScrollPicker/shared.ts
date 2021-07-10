import { ReactElement } from "react";
import { GestureResponderEvent, PanResponderGestureState } from "react-native";

/**
 * 滚动事件处理器接口
 */
export interface ScrollEventHandlerLike {
  /**
   * 滚动事件处理器接口
   */
  (e: GestureResponderEvent, gestureState: PanResponderGestureState): void;
}

/**
 * 滚动处理方法接口
 */
export interface ScrollHandlersLike {
  /**
   * 滚动时
   */
  onScroll: ScrollEventHandlerLike;
  /**
   * 滚动结束时
   */
  onScrollEnd: ScrollEventHandlerLike;
}

/**
 * 选择器分组项接口
 * 1. 定义选择器中最基本单元的结构
 * 2. `title`，标题，用来在页面上展示
 * 3. `value`，选择值，用来识别同一组中的具体选项值
 */
export interface PickerGroupItemLike {
  /**
   * 标题，用来在页面上展示
   */
  title: string;
  /**
   * 选择值，同一组中必须确保是唯一的，用来识别同一组中的具体选项值
   */
  value: string;
}

/**
 * 选择器分组接口
 * 1. 定义一列同类别的选择项
 * 2. `data`，数据，保存该组所有的选择项
 * 3. `picked`，选中项，即该分组选择项的值（即`value`）
 */
export interface PickerGroupLike {
  /**
   * 数据，保存该组所有的选择项
   */
  data: PickerGroupItemLike[];
  /**
   * 选中项，即该分组选择项的值（即`value`）
   */
  picked: string;
}

/**
 * 带有选择器分组的选中项值的函数
 */
export interface FunctionWithPickedValuesLike<T> {
  /**
   * 带有选择器分组的选中项值的函数
   * 1. 该方法会回传各个选择器分组的选中项的值
   * 2. 参数顺序和选择器分组从左到右的排列顺序一致
   */
  (...pickedValues: string[]): T;
}

/**
 * 标题栏接口
 */
export interface TitleBarLike {
  /**
   * 取消按钮文字，默认是`取消`
   */
  cancelText?: string;
  /**
   * 确认按钮文字，默认是`确认`
   */
  okText?: string;
  /**
   * 点击`取消`按钮时的回调方法
   */
  onCancel?: () => void;
  /**
   * 点击`确认`按钮时的回调方法
   */
  onOk?: () => void;
}

/**
 * 滚动选择器属性
 */
export interface ScrollPickerProps extends TitleBarLike {
  /**
   * 选择分组数据
   * 1. 要显示的选择分组数据
   * 2. 可以是`PickerGroupLike[]`类型
   * 3. 也可以是一个返回类型是`PickerGroupLike[]`的方法，该方法是当前各个分组的选中项的值
   */
  renderData:
    | PickerGroupLike[]
    | FunctionWithPickedValuesLike<PickerGroupLike[]>;
  /**
   * 点击`取消`按钮时的回调方法
   */
  onCancel?: FunctionWithPickedValuesLike<void>;
  /**
   * 点击`确认`按钮时的回调方法
   */
  onOk?: FunctionWithPickedValuesLike<void>;
  /**
   * 自定义标题栏的方法
   * 1. 使用该方法时，默认标题栏的配置均将失效
   * 2. 默认标题栏配置有`cancelText`、`okText`、`onCancel`、`onOk`
   */
  renderTitleBar?: FunctionWithPickedValuesLike<ReactElement>;
}
