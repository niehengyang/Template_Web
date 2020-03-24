<template>
    <el-dialog title="ios安装引导" :visible.sync="dialogVisible">
        <h1>您将安装的是iOS企业版，为了更好的为您服务，请按照以下提示，进行信任授权！</h1>
        <p>1.下载ios版APP后，点击打开APP会出现如图所示提示框，请不必担心。</p>
        <img src="@/assets/images/tip/1.jpg" alt="">
        <p>2.进入设置-通用</p>
        <img src="@/assets/images/tip/2.png" alt="">
        <p>3.进入「描述文件与设备管理」</p>
        <img src="@/assets/images/tip/3.png" alt="">
        <p>4.点击如图所示项，进入下一页</p>
        <img src="@/assets/images/tip/4.jpg" alt="">
        <p>5.点击「信任 ********」</p>
        <img src="@/assets/images/tip/5.jpg" alt="">
        <p>6.点击「信任」完成授权，即可打开APP。</p>
        <img src="@/assets/images/tip/6.png" alt="">
    </el-dialog>
</template>

<script>
    export default {
        name: "InstallTip",
        data(){
            return {
                dialogVisible: false,
            }
        }
    }
</script>

<style scoped>

</style>