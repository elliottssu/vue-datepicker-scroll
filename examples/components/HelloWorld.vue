<template>
  <div>
    <button @click="isPickerVisable=true">点击我选择</button>
    <p>{{pickerValue}}</p>

    <date-picker-scroll
      v-model="pickerValue"
      :visible.sync="isPickerVisable"
      :data="pickerData"
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
      pickerData: [
        {
          value: [
            "2019年11月12日 今天",
            "2019年11月13日 周三",
            "2019年11月14日 周四",
            "2019年11月15日 周五",
            "2019年11月16日 周六",
            "2019年11月17日 周日",
            "2019年11月18日 周一",
            "2019年11月19日 周二",
            "2019年11月20日 周三",
          ]
        },
        {
          value: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"]
        },
        {
          value: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"]
        }
      ],
      pickerValue: ["2019年11月13日 周三", "08", "02"]
    };
  },
  props: {},
  components: {},
  methods: {
    // 确定按钮
    handelConfirm(value, index) {
      this.pickerValue = value;
      console.log("您选择了", this.pickerValue, index);
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


