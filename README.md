# vue-datepicker-scroll

<p>
  <a href="https://circleci.com/gh/vuejs/vue/tree/dev"><img src="https://img.shields.io/circleci/project/github/vuejs/vue/dev.svg" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/v/vue.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
</p>


移动端简约的可滑动时间选择组件，支持同时选择日期和时间。

预览效果如下：

![demo](https://github.com/Elliottssu/vue-datepicker-scroll/blob/master/examples/assets/demo1.gif)

## Tips

该组件请在vue移动端使用，请先定义startDate和endDate变量（2019-11-11）格式的时间区间（也可以不传，分别为今天的前10天和后10天），最终返回的是时间格式的选中变量。具体参数请查看下方**Options**配置。

YYYY-MM-DD格式的时间，您可以使用dayjs或者moment.js格式化一下即可。

## Install

```bash
npm install vue-datepicker-scroll
```

## How to use?

### 1. 在main.js注册
```javascript
// src/main.js
import Vue from 'vue'
import App from './App.vue'

import DatePickerScroll from "vue-datepicker-scroll";
Vue.use(DatePickerScroll)

···

```

### 2. 在组件中使用date-picker-scroll
```javascript
// src/components/HelloWorld

<template>
  <div>
    <button @click="isPickerVisable=true">点击我选择</button>
    <p>{{selectedTime}}</p>

    <date-picker-scroll
      v-model="selectedTime"
      startDate="2019-11-10" // 不传的话为今天的前10天
      endDate="2019-11-25"   // 不传的话为今天的后10天
      :visible.sync="isPickerVisable"
      :onConfirm="handelConfirm"
    ></date-picker-scroll>

  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      isPickerVisable: false,
      selectedTime: new Date()
    };
  },
  methods: {
    handelConfirm(value) {
      this.selectedTime = value;
      console.log(this.selectedTime);
    }
  }
};
</script>
```

## Options
| Option              | Type            | Defult          |  Comment                |
| -------------       | -------------   | ----------      |-------------------      |
| visible             | Boolean         | false           | 显示或隐藏 默认：隐藏       |
| cancelText          | String          | '取消'           | 取消按钮文本 默认：取消     |
| confirmText         | String          | '确认'           | 确定按钮文本 默认：确认     |
| titleText           | String          | '请选择'         | 标题文本 默认：请选择       |
| startDate           | String          | 今天的前10天     |  YYYY-MM-DD 开始日期 默认：今天的前10天 格式：2019-11-11     |
| endDate             | String          | 今天的后10天      |  YYYY-MM-DD 结束日期 默认：今天的后10天 格式：2019-11-12 结束时间一定要大于等于开始时间 |
| visibleCount        | Number          | 5               |  显示的个数 默认：5         |
| value               | Date            | new Date()      |  选中时间 默认:当前时间      |
| onCancel            | Function        | null            |  取消事件                  |
| onConfirm           | Function        | null            |  确定事件                  |
| onChange            | Function        | null            |  滑动元素变化事件           |


## Need demo?

You can also run this project, get a simple demo.

```bash
npm install
npm run serve
```

You can open `http://localhost:8080/ `in your browser.

## Contributing
Contributing Feel free to submit any fixes or propose any additional functionality via pull request or issue, making sure any changes take place in /src.

## License
[MIT](https://github.com/Elliottssu/vue-datepicker-scroll/blob/master/LICENSE)
