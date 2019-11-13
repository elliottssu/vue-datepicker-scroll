# vue-datepicker-scroll

移动端简约的可滑动时间选择组件，支持同时选择日期和时间。

## Install

```bash
npm install vue-datepicker-scroll
```

## Quick Start

### import
```javascript
// src/main.js
import Vue from 'vue'
import App from './App.vue'

import DatePickerScroll from "../packages";
Vue.use(DatePickerScroll)

...

```

### demo
```javascript
// src/components/HelloWorld

<template>
  <div>
    <button @click="isPickerVisable=true">点击我选择</button>
    <p>{{selectedTime}}</p>

    <date-picker-scroll
      v-model="selectedTime"
      startDate="2019-11-10"
      endDate="2019-11-25"
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
| startDate           | String          | null            |  yyyy-mm-dd 开始日期 默认：今天的前10天 格式：2019-11-11     |
| endDate             | String          | null            |  yyyy-mm-dd 结束日期 默认：今天的后10天 格式：2019-11-12 结束时间一定要大于等于开始时间 |
| visibleCount        | Number          | 5               |  显示的个数 默认：5         |
| value               | Date            | new Date()      |  选中时间 默认:当前时间      |
| onCancel            | Function        | null            |  取消事件                  |
| onConfirm           | Function        | null            |  确定事件                  |
| onChange            | Function        | true            |  滑动元素变化事件           |
