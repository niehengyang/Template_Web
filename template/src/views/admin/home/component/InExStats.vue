<template>
  <div class="stats-card" style="margin-right:0">
    <p class="title">{{$t('lang.InEx-stats')}}</p>
    <div class="stats-num">
      <el-row>
        <el-col :span='8'>
          <p class="num">{{external}}</p>
          <p class="text">{{$t('lang.external-num')}}</p>
        </el-col>
        <el-col :span='8'>
          <p class="num">{{internal}}</p>
          <p class="text">{{$t('lang.internal-num')}}</p>
        </el-col>
        <el-col :span='8'>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  props:['internal','external'],
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss">
</style>
