<template>
  <div class="footer">
    <p>{{$t('lang.footer-top')}}</p>
    <p style="margin-top:10px">{{$t('lang.footer-bottom')}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.footer {
  height: 90px;
  width:100%;
  padding:27px 0;
  // position:fixed;
  // bottom:0;
  background: #1a202e;
  color: #ffffff;
  font-weight: 300;
  text-align: center;
}
</style>