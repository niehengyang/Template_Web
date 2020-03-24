<template>
  <div class="stats-card">
    <p class="title">{{$t('lang.alarm-Dstats')}}</p>
    <div class="stats-num">
      <el-row>
        <el-col :span='8'>
          <p class="num">{{data}}</p>
          <p class="text">{{$t('lang.alarm-data')}}</p>
        </el-col>
        <el-col :span='8'>
          <p class="num">{{fault}}</p>
          <p class="text">{{$t('lang.fault-alarm')}}</p>
        </el-col>
        <el-col :span='8'>
          <p class="num">{{offline}}</p>
          <p class="text">{{$t('lang.alarm-offline')}}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    
    return {
      data:0,
      fault:0,
      offline:0
    }
  },
  created () {
    this.getData();
  },
  methods: {
     //获取所有设备告警
        getData(){
            this.$api.restfulApi
                .list("statistical/alldeviceAlarm")
                .then(res => {
                    console.log('alldeviceAlarm',res);
                    this.data = res.ruleAlarmNum;
                    this.fault = res.faultAlarmNum;
                    this.offline = res.offlineAlarmNum;
                });
        }
  }
}
</script>

<style lang="scss">

</style>
