<template>
  <div class="picker">
    <transition name="fade">
      <div class="mask" v-show="visible" @click="handleCancel"></div>
    </transition>
    <transition name="slide">
      <div class="picker-content" v-show="visible" ref="content">
        <!-- 遮罩打开关闭区域 -->
        <div class="picker-control">
          <a
            href="javascript:void(0);"
            class="picker-cancel"
            v-text="cancelText"
            @click="handleCancel"
          >取消</a>
          <span v-text="titleText" v-if="titleText" class="picker-title"></span>
          <a
            href="javascript:void(0);"
            class="picker-confirm"
            v-text="confirmText"
            @click="handleConfirm"
          >确定</a>
        </div>
        <!-- 选择区域 -->
        <div class="picker-group" :style="{ height: visibleCount * liHeight + 'px' }">
          <div class="picker-border"></div>
          <pickerItem
            v-for="(item,index) in data"
            :data="item.value"
            :key="index"
            :index="index"
            :height="liHeight"
            :change="handelChange"
            :value="valueArr?valueArr[index]:''"
            ref="item"
          ></pickerItem>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import dayjs from "dayjs";
import pickerItem from "./picker-item";

export default {
  name: "DatePickerScroll",
  data() {
    return {
      data: this.getData(),
      valueArr: this.getTime(this.value),
      liHeight: 0,
      newValue: this.value
    };
  },
  watch: {
    visible(v) {
      // 初始时数据为空，在显示时再计算位置
      if (v && this.liHeight == 0) {
        this.getDisplayHeight();
      }
    }
  },
  props: {
    visible: { type: Boolean, default: false }, // 显示或隐藏 默认：隐藏
    cancelText: { type: String, default: "取消" }, // 取消按钮文本 默认：取消
    confirmText: { type: String, default: "确认" }, // 确定按钮文本 默认：确认
    titleText: { type: String, default: "请选择" }, // 标题文本 默认：请选择
    startDate: String, // 开始日期 默认：今天的前10天 格式：2019-11-11
    endDate: String, // 结束日期 默认：今天的后10天 格式：2019-11-12 结束时间一定要大于等于开始时间
    visibleCount: { type: Number, default: 5 }, // 显示的个数 默认：5
    value: { type: Date, default: new Date() }, // 选中时间 默认:当前时间
    onCancel: Function, // 取消事件
    onConfirm: Function, // 确定事件
    onChange: Function // 下拉改变时间
  },
  components: {
    pickerItem
  },
  methods: {
    // 取消
    handleCancel(e) {
      let item = this.$refs.item;
      for (let i in item) {
        item[i]._moveTo();
      }
      this.$emit("update:visible", false);
      this.onCancel ? this.onCancel(this.value) : "";
      e.stopPropagation();
    },
    // 确认
    handleConfirm(e) {
      this.$emit("update:visible", false);
      this.onConfirm
        ? this.onConfirm(this.newValue)
        : this.$emit("input", this.newValue);
      e.stopPropagation();
    },
    // 选择项改变
    handelChange(value, index, bool) {
      //这里修改为点击确认才更新选中值
      if (typeof this.value == "string") {
        //this.$emit('input', value);
        this.newValue = value;
      } else {
        this.valueArr[index] = value;
        //采用上面方法是不会同步更新的，因为vue监听的是this.value，
        //没有监听this.value的子项，所以直接改变子项不会触发更新
        //newValue.splice(index, 1, value);//先移除再添加
        //this.$emit('input', newValue);
        this.newValue = this.restoreTime(this.valueArr);
      }
      //bool=false时是初始时设置的
      if (bool) {
        this.onChange ? this.onChange(value, index) : "";
      }
    },
    // 获取显示高度
    getDisplayHeight() {
      //取隐藏标签的高
      const obj = this.$refs.content;
      const clone = obj.cloneNode(true);
      clone.style.display = "block";
      clone.style.position = "absolute";
      clone.style.opacity = 0;
      clone.style.top = "-10000px";
      obj.parentNode.appendChild(clone);
      const li = clone.querySelector("li");
      if (li) {
        //this.liHeight = li.offsetHeight;//取到的是整数
        this.liHeight = parseFloat(window.getComputedStyle(li, null).height); //取到的精确到小数
      }
      obj.parentNode.removeChild(clone);
    },

    // 生成时间 count代表生成的数量 24/60
    generateTime(count) {
      let timeArr = [];
      for (let i = 0; i <= count - 1; i++) {
        const t = i < 10 ? "0" + i.toString() : i.toString();
        timeArr.push(t);
      }
      return timeArr;
    },

    // 生成日期
    generateDate(startDate, endDate) {
      startDate = dayjs(startDate);
      endDate = dayjs(endDate);
      let dateArr = [];
      const count = endDate.diff(startDate, "days"); // 开始与结束时间间隔
      for (let i = count; i >= 0; i--) {
        const t = dayjs(endDate)
          .subtract(i, "days")
          .toISOString();
        dateArr.push(t);
      }
      return dateArr;
    },

    // 格式化时间 2019-11-11 -> IOSstring
    timeFormat(date) {
      return dayjs(date)
        .startOf("day")
        .toISOString();
    },

    // 生成data数组 三列 分别是 日期 时 分
    getData() {
      const hours = this.generateTime(24);
      const minutes = this.generateTime(60);

      const startDate = this.startDate
        ? this.timeFormat(this.startDate)
        : dayjs()
            .startOf("day")
            .subtract(10, "days")
            .toISOString();
      const endDate = this.endDate
        ? this.timeFormat(this.endDate)
        : dayjs()
            .startOf("day")
            .subtract(10, "days")
            .toISOString();

      const dates = this.generateDate(startDate, endDate);
      return [
        {
          value: dates
        },
        {
          value: hours
        },
        {
          value: minutes
        }
      ];
    },

    // 生成value数组  三列 分别是 日期 时 分 将时间格式拆解
    getTime(value) {
      const date = dayjs(value)
        .startOf("day")
        .toISOString();
      const hour = dayjs(value).format("HH");
      const minute = dayjs(value).format("mm");
      return [date, hour, minute];
    },

    // 生成value时间  三列 分别是 日期 时 分 将数组格式拆解
    restoreTime(valueArr) {
      const date = dayjs(valueArr[0]).format("YYYY-MM-DD");
      const hour = valueArr[1];
      const minute = valueArr[2];
      const all = `${date} ${hour}:${minute}`;
      return dayjs(all, "YYYY-MM-DD HH:mm").toDate();
    }
  },
  computed: {},
  mounted() {
    this.getDisplayHeight();
  },
  filters: {}
};
</script>

<style lang="scss" scoped>
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
}
a {
  color: #666;
  text-decoration: none;
}
.picker {
  touch-action: none;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 100;
  }
  .picker-content {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 101;
  }
  .picker-control {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    padding: 0 20px;
    box-sizing: border-box;
    .picker-title {
      display: block;
      flex: 2;
      text-align: center;
      font-size: 16px;
    }
    a {
      display: block;
      &:last-child {
        text-align: right;
        color: #04ab02;
      }
    }
  }
  .picker-group {
    display: flex;
    position: relative;
    overflow: hidden;
    .picker-border {
      left: 0;
      top: 50%;
      position: absolute;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;
      width: 100%;
      box-sizing: border-box;
      transform: translateY(-50%);
    }
  }
}
.fade-enter-active {
  animation: fadeIn 0.5s;
}
.fade-leave-active {
  animation: fadeOut 0.5s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.slide-enter-active {
  animation: fadeUp 0.5s;
}
.slide-leave-active {
  animation: fadeDown 0.5s;
}
@keyframes fadeUp {
  0% {
    opacity: 0.6;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeDown {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0.6;
    transform: translateY(100%);
  }
}
</style>