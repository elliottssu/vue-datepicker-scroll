<template>
  <div>
    <button @click="isPickerVisable=true">点击我选择</button>
    <p>{{selectedTime}}</p>

    <!-- 组件引入部分 -->
    <date-picker-scroll
      v-model="selectedTime"
      startDate="2019-11-10"
      endDate="2019-11-25"
      :visible.sync="isPickerVisable"
      :onConfirm="handelConfirm"
    ></date-picker-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "HelloWorld",
  data() {
    return {
      isPickerVisable: false,
      selectedTime: new Date()
    };
  },
  props: {},
  components: {},
  methods: {
    // 点击确定按钮事件
    handelConfirm(value) {
      this.selectedTime = value;
      console.log("您选择了", this.selectedTime);
    }
  },
  computed: {},
  mounted() {},
  filters: {}
};
</script>

<style scoped>
button {
  font-size: 20px;
  border: 1px solid #dccfcf;
}
</style>


