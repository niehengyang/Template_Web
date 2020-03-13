<template>
  <div>
    <!-- 面包屑 -->
    <bread-crumb :crumb-array="crumbArray"></bread-crumb>

    <!-- Tab标签页 -->
    <el-tabs class="tab-style" v-model="tabActiveName" @tab-click="tabClick">
      <el-tab-pane v-for="(tab,index) in tabArray" :label="tab.label" :name="tab.name" :key="index"></el-tab-pane>
    </el-tabs>

    <main-content>
      <router-view></router-view>
    </main-content>
  </div>
</template>

<script>
import tabMixin from "@/utils/tabMixin";

export default {
  mixins: [tabMixin],
  data() {
    return {
      dt_id: "",
      tabActiveName: "dataFlow",
      crumbArray: [
        { name: this.$t('lang.device-manage') },
        { name: this.$t('lang.template-config') },
        { name: this.$t('lang.param-config')  }
      ]
    };
  },
  computed: {
    tabArray: function() {
      return [
        {
          label: this.$t('lang.param-config'),
          name: "dataFlow",
          path: "/devicetype/" + this.dt_id + "/dataflow/"
        },
        {
          label: this.$t('lang.alarm-config'),
          name: "alarmRule",
          path: "/devicetype/" + this.dt_id + "/rule/"
        },
        {
          label: this.$t('lang.HZ-config'),
          name: "uploadRatio",
          path: "/devicetype/" + this.dt_id + "/uploadratio/"
        },
      ];
    }
  }, 
  created() {
    this.dt_id = this.$route.params.dt_id;
    console.log(this.dt_id);
    this.setTabActive();
  },
  methods: {
    
  }
};
</script>

<style lang="scss">

</style>