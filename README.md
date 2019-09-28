# react-native-cascade-picker

react-native 级联选择器

## demo

![演示图](./images/picker.gif "演示图")

## introduction  

- 该组件使用两层叠加`View`组合一起实现滚动渐变动画  
- 顶层`View`作为遮罩层，垂直等分为5格，每格的颜色和透明度不一样，以此模拟渐变色效果  
- 底层`View`作为数据渲染层，根据选中项动态组装子项，目标是使选择器子项上下对称，选中项刚好居中显示  
- 滑动动画效果是基于`PanResponder`和`Animated`类实现。顶层`View`注册`PanResponder`并捕获滑动开始结束时手指的位移，然后根据此位移值动态更新底层`View`的`top`样式属性值

## props

- `cancelText` 取消按钮名称，默认是取消
- `confirmText` 确认按钮名称，默认是确认
- `onCancel` 取消按钮点击处理函数
- `onConfirm` 确认按钮点击处理函数
- `itemHeight` 选择器子项的高度，默认是 30
- `data` 数据源
- `pickedValues` 选中数组项

其中`data`属性格式需遵循如下格式：

```javascript
[
  {
    text: "2019年",
    value: 2019,
    items: [
      {
        text: "1月",
        value: 1,
        items: [
            { text: "1日", value: 1 }, 
            { text: "2日", value: 2 }
        ]
      },
      {
        text: "2月",
        value: 2,
        items: [
            { text: "1日", value: 1 }, 
            { text: "2日", value: 2 }
        ]
      }
    ]
  }
];
```  

其中`pickedValues`中的选中值是取自`data`中的`value`值
