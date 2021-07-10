import { StyleSheet } from "react-native";

/**
 * 选择器分组项高度
 */
export const PickerGroupItemHeight = 40;

/**
 * 相邻元素样式
 */
export const siblingStyles = StyleSheet.create({
  horizontal: { flex: 1, height: "100%" },
  vertical: { flex: 1, width: "100%" },
});

/**
 * 滚动选择器样式
 */
export const scrollPickerStyles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
  },
  groups: {
    width: "100%",
    height: 260,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
});

/**
 * 标题栏样式
 */
export const titleBarStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  sapcer: { flex: 1 },
  text: {
    color: "#333",
    fontSize: 17,
  },
  text_blue: {
    color: "#3381e3",
    fontSize: 17,
  },
});

const PickerGroupItemStyleObject = {
  width: "100%",
  height: PickerGroupItemHeight,
};

/**
 * 遮罩样式
 */
export const overlayStyles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
  item: {
    width: "100%",
    height: PickerGroupItemHeight,
  },
  beyond: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  offset0: {
    borderWidth: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    borderColor: "#eee",
    ...PickerGroupItemStyleObject,
  },
  offset1: {
    backgroundColor: "rgba(255,255,255,0.6)",
    ...PickerGroupItemStyleObject,
  },
  offset2: {
    backgroundColor: "rgba(255,255,255,0.9)",
    ...PickerGroupItemStyleObject,
  },
});

/**
 * 选择器分组项样式
 */
export const pickerGroupItemStyles = StyleSheet.create({
  container: {
    ...PickerGroupItemStyleObject,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#333",
    fontSize: 18,
  },
});

/**
 * 选择器分组样式
 */
export const pickerGroupStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
