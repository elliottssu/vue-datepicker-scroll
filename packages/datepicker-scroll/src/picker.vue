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
            :value="typeof value=='string'?value:value[index]"
            ref="item"
          ></pickerItem>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import pickerItem from "./picker-item";

export default {
  name: "DatePickerScroll",
  data() {
    return {
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
    visible: { ype: Boolean, default: false }, // 显示或隐藏
    cancelText: { type: String, default: "取消" }, // 取消按钮文本
    confirmText: { type: String, default: "确认" }, // 确定按钮文本
    titleText: { type: String, default: "请选择" }, // 标题文本
    visibleCount: { type: Number, default: 5 }, //显示的个数
    data: Array, // 数据列表
    value: [String, Array], // 返回的数值
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
      this.onConfirm ? this.onConfirm(this.newValue) : this.$emit("input", this.newValue);
      e.stopPropagation();
    },
    // 选择项改变
    handelChange(value, index, bool) {
      //这里修改为点击确认才更新选中值
      if (typeof this.value == "string") {
        //this.$emit('input', value);
        this.newValue = value;
      } else {
        let newValue = this.newValue.slice(0);
        newValue[index] = value;
        //采用上面方法是不会同步更新的，因为vue监听的是this.value，
        //没有监听this.value的子项，所以直接改变子项不会触发更新
        //newValue.splice(index, 1, value);//先移除再添加
        //this.$emit('input', newValue);
        this.newValue = newValue;
      }
      //bool=false时是初始时设置的
      if (bool) {
        this.onChange ? this.onChange(value, index) : "";
      }
    },
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