<template>
    <div>
        <!-- 面包屑 -->
        <bread-crumb :crumb-array="[{name:$t('lang.device-manage')}, {name:$t('lang.device-map')}]">
            <el-button
                type="primary"
                plain
                size="mini"
                style="position:absolute"
                @click="getBack()"
            >{{$t('lang.back')}}</el-button>
        </bread-crumb>

        <device-map></device-map>
    </div>
</template>

<script>
import deviceMap from "./component/BaiduMap";

export default {
    data() {
        return {
            device_id: "", //显示单个设备所用的设备id
            deviceList: []
        };
    },
    created() {
        // this.getList();
    },
    mounted(){
        // this.getList()
    },
    components: {
        "device-map": deviceMap
    },
    watch: {
    },
    methods: {
        //跳转设备列表
        getBack() {
            this.$router.go(-1);
        },
        // //获取设备列表
        // getList() {
        //     this.tableLoading = true;
        //     this.$api.restfulApi
        //         .list("device", {serialno:this.$route.query.serialno})
        //         .then(res => {
        //             console.log("Map", res);
        //             this.deviceList = res.data;
        //             this.tableLoading = false;
        //         });
        // }
    }
};
</script>

<style lang="scss" scoped>
.icon-map {
    position: absolute;
    left: 210px;
    color: #67c23a;
    font-size: 20px;
    top: 2.5px;
}
</style>