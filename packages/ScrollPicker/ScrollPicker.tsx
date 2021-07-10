import React, { ReactElement, Component } from "react";
import {
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";

import {
  siblingStyles,
  scrollPickerStyles,
  PickerGroupItemHeight,
} from "./styles";
import {
  ScrollPickerProps,
  PickerGroupLike,
  ScrollHandlersLike,
} from "./shared";
import { DefaultTitleBar } from "./DefaultTitleBar";
import { Overlay } from "./Overlay";
import { PickerGroup } from "./PickerGroup";

interface ScrollPickerState {
  /**
   * 渲染id
   */
  renderId: number;
}

/**
 * 滚动选择器
 */
class ScrollPicker
  extends Component<ScrollPickerProps, ScrollPickerState>
  implements ScrollHandlersLike {
  /**
   * 选择器分组各个分组的top值
   */
  private groupTopList: Animated.Value[] = [];
  /**
   * 当前滚动的选择器分组索引
   */
  private scrollGroupIndex = 0;
  /**
   * 选择器分组数据
   */
  private groupList: PickerGroupLike[] = [];
  /**
   * 选中的值
   */
  private pickedValues: string[] = [];
  /**
   * 屏幕宽度
   */
  private screenWidth = Dimensions.get('window').width;

  constructor(props: ScrollPickerProps) {
    super(props);
    this.state = { renderId: 0 };

    this.onOk = this.onOk.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);
  }

  /**
   * 点击确认时
   */
  private onOk() {
    this.props.onOk && this.props.onOk(...this.pickedValues);
  }

  /**
   * 点击取消时
   */
  private onCancel() {
    this.props.onCancel && this.props.onCancel(...this.pickedValues);
  }

  /**
   * 滚动时
   * @param e
   * @param gestureState
   */
  onScroll(e: GestureResponderEvent, gestureState: PanResponderGestureState) {
    const { x0, dy } = gestureState,
      groupCount = this.groupList.length;

    // 检查是在哪个分组滚动
    let groupIndex = Math.floor(x0 / (this.screenWidth / groupCount));
    groupIndex == groupCount && groupIndex--;
    this.scrollGroupIndex = groupIndex;

    // 更新对应分组的动画参数
    if (groupIndex >= 0 && groupIndex < this.groupTopList.length) {
      Animated.event([null, { dy: this.groupTopList[groupIndex] }], {
        useNativeDriver: false,
      })(null, { dy });
    }
  }

  /**
   * 滚动结束时
   * @param e
   * @param gestureState
   */
  onScrollEnd(
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) {
    const { dy } = gestureState,
      offsetIndex = Math.round(dy / PickerGroupItemHeight);

    if (this.scrollGroupIndex < this.groupList.length) {
      // 计算滚动了多少项
      const pickerGroup = this.groupList[this.scrollGroupIndex],
        maxPickedIndex = pickerGroup.data.length - 1;
      let pickedIndex = pickerGroup.data.findIndex(
        (d) => d.value == pickerGroup.picked
      );
      pickedIndex < 0 && (pickedIndex = 0);

      pickedIndex -= offsetIndex;
      if (pickedIndex < 0) {
        pickedIndex = 0;
      } else if (pickedIndex > maxPickedIndex) {
        pickedIndex = maxPickedIndex;
      }

      // 记录、更新所有选中项的值
      this.pickedValues[this.scrollGroupIndex] =
        pickerGroup.data[pickedIndex].value;
    }

    // 重新渲染
    this.setState({ renderId: Date.now() });

    // 校正滚动偏移量，使选中项居中
    if (
      this.scrollGroupIndex >= 0 &&
      this.scrollGroupIndex < this.groupTopList.length
    ) {
      Animated.timing(this.groupTopList[this.scrollGroupIndex], {
        toValue: 0,
        duration: 10,
        useNativeDriver: false,
      }).start();
    }
  }

  render() {
    const { okText, cancelText, renderTitleBar, renderData } = this.props,
      groups: PickerGroupLike[] = [];
    let isRenderByFunction = false,
      titleBarComponent: ReactElement | undefined;

    // 生成数据
    if (typeof renderData == "function") {
      isRenderByFunction = true;
      groups.push(...renderData(...this.pickedValues));
    } else {
      groups.push(...renderData);
    }

    // 更新分组数据
    this.groupList = [...groups];

    if (this.pickedValues.length > 0) {
      // 已有选中项的值时，更新各个分组选中项的值
      for (let i = 0; i < this.groupList.length; i++) {
        const group = this.groupList[i];
        if (isRenderByFunction) {
          // 渲染数据来自自定义方法时，除了滑动结束时的分组，其他分组的选中值都使用自定义方法中指定的值
          if (this.scrollGroupIndex == i) {
            continue;
          }
          this.pickedValues[i] = group.picked;
        } else {
          // 更新各个分组选中项的值
          const picked = this.pickedValues[i];
          if (group.data.findIndex((d) => d.value == picked) >= 0) {
            group.picked = picked;
          }
        }
      }
    } else {
      // 没有选中项的值时，根据初始的选中项的值初始该变量
      this.pickedValues = this.groupList.map((g) => g.picked);
    }

    // 更新各个分组动画参数
    if (this.groupList.length != this.groupTopList.length) {
      this.groupTopList = [];
      this.groupList.forEach(() =>
        this.groupTopList.push(new Animated.Value(0))
      );
    }

    // 标题栏
    if (renderTitleBar) {
      titleBarComponent = renderTitleBar(...this.pickedValues);
    } else {
      titleBarComponent = (
        <DefaultTitleBar
          okText={okText}
          cancelText={cancelText}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      );
    }

    return (
      <>
        <TouchableOpacity
          style={siblingStyles.vertical}
          onPress={this.onCancel}
        />
        <View style={scrollPickerStyles.container}>
          {titleBarComponent}
          <View style={scrollPickerStyles.groups}>
            {this.groupList.map((group, i) => (
              <PickerGroup key={i} {...group} top={this.groupTopList[i]} />
            ))}
            <Overlay onScroll={this.onScroll} onScrollEnd={this.onScrollEnd} />
          </View>
        </View>
      </>
    );
  }
}

/**
 * 创建滚动选择器组件
 * @param props 属性
 */
export const createScrollPicker = (props: ScrollPickerProps) => (
  <ScrollPicker {...props} />
);
