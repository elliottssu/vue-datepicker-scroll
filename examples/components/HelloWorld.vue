<template>
  <div>
    <h1>{{ msg }}</h1>

    <button @click="visible3=true">
      你选择了
      <span class="right">{{value3}}</span>
    </button>

    <date-picker-scroll :visible.sync="visible3" :data="pickerData3" v-model="value3"></date-picker-scroll>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<script type="text/ecmascript-6">

export default {
  name: "HelloWorld",
  data() {
    return {
      visible3: false,
      pickerData3: [
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
            "2019年11月20日 周三"
          ]
        },
        {
          value: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"]
        },
        {
          value: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"]
        }
      ],
      value3: ["2019年11月13日 周三", "08", "02"]
    };
  },
  props: { msg: String },
  components: {  },
  methods: {
    _change1(v, index) {
      console.log("change");
    }
  },
  computed: {},
  mounted() {},
  filters: {}
};
</script>


