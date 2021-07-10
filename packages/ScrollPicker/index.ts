import { PopupClass, Popup } from "../Popup";

import { ScrollPickerProps } from "./shared";
import { createScrollPicker } from "./ScrollPicker";

export { PopupClass as ScrollPickerInstance };
export {
  FunctionWithPickedValuesLike,
  PickerGroupItemLike as ScrollPickerGroupItemLike,
  PickerGroupLike as ScrollPickerGroupLike,
} from "./shared";
export { PickerGroupItemHeight } from "./styles";

/**
 * 滚动选择器弹窗对象
 */
let scrollPickerPopup: PopupClass | undefined;

/**
 * 销毁弹窗
 */
const destroyScrollPicker = () => {
  if (scrollPickerPopup) {
    scrollPickerPopup.destroy();
    scrollPickerPopup = undefined;
  }
};

/**
 * 启动一个滚动选择器
 * @param options 配置
 */
export const ScrollPicker = (options: ScrollPickerProps) => {
  // 先销毁未置空的变量
  destroyScrollPicker();

  const props = { ...options },
    { onCancel, onOk } = options;

  // 封装标题栏点击处理逻辑
  props.onCancel = (...values: string[]) => {
    destroyScrollPicker();
    onCancel && onCancel(...values);
  };
  props.onOk = (...values: string[]) => {
    destroyScrollPicker();
    onOk && onOk(...values);
  };

  // 创建带动画效果的弹窗
  scrollPickerPopup = Popup(createScrollPicker(props), {
    align: "bottom",
    animated: true,
    animatedDuration: 300,
  });

  return scrollPickerPopup;
};
