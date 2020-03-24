<template>
    <div class="pie-box">
        <type-select v-model="searchKey" @change="getData" :placeholder="$t('lang.type')"></type-select>
        <ve-pie :data="chartData" :settings="chartSettings" height="300px"></ve-pie>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        this.chartSettings = {
            radius: 80,
            offsetY: 150,
             labelMap:{
                '告警类型':this.$t('lang.alarm-type'),
                '告警数量':this.$t('lang.alarm-num'),
            }
        };
        return {
            searchKey: "",
            chartData: {
                columns: ["告警类型", "告警数量"],
                rows: [
                    { 告警类型: this.$t('lang.fault-alarm'), 告警数量: 0 },
                    { 告警类型: this.$t('lang.alarm-data'), 告警数量: 0 },
                    { 告警类型: this.$t('lang.alarm-offline'), 告警数量: 0 }
                ]
            }
        };
    },
    created() {},
    components: {},
    methods: {
        //根据设备类型统计告警数
        getData(id) {
            this.$api.restfulApi
                .list("statistical/deviceTypeToAlarmNum", { type_id: id })
                .then(res => {
                    console.log('Type-AlarmNum',res);
                    this.chartData = {
                        columns: ["告警类型", "告警数量"],
                        rows: [
                            {
                                告警类型: this.$t('lang.fault-alarm'),
                                告警数量: res.faultAlarmTotal
                            },
                            {
                                告警类型: this.$t('lang.alarm-data'),
                                告警数量: res.dataAlarmTotal
                            },
                            {
                                告警类型:  this.$t('lang.alarm-offline'),
                                告警数量: res.onfflineAlarmTotal
                            }
                        ]
                    };
                });
        }
    }
};
</script>

<style lang="scss">
.pie-box {
    position: relative;
    .el-select {
        width: 100px;
        float: right;
        position: absolute;
        right: 0;
        top: -45px;
    }
}
</style>
