<template>
    <div class="external-card" @click="goMonitor">
        <el-row>
            <el-col :span="10">
                <img src="@/assets/images/icon/external.png" />
            </el-col>
            <el-col :span="14">
                <div class="name">{{external.name}}</div>
                <div class="status" v-if="external.status=='0'">{{$t('lang.offline')}}</div>
                <div class="status" v-if="external.status=='1'">{{$t('lang.normal')}}</div>
                <div class="status" v-if="external.status=='2'">{{$t('lang.alarm')}}</div>
                <div class="status" v-if="external.status=='3'">{{$t('lang.fault')}}</div>
                <div class="time">{{external.online_time}}{{external.time_unit}}</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ["external"],
    data() {
        return {};
    },
    methods: {
        goMonitor() {
            this.$router.push(
                "/monitor/" +
                    this.external.device_id +
                    "/?exId=" +
                    this.external.id
            );
        }
    }
};
</script>
<style scoped lang="scss">
.external-card {
    width: 250px;
    padding: 10px 20px;
    border: 1px solid rgb(228, 228, 228);
    cursor: pointer;
    .el-row {
        text-align: center;
        .el-col {
            div {
                margin-bottom: 10px;
                text-align: left;
                padding-left: 20px;
            }
            .time {
                margin-bottom: 0px;
                text-align: right;
            }
            .name {
                font-size: 16px;
            }
        }
    }
}
</style>